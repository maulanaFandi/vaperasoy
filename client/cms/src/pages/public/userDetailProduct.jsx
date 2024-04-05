import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  CardMedia,
} from "@mui/material";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = params.id
        const response = await axios.get(
          "http://localhost:3000/api/products/" + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(response.data);
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
          }}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Container
            maxWidth="md"
            sx={{ textAlign: "center", paddingTop: "100px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%", // Adjusted width for responsiveness
                  maxWidth: "90%", // Added max width for better layout on larger screens
                  boxShadow: 3,
                  borderRadius: "16px",
                  padding: "40px",
                  border: "1px solid",
                  ml: "auto", // Center align on larger screens
                  mr: "auto", // Center align on larger screens
                }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}>
                  <CardMedia
                    component="img"
                    sx={{ maxWidth: "30%", height: "auto" }} // Adjusted image size for responsiveness
                    image={productData.imgUrl}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "left",
                      fontSize: { xs: "0.5rem", sm: "1.5rem", md: "2rem" },
                    }}>
                    <Typography
                      variant="h5"
                      fontWeight="semibold"
                      sx={{
                        fontSize: ["0.5rem", "1.5rem", "2rem"], // Array of font sizes for different breakpoints
                      }}>
                      Name: {productData.name}
                    </Typography>
                    <Typography variant="h5" fontWeight="semibold">
                      Email: {productData.email}
                    </Typography>
                    <Typography variant="h5" fontWeight="semibold">
                      Gender: {productData.gender}
                    </Typography>
                    <Typography variant="h5" fontWeight="semibold">
                      Birth Date: {productData.birthDate}
                    </Typography>
                    <Typography variant="h5" fontWeight="semibold">
                      Age: {productData.birthDate}
                    </Typography>
                    <Typography variant="h5" fontWeight="semibold">
                      Phone Number: {productData.phoneNumber}
                    </Typography>
                    <Typography variant="h5" fontWeight="semibold">
                      Address: {productData.address}
                    </Typography>
                    {/* Add other user profile information here */}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default UserProfile;
