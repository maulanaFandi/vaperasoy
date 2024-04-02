import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

const items = [
  {
    icon: <LoyaltyIcon />,
    title: "Sales of E-Cigarettes and Accessories",
    description:
      "Provide a variety of e-cigarettes and related accessories, such as pods, coils, batteries, chargers and casings.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Repair and Maintenance",
    description:
      "We can also offer repair and maintenance services for vape devices. This includes cleaning, replacing damaged components, or general repairs on devices such as mods and tanks.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "Product Consultations and Explanations",
    description:
      "Our staff are usually trained to provide consultations to customers about the products they offer. They can provide information about different types of vape devices, e-liquids, and how to use them.",
  },
  {
    icon: <LocalShippingIcon />,
    title: "Delivery and Pickup Services",
    description:
      "We may offer delivery services for customers who wish to order products online or over the phone. Additionally, they can also offer in-store pickup services, where customers can order online and then pick up their order at the store location without having to wait long.",
  },
  {
    icon: <LocalOfferIcon />,
    title: "Alternative Products at Lower Prices",
    description:
      "In addition to providing premium products, we can also offer more affordable product options for customers on a limited budget. This can be a generic brand of e-liquid or a vape device with basic features but still high quality.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Device Testing Services",
    description: "We may offer device testing services to ensure that customers' vape devices are functioning properly and comply with safety standards. This can include testing the battery, electrical output, and other functions.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
      }}>
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}>
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}>
          <Typography component="h2" variant="h4">
            Services
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Experience satisfaction in every puff! Our vape shop is dedicated to
            providing top-notch service, ensuring your vaping journey is smooth
            and enjoyable. From expert advice to premium products, we've got you
            covered. Discover the perfect vape experience with us today!
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                  backgroundColor: "grey.900",
                }}>
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
