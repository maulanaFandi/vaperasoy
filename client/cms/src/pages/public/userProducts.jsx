import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Hero from './components/Hero';
// import LogoCollection from './components/LogoCollection';
// import Highlights from "../../components/Highlights";
// import Pricing from "../../components/Pricing";
// import Features from './components/Features';
// import Testimonials from './components/Testimonials';
// import FAQ from './components/FAQ';
import Footer from "../../components/Footer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";

const decodeAccessToken = (accessToken) => {
  return jwtDecode(accessToken);
};

const isNotCompleteData = () => {
  const accessToken = localStorage.getItem("access_token");
  const decodedToken = decodeAccessToken(accessToken);
  console.log(accessToken);

  const incompleteFields = [];
  if (!decodedToken.name) incompleteFields.push("Name");
  if (!decodedToken.birthDate) incompleteFields.push("Birth Date");
  if (!decodedToken.IDNumber) incompleteFields.push("ID Number");
  if (!decodedToken.address) incompleteFields.push("Address");
  if (!decodedToken.phoneNumber) incompleteFields.push("Phone Number");
  if (!decodedToken.gender) incompleteFields.push("Gender");

  return incompleteFields;
};

export default function UserProducts() {
  const defaultTheme = createTheme();
  const [Data, setData] = useState([]);
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
      try {
        const response = await axios.get(
          // `http://localhost:3000/api/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/api/users/${params.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        text: error.response.data.message,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
      <CssBaseline />
      {/* <Hero /> */}
      <Box sx={{ bgcolor: "background.default" }}>
        {/* <LogoCollection />
        <Features /> */}
        {/* <Divider /> */}
        {/* <Testimonials /> */}
        {/* <Divider /> */}
        {/* <Highlights /> */}
        {/* <Divider /> */}
        {/* <Pricing /> */}
        {/* <Divider /> */}
        {/* <FAQ /> */}
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
