import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  Modal,
  Button,
  TextField,
  Grid,
  Paper,
} from "@mui/material";

// Fungsi untuk mendekode token JWT
const jwtDecode = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// Fungsi untuk mengecek data yang belum lengkap
const isNotCompleteData = (decodedToken) => {
  const incompleteFields = [];
  if (!decodedToken.name) incompleteFields.push("Name");
  if (!decodedToken.birthDate) incompleteFields.push("Birth Date");
  if (!decodedToken.IDNumber) incompleteFields.push("ID Number");
  if (!decodedToken.address) incompleteFields.push("Address");
  if (!decodedToken.phoneNumber) incompleteFields.push("Phone Number");
  if (!decodedToken.gender) incompleteFields.push("Gender");

  return incompleteFields;
};

const UserProfile = () => {
  const [Data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false); // Menampilkan modal jika ada bidang yang tidak lengkap
  const [incompleteFields, setIncompleteFields] = useState([]); // Daftar bidang yang tidak lengkap
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    IDNumber: "",
    address: "",
    phoneNumber: "",
    gender: "",
  });

  const params = useParams();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      try {
        const response = await axios
          .get
          // `http://localhost:3000/api/users/${params.id}`
          ();
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [params.id, token]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const fields = isNotCompleteData(decodedToken);
      setIncompleteFields(fields);

      if (fields.length > 0) {
        setShowModal(true);
      }
    }
  }, [token]);

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Fungsi untuk mengubah nilai form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang di-submit
    console.log(formData);
  };

  return (
    <Container
      maxWidth="md"
      style={{ textAlign: "center", paddingTop: "50px" }}>
      <Box className="flex justify-center items-center">
        <Box className="w-3/4 shadow-xl rounded-2xl p-10 border ml-60">
          {Data ? (
            <>
              <Box className="flex items-center">
                <Box>
                  <img
                    src={Data.imgUrl}
                    alt=""
                    className="rounded-2xl h-40 w-40"
                  />
                </Box>
                <Box className="flex flex-col gap-2 text-left ml-20">
                  <Typography variant="h3" fontWeight="bold">
                    Name: {Data.name}
                  </Typography>
                  <Typography variant="h5" fontWeight="semibold">
                    Specialist: {Data.specialize}
                  </Typography>
                </Box>
              </Box>

              <Box className="flex flex-col justify-center items-center pt-20">
                <Box className="text-center mb-10">
                  <Typography variant="h4" fontWeight="bold">
                    Schedule
                  </Typography>
                </Box>
                {Data.schedule && Data.schedule.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Day</TableCell>
                          <TableCell>Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Data.schedule.map((data, index) => (
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
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
      {/* Modal formData */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <Box className="modal">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            paddingTop={"100px"}
            width={"50%"}
            marginLeft={"25%"}>
            <Paper
              className="modal-content p-4"
              style={{ width: "70%", maxHeight: "80%", overflow: "auto" }}>
              <Typography variant="h5" id="modal-title">
                Incomplete Data
              </Typography>
              <Typography variant="body1" id="modal-description">
                Please complete the following fields:
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      sx={{
                        width: "50%",
                        marginLeft: "25%",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                      }}
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: "50%",
                        marginLeft: "25%",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                      }}
                      label="Birth Date"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: "50%",
                        marginLeft: "25%",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                      }}
                      label="ID Number"
                      name="IDNumber"
                      value={formData.IDNumber}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: "50%",
                        marginLeft: "25%",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                      }}
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: "50%",
                        marginLeft: "25%",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                      }}
                      label="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    sx={{
                        width: "50%",
                        marginLeft: "25%",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                      }}
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button variant="contained" onClick={handleCloseModal}>
                  Close
                </Button>
              </form>
            </Paper>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
};

export default UserProfile;
