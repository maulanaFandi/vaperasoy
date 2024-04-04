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

const formatAge = (birthDate) => {
  const today = new Date();
  const dob = new Date(birthDate);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

const UserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log(token);
        if (!token) {
          throw new Error("Access token not found");
        }
        const response = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('id-ID', options);
    return formattedDate;
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", paddingTop: "100px" }}>
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
          {loading ? (
            <Grid container justifyContent="center" sx={{ paddingTop: "25px" }}>
              <CircularProgress />
            </Grid>
          ) : (
            <>
              <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                <CardMedia
                  component="img"
                  sx={{ maxWidth: "30%", height: "auto" }} // Adjusted image size for responsiveness
                  image={userData.imgUrl}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    textAlign: "left",
                    fontSize: { xs: "0.5rem", sm: "1.5rem", md: "2rem" }
                  }}>
                  <Typography
                    variant="h5"
                    fontWeight="semibold"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } // Adjust font size for different breakpoints
                    }}>
                    Name: {userData.name}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Email: {userData.email}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Gender: {userData.gender}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Birth Date: {formatDate(userData.birthDate)}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Age: {formatAge(userData.birthDate)}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Phone Number: {userData.phoneNumber}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Address: {userData.address}
                  </Typography>
                  {/* Add other user profile information here */}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
