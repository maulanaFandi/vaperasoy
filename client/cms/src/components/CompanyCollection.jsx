import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const darkLogos = [
  'https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/938a8bc05713fa2853c93bdcd2d1e17f.jpg',
  'https://png.pngitem.com/pimgs/s/104-1043576_voopoo-white-logo-png-transparent-png.png',
  'https://www.houseofvapeslondon.co.uk/cdn/shop/collections/VAPORESSO_60f378bf-53be-4c5c-836d-689756fb70c4_1200x1200.png?v=1653037981',
  'https://logovectorseek.com/wp-content/uploads/2020/02/smok-logo-vector.png',
];

const logoStyle = {
  width: '100px',
  height: '100px',
  margin: '0 32px',
};

export default function CompanyCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : null;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
      >
        Trusted by the best companies
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`logo ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

