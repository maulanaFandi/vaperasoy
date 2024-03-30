import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Hero from '../../components/Hero';
import CompanyCollection from '../../components/CompanyCollection';
import Highlights from '../../components/Highlights';
import Pricing from '../../components/Pricing';
// import Features from './components/Features';
import Testimonials from '../../components/Testimonials';
import Footer from '../../components/Footer';

export default function LandingPage() {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
      <Divider />
        <Pricing />
        {/* <Features /> */}
        <Divider />
        <CompanyCollection/>
        <Divider />
        <Highlights />
        <Divider />
        <Testimonials />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}