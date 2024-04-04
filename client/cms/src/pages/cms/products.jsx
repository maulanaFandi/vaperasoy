import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
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
        setRows(
          response.data.map((item) => ({
            ...item,
            id: item._id,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
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
      // const { _id, ...updateDataWithoutId } = rows.find((row) => row.id === id);
      // // Update data on the server
      // await axios.patch(
      //   `http://localhost:3000/api/products/${_id}`,
      //   updateDataWithoutId,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      //     },
      //   }
      // );

      // Update row mode
      // setRowModesModel({
      //   ...rowModesModel,
      //   [_id]: { mode: GridRowModes.View },
      // });
      // console.log(rowModesModel);

      // // Show success message
      // Swal.fire({
      //   title: "Saved!",
      //   text: `Product with ID ${id} has been updated.`,
      //   icon: "success",
      //   confirmButtonText: "OK",
      // });
    } catch (error) {
      console.error("Error saving data:", error);
      // Show error message
      Swal.fire({
        title: "Error!",
        text: `Failed to save product with ID ${id}. Please try again later.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteClick = (id) => async () => {
    try {
      // Delete data on the server
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      // Remove row from state
      setRows(rows.filter((row) => row.id !== id));

      // Show success message
      Swal.fire({
        title: "Deleted!",
        text: `Product with ID ${id} has been deleted.`,
        icon: "success",
        confirmButtonText: "OK",
      });
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

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
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
      Swal.fire({
        title: "Error!",
        text: `Failed to save product with ID ${id}. Please try again later.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "joinDate",
      headerName: "Join date",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "role",
      headerName: "Department",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 140,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="error"
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
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
        Products List
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        sx={{
          flexGrow: 1,
          width: "70%",
          marginBottom: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      />
    </Box>
  );
}
