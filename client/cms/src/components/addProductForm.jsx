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

export default function AddProductForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "",
    stock: 0,
    brand: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      Swal.fire({
        icon: "success",
        text: "Add Product successful!",
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

  const renderTypeField = () => {
    if (formData.category === "Liquid") {
      return (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Type"
              variant="outlined"
              fullWidth>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Freebase">Freebase</MenuItem>
              <MenuItem value="Saltnic">Saltnic</MenuItem>
              <MenuItem value="Pods Frienndly">Pods Friendly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      );
    } else if (formData.category === "Device") {
      return (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Type"
              variant="outlined"
              fullWidth>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Pod">Pod</MenuItem>
              <MenuItem value="Aio">Aio</MenuItem>
              <MenuItem value="Mod">Mod</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      );
    }
    return null;
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h4" align="center" fontWeight="bold">
            Add Product
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  label="Stock"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  label="Price"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  label="Image Url"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                    variant="outlined"
                    fullWidth>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Liquid">Liquid</MenuItem>
                    <MenuItem value="Device">Device</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  label="brand"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  style={{ width: "100%", minHeight: 100 }}
                />
              </Grid>
              {renderTypeField()}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
