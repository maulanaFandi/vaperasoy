import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import Swal from "sweetalert2";

const calculateAge = (birthDate) => {
  const today = new Date();
  const dob = new Date(birthDate);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export default function Staff() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/staff");
        const formattedData = response.data.map((row) => ({
          ...row,
          id: row._id,
          age: !isNaN(calculateAge(row.birthDate))
            ? calculateAge(row.birthDate)
            : "",
          birthDate: Date.parse(row.birthDate) ? new Date(row.birthDate) : "",
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

  const handleEditClick = (id) => {
    setRowModesModel((prevModesModel) => ({
      ...prevModesModel,
      [id]: { mode: GridRowModes.Edit },
    }));
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
        await axios.delete(`http://localhost:3000/api/staff/${id}`);
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
      Swal.fire({
        title: "Error",
        text: "Failed to delete data. Please try again later.",
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
      const { id, _id, ...updateDataWithoutId } = newRow;

      await axios.patch(
        `http://localhost:3000/api/staff/${_id}`,
        updateDataWithoutId
      );
      return { ...newRow, id: _id };
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      align: "left",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      align: "left",
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      align: "left",
      editable: true,
      type: "singleSelect",
      valueOptions: ["male", "female"],
    },
    {
      field: "birthDate",
      headerName: "Birth Date",
      type: "date",
      width: 100,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      width: 80,
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "IDNumber",
      headerName: "NIK",
      width: 100,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 100,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      headerAlign: "center",
      align: "center",
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
          <Button
            key="edit"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEditClick(id)}
            sx={{ mr: 1 }}></Button>,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
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
      <Typography variant="h6" sx={{ textAlign: "Left", marginTop: "20px" }}>
        Staff List
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
