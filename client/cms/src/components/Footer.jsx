import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";

export default function Footer() {
  const [input, setInput] = useState({
    testimony: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Batasi input testimony maksimum 250 karakter
    const truncatedValue = value.slice(0, 250);
    setInput((prevState) => ({
      ...prevState,
      [name]: truncatedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      await axios.patch("https://vaperasoy.vercel.app/api/users/testimony", input, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Thank you for your testimony!",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}>
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Address
            </Typography>
            <Link to={"https://maps.app.goo.gl/wmGHFsTLDgU74Yrs6"}>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon />
                Jl. Purnawarman No.1 (Didalam Taman Kuliner Cireundeu)
              </Typography>
            </Link>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={2}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ContactPhoneIcon /> +62 21 7478 8269
            </Typography>
            <Link to={"https://wa.me/6281288907132"}>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={2}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WhatsAppIcon /> +62 812 8890 7132
            </Typography>
            </Link>
            <Link to={"https://www.instagram.com/vaperasoy.crd/"}>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  textDecoration: "none",
                }}>
                <InstagramIcon />
                Vaperasoy
              </Typography>
            </Link>
          </Box>
        </Box>
        {localStorage.getItem("access_token") && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              padding: "20px",
            }}>
            <TextField
              id="outlined-basic"
              multiline
              minRows={5}
              maxRows={10}
              placeholder="Enter Your Testimony (Max. 250 characters)"
              name="testimony"
              onChange={handleChange}
              sx={{
                width: "100%",
                maxWidth: "600px", // Menyesuaikan lebar maksimum textarea
                marginBottom: "10px",
              }}
              value={input.testimony}
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: "100%",
                maxWidth: "600px", // Menyesuaikan lebar maksimum tombol dengan textarea
                backgroundColor: "#1877f2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1465c8",
                },
              }}>
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
