import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
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
  const [userData, setUserData] = useState({});
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

  const getDayFromDate = (date) => {
    // Implementasi fungsi untuk mendapatkan hari dari tanggal
  };

  return (
    <Container
      maxWidth="md"
      style={{ textAlign: "center", paddingTop: "50px" }}>
      <Box className="flex justify-center items-center">
        <Box className="w-3/4 shadow-xl rounded-2xl p-10 border ml-60">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Box className="flex items-center">
                <Box>
                  <img
                    src={userData.imgUrl}
                    alt=""
                    className="rounded-2xl h-40 w-40"
                  />
                </Box>
                <Box className="flex flex-col gap-2 text-left ml-20">
                  <Typography variant="h3" fontWeight="bold">
                    Name: {userData.name}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Email: {userData.email}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Gender: {userData.gender}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Birth Date: {userData.birthDate}
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
