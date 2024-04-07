import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  CardMedia,
  Snackbar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const UserDetailProduct = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [ratingToAdd, setRatingToAdd] = useState(0);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = params.id;
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
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

  const handleRatingClick = (value) => {
    setRatingToAdd(value);
  };

  const handleAddRating = async () => {
    try {
      const updatedRating = (productData.rating + ratingToAdd) / 2;
      const updatedProductData = { ...productData, rating: updatedRating };
      // Exclude _id from the update data
      const { _id, ...updateDataWithoutId } = updatedProductData;
      await axios.patch(
        `http://localhost:3000/api/products/${productData._id}`,
        updateDataWithoutId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setSnackbarMessage("Rating added successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding rating:", error);
      setSnackbarMessage("Failed to add rating");
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const { _id, ...updateDataWithoutId } = productData;
      await axios.patch(
        `http://localhost:3000/api/products/${_id}`,
        updateDataWithoutId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setSubmitting(false);
      setSnackbarMessage("Testimonial submitted successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      setSubmitting(false);
      setSnackbarMessage("Failed to submit testimonial");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", paddingTop: "100px" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <CardMedia
            component="img"
            sx={{ maxWidth: "70%", height: "80%", margin: "auto" }}
            image={productData.imageUrl}
            alt={productData.name}
          />
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" fontWeight="semibold" gutterBottom>
              {productData.name}
            </Typography>
            <Typography variant="h5">{productData.description}</Typography>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {formatPrice(productData.price)}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row",mt: 2, alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5">
              Category: {productData.category} |
            </Typography>
            <Typography ml={2} variant="h5">Stock: {productData.stock} |</Typography>
            <Typography ml={2} variant="h5">Brand: {productData.brand} </Typography>
            </Box>
            <Typography mt={2} variant="h5">Rating: {productData.rating}</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5" gutterBottom>
                Add Rating:
              </Typography>
              {[1, 2, 3, 4, 5].map((value) => (
                <StarIcon
                  key={value}
                  onClick={() => handleRatingClick(value)}
                  color={value <= ratingToAdd ? "warning" : "action"}
                />
              ))}
              <Button
                variant="contained"
                onClick={handleAddRating}
                sx={{ ml: 2 }}>
                Add Rating
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </Container>
  );
};

export default UserDetailProduct;
