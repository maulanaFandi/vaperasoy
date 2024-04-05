import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserProducts() {
  const defaultTheme = createTheme();
  const [dataUser, setDataUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    birthDate: "",
    IDNumber: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/profile", // Adjust the URL accordingly
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setDataUser(response.data);
        // Check if user data is incomplete
        if (
          !response.data.birthDate ||
          !response.data.address ||
          !response.data.phoneNumber ||
          !response.data.gender
        ) {
          setShowModal(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
        gender: formData.gender,
        birthDate: formData.birthDate,
        address: formData.address,
        phoneNumber: formData.phoneNumber
      };

      await axios.put(
        `http://localhost:3000/api/users/profile`, // Adjust the URL accordingly
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setShowModal(false);
      Swal.fire({
        icon: "success",
        text: "Profile updated successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Modal
        open={showModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <Paper sx={{ p: 4, width: "70%", maxWidth: "800px" }}>
            <Typography variant="h5" id="modal-title" gutterBottom>
              Incomplete Data
            </Typography>
            <Typography variant="body1" id="modal-description">
              Please complete the following fields:
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      label="Gender"
                      variant="outlined"
                      fullWidth>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    id="age"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phone"
                    type="number"
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Modal>
      <CssBaseline />
      {/* <Hero /> */}
      <Box sx={{ bgcolor: "background.default" }}>
        {/* <Divider /> */}
        {/* <Pricing /> */}
        {/* <Divider /> */}
        {/* <CompanyCollection /> */}
        {/* <Divider /> */}
        {/* <Highlights /> */}
        {/* <Divider /> */}
        {/* <Testimonials /> */}
        <ProductCard />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
