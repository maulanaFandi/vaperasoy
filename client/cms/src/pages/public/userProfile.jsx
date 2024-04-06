import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  CardMedia,
  useMediaQuery,
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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Access token not found");
        }
        const response = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", paddingTop: "100px" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              maxWidth: "90%",
              boxShadow: 3,
              borderRadius: "16px",
              padding: "40px",
              border: "1px solid",
              ...(isMobile && {
                display: "flex",
                flexDirection: "row",
                padding: "5px",
              }),
            }}>
            <CardMedia
              component="img"
              sx={{
                maxWidth: isMobile ? "20%" : "30%", // Ubah persentase sesuai kebutuhan
                height: "auto",
              }}
              image={userData.imgUrl}
              alt={userData.name}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 3,
                textAlign: "left",
                ...(isMobile && {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  textAlign: "left",
                  ml: 0,
                  mt: 3,
                }),
              }}>
              <Typography
                variant={isMobile ? "h7" : "h6"}
                fontWeight="semibold">
                Name: {userData.name}
              </Typography>
              <Typography
                variant={isMobile ? "h7" : "h6"}
                fontWeight="semibold">
                Email: {userData.email}
              </Typography>
              <Typography
                variant={isMobile ? "h7" : "h6"}
                fontWeight="semibold">
                Gender: {userData.gender}
              </Typography>
              <Typography
                variant={isMobile ? "h7" : "h6"}
                fontWeight="semibold">
                Birth Date: {formatDate(userData.birthDate)}
              </Typography>
              <Typography
                variant={isMobile ? "h7" : "h6"}
                fontWeight="semibold">
                Age: {formatAge(userData.birthDate)}
              </Typography>
              <Typography
                variant={isMobile ? "h7" : "h6"}
                fontWeight="semibold">
                Phone Number: {userData.phoneNumber}
              </Typography>
              <Typography
                variant={isMobile ? "h7" : "h6"}
                fontWeight="semibold">
                Address: {userData.address}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default UserProfile;
