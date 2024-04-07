import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const logoStyle = {
  width: "140px",
  height: "auto",
};

export default function Footer() {
  const [input, setInput] = useState({
    testimony: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/api/users/testimony`,
        input,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
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
            <Box sx={{ ml: "-15px" }}>
              <img
                src={
                  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
            </Box>
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
            <Typography
              variant="body2"
              color="text.secondary"
              mb={2}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WhatsAppIcon /> +62 812 8890 7132
            </Typography>
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

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}>
          <Stack direction="row" spacing={1} useFlexGap>
            <TextField
              id="outlined-basic"
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Enter your testimony"
              name="testimony"
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flexShrink: 0 }}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
