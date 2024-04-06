import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Container, Typography, CircularProgress, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";

const UserDetailProduct = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = params.id;
        const response = await axios.get(`http://localhost:3000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [params.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { _id, ...updateDataWithoutId } = productData;
      await axios.patch(`http://localhost:3000/api/products/${_id}`, updateDataWithoutId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", paddingTop: "100px" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <CardMedia
            component="img"
            sx={{ maxWidth: "100%", height: "auto" }}
            image={productData.imageUrl}
            alt={productData.name}
          />
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" fontWeight="semibold" gutterBottom>
              {productData.name}
            </Typography>
            <Typography variant="body1">{productData.description}</Typography>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Price: {productData.price}
            </Typography>
            <Typography variant="body1">Category: {productData.category}</Typography>
            <Typography variant="body1">Stock: {productData.stock}</Typography>
            <Typography variant="body1">Brand: {productData.brand}</Typography>
            <Typography variant="body1">Rating: {productData.rating}</Typography>
            <Box component="form" onSubmit={handleSubmit} mt={2}>
              <TextField
                onChange={handleChange}
                id="testimonial"
                label="Testimonial"
                name="testimonial"
                type="text"
                fullWidth
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, bgcolor: "primary.main", color: "white" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default UserDetailProduct;
