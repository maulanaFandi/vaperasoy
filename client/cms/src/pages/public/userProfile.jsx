import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
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
                  {/* Add other user profile information here */}
                </Box>
              </Box>

              <Box className="flex flex-col justify-center items-center pt-20">
                <Box className="text-center mb-10">
                  <Typography variant="h4" fontWeight="bold">
                    Schedule
                  </Typography>
                </Box>
                {userData.schedule && userData.schedule.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Day</TableCell>
                          <TableCell>Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userData.schedule.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell>{getDayFromDate(data.day)}</TableCell>
                            <TableCell>
                              {`${data.start}:00 - ${data.end}:00`}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="h6">
                    No appointments scheduled
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
