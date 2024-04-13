import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Hero from "../../components/Hero";
import CompanyCollection from "../../components/CompanyCollection";
import Highlights from "../../components/Highlights";
import Pricing from "../../components/Pricing";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";

export default function LandingPage() {
  const defaultTheme = createTheme();
  const [openModal, setOpenModal] = useState(true);
  const [isOver18, setIsOver18] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
    if (isOver18) {
      console.log("Redirect to next page");
    }
  };

  const handleYesClick = () => {
    setIsOver18(true);
    handleClose();
  };

  const handleNoClick = () => {
    setOpenModal(false);
  };

  const handleBackdropClick = (event) => {
    event.stopPropagation();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        <Divider />
        <Pricing />
        <Divider />
        <CompanyCollection />
        <Divider />
        <Highlights />
        <Divider />
        <Testimonials />
        <Divider />
        <Footer />
        <Dialog open={openModal} onClick={handleBackdropClick} sx={{ overflowX: 'hidden' }}>
          <Paper sx={{ width: '90vw', maxWidth: '400px', m: 'auto' }}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }}>
              <img
                src="https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/1024px/1f51e.png"
                width={100}
                height={100}
                alt="emoji"
                style={{ marginBottom: "10px" }}
              />
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                Are You Over 18 Years Old?
              </p>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', mb: '20px' }}>
              <Button onClick={handleYesClick} color="primary">
                Yes
              </Button>
              <Button color="secondary">
                No
              </Button>
            </DialogActions>
          </Paper>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
