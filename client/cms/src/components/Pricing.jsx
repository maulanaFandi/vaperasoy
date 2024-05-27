import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";
import { Card } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Pricing() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vaperasoy.vercel.app/api/public/products"
        );
        const randomData = response.data
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);
        setData(randomData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };
  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography component="h2" variant="h4" color="text.primary">
          Product
        </Typography>
        <Typography variant="body1" color="text.secondary">
          "Our products provide the best quality as well as very affordable
          prices."
        </Typography>
      </Box>
      <Carousel
        autoPlay={true}
        animation="slide"
        navButtonsWrapperProps={{
          style: {
            backgroundColor: "transparent",
            color: "black",
          },
        }}
        indicators={false}
        timeout={10000}
        swipe
        navButtonsProps={{
          style: {
            backgroundColor: "transparent",
            color: "black",
          },
        }}
        sx={{
          width: "100%",
          maxWidth: 500, // Max width to prevent too much stretching
          marginX: "auto", // Center the carousel
        }}>
        {data.map((result) => (
          <Paper
            key={result._id}
            sx={{
              p: 2,
              margin: "auto",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="imageUrl" src={result.imageUrl} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div">
                      {result.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {result.description}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Link to={`/login`}>
                      <Button variant="contained" size="small" color="primary">
                        View Detail
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    {formatPrice(result.price)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Carousel>
    </Container>
  );
}
