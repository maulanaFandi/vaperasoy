import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Grid,
  Paper,
} from "@mui/material";

export default function AddStaffForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    phoneNumber: "",
    gender: "",
    IDNumber: "",
    salary: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://vaperasoy.vercel.app/api/staff", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      Swal.fire({
        icon: "success",
        text: "Registration successful!",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        text: error.response.data.message,
      });
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            fontWeight="bold">
            Add Staff
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  id="age"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="tel"
                  id="phone"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    label="Gender"
                    variant="outlined"
                    fullWidth>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="nik"
                  name="IDNumber"
                  value={formData.IDNumber}
                  onChange={handleChange}
                  label="NIK"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  label="Salary"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  style={{ width: "100%", minHeight: 100 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
