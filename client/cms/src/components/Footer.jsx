import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";

const logoStyle = {
  width: "140px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link href="https://mui.com/">Sitemark&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
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
            <Typography variant="body2" color="text.secondary" mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon/>Jl. Purnawarman No.1 (Didalam Taman Kuliner Cireundeu)
            </Typography>
            </Link>
            <Typography variant="body2" color="text.secondary" mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ContactPhoneIcon/> +62 21 7478 8269
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WhatsAppIcon/> +62 812 8890 7132
            </Typography>
               <Link to={"https://www.instagram.com/vaperasoy.crd/"}>
            <Typography variant="body2" color="text.secondary" mb={2} sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}>
            <InstagramIcon/>Vaperasoy
            </Typography>
              </Link>
            
          </Box>
        </Box>    
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}>
        <div>
          <Link color="text.secondary" href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}>
          <IconButton
            color="inherit"
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}>
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://twitter.com/MaterialUI"
            aria-label="X"
            sx={{ alignSelf: "center" }}>
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/company/mui/"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}>
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
