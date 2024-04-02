import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

// Fungsi untuk menghitung umur dari tanggal lahir
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

export default function ListUser() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const userData = response.data.filter((item) => item.role !== "admin");
        setRows(
          userData.map((row) => ({
            ...row,
            id: row._id,
            age: !isNaN(calculateAge(row.birthDate))
            ? calculateAge(row.birthDate)
            : "", // Hitung umur dari tanggal lahir
            isNew: false,
          }))
          );
        } catch (error) {
          console.error("Error fetching data:", error);
          return [];
        }
    };

    fetchData();
  }, []);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleDeleteUser = (id) => {
    const row = rows.find((row) => row.id === id);
    if (!row) {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete the member with NIK ${row.IDNumber}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/api/users/${id}`);
        setRows(rows.filter((row) => row.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: `The member with NIK ${row.IDNumber} has been deleted.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: `The member with NIK ${row.IDNumber} was not deleted.`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

  const columns = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "age", // Ubah field dari 'birthDate' menjadi 'age'
      headerName: "Age",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 180,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      type: "singleSelect",
      valueOptions: ["Male", "Female"],
    },
    { field: "IDNumber", headerName: "NIK", width: 180 },
    { field: "address", headerName: "Address", width: 180 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      cellClassName: "actions",
      getActions: ({ id }) => [
        <IconButton
          key="delete"
          aria-label="delete"
          color="error"
          onClick={() => handleDeleteUser(id)}>
          <DeleteIcon />
        </IconButton>,
      ],
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
        User List
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
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
