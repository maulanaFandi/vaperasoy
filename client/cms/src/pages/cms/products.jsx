import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Products() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const formattedData = response.data.map((row) => ({
          ...row,
          id: row._id,
          isNew: false,
        }));
        setRows(formattedData);

        const initialRowModesModel = {};
        formattedData.forEach((row) => {
          initialRowModesModel[row.id] = { mode: GridRowModes.View };
        });
        setRowModesModel(initialRowModesModel);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (id) => {
    setRowModesModel((prevModesModel) => ({
      ...prevModesModel,
      [id]: { mode: GridRowModes.Edit },
    }));
    // Reset file state when entering edit mode
    setFile(null);
  };

  const handleSaveClick = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Save Editing With ID ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Save it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const updatedRow = rows.find((row) => row.id === id);
        if (updatedRow) {
          await processRowUpdate(updatedRow);
          Swal.fire({
            title: "Success",
            text: "Data has been updated.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setRowModesModel((prevModesModel) => ({
            ...prevModesModel,
            [id]: { mode: GridRowModes.View },
          }));
        } else {
          console.error("Row with ID", id, "not found.");
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: `Data with ID ${id} was not Saved.`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to save data. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete Product with ID ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: `Product with ID ${id} has been deleted.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: `Product with ID ${id} was not deleted.`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire({
        title: "Error!",
        text: `Failed to delete product with ID ${id}. Please try again later.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCancelClick = (id) => {
    setRowModesModel((prevModesModel) => ({
      ...prevModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      const { _id, ...updateDataWithoutId } = newRow;
      // Update data on the server
      await axios.patch(
        `http://localhost:3000/api/products/${_id}`,
        updateDataWithoutId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return { ...newRow, id: _id };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handlePurchaseClick = async (id) => {
    const { value: formValues } = await Swal.fire({
      title: "Purchase Product",
      html:
        '<input id="swal-input-quantity" type="number" class="swal2-input" placeholder="Quantity" value={""}/>' +
        '<select id="swal-select-payment" class="swal2-select">' +
        '<option value="Cash">Cash</option>' +
        '<option value="Debit">Debit</option>' +
        '<option value="Credit">Credit</option>' +
        '<option value="QRIS">QRIS</option>' +
        "</select>",
      focusConfirm: false,
      preConfirm: () => {
        const quantity = parseInt(
          document.getElementById("swal-input-quantity").value
        );
        const paymentMethod = document.getElementById(
          "swal-select-payment"
        ).value;

        if (isNaN(quantity) || quantity <= 0) {
          Swal.showValidationMessage(
            "Please enter a valid quantity greater than 0"
          );
          return false;
        }

        return [quantity, paymentMethod];
      },
    });

    if (!formValues) {
      return;
    }

    const [quantity, paymentMethod] = formValues;

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to purchase Product with ID ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, purchase it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const product = rows.find((row) => row.id === id);
        if (!product) {
          throw new Error("Product not found.");
        }
        if (product.stock < quantity) {
          throw new Error("Not enough stock.");
        }

        await axios.post(
          `http://localhost:3000/api/products/${id}/purchases`,
          { quantity, paymentMethod },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              stock: row.stock - quantity,
            };
          }
          return row;
        });

        setRows(updatedRows);
        Swal.fire({
          title: "Success",
          text: "Product has been purchased.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: `Product with ID ${id} was not Add To Purchase.`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to purchase product: ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleUploadClick = async (id) => {
    if (!file) {
      // Show error message if no file is selected
      Swal.fire({
        title: "Error",
        text: "Please select a file to upload.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Append other fields if needed
      // For example:
      // formData.append("name", newName);

      // Send the form data to the server
      await axios.patch(`http://localhost:3000/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      // Show success message
      Swal.fire({
        title: "Success",
        text: "Image uploaded successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset the file state
      setFile(null);

      // Refresh the data after successful upload if needed
      fetchData(); // Assuming fetchData function is defined to fetch updated data
    } catch (error) {
      console.error("Error uploading image:", error);

      // Show error message
      Swal.fire({
        title: "Error",
        text: "Failed to upload image. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "imageUrl",
      headerName: "Image Url",
      width: 180,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Upload",
      width: 100,
      renderCell: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return (
            <div>
              <input type="file" onChange={handleFileChange} />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleUploadClick(id)}>
                Upload
              </Button>
            </div>
          );
        }
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Liquid", "Devices", "Accesories"],
    },
    {
      field: "type",
      headerName: "Type",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Freebase", "Saltnic", "Pods Friendly"],
    },
    {
      field: "size",
      headerName: "Size",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["30Ml", "60Ml"],
    },
    {
      field: "nic",
      headerName: "Nicotine",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["3Mg", "6Mg", "12Mg", "24Mg", "30Mg", "40Mg", "50Mg"],
    },
    {
      field: "ohm",
      headerName: "Ohm",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "0.1",
        "0.2",
        "0.3",
        "0.4",
        "0.5",
        "0.6",
        "0.7",
        "0.8",
        "0.9",
        "1.0",
      ],
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 180,
      editable: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 140,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode =
          rowModesModel[id] && rowModesModel[id].mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            color="primary"
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="error"
          />,
          <GridActionsCellItem
            icon={<ShoppingCartIcon />}
            label="Purchase"
            onClick={() => handlePurchaseClick(id)}
            color="warning"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        marginTop: 8,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}>
      <Typography variant="h6" sx={{ textAlign: "Left", marginTop: "20px" }}>
        Product List
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.error("Error updating row:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }}
        sx={{
          flexGrow: 1,
          width: "70%",
          marginBottom: "10px",
          marginLeft: "250px",
          marginRight: "auto",
          alignText: "center",
          alignContent: "center",
        }}
      />
    </Box>
  );
}
