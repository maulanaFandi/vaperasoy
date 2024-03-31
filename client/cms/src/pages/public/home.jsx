import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Hero from '../../components/Hero';
import CompanyCollection from '../../components/CompanyCollection';
import Highlights from '../../components/Highlights';
import Pricing from '../../components/Pricing';
import Testimonials from '../../components/Testimonials';
import Footer from '../../components/Footer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

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
    setOpenModal(true);
  };

  const handleBackdropClick = (event) => {
    event.stopPropagation();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
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
        <Dialog
          open={openModal}
          onClick={handleBackdropClick}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <p>Are you over 18 years old?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleYesClick} color="primary">
              Yes
            </Button>
            <Button onClick={handleNoClick} color="secondary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
