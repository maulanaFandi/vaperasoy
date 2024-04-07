import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";

export default function Products() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

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
        console.log(formattedData);
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
          // Handle the case when row with given ID is not found
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
        text: `You are about to delete the staff member with ID ${id}`,
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
          text: `The staff member with ID ${id} has been deleted.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: `The staff member with ID ${id} was not deleted.`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      // Show error message
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


  const quantity = 1
  const handlePurchaseClick = async (id, quantity) => {
    const product = rows.find(row => row.id === id);
  
    // Check if product exists and if its stock is greater than zero
    if (product && product.stock > 0) {
      try {
        const response = await axios.post(`http://localhost:3000/api/products/${id}/purchases`, { quantity }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
  
        // Update the stock locally after a successful purchase
        const updatedRows = rows.map(row => {
          if (row._id === id) {
            return {
              ...row,
              stock: row.stock - quantity, // Deduct purchased quantity from stock
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
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Failed to purchase product. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      // Show a message indicating the product is out of stock
      Swal.fire({
        title: "Out of Stock",
        text: "This product is currently out of stock.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
      field: "category",
      headerName: "Category",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Liquid", "Devices", "Accesories"],
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
            onClick={() => handleEditClick(id)}/>,
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
