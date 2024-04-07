import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Carousel from "react-material-ui-carousel";
import { Card } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/public/products"
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
          maxWidth: "300px", // Max width to prevent too much stretching
          marginX: "auto", // Center the carousel
        }}>
        {data.map((result) => (
          <Grid key={result._id} item xs={12} sm={result.title} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}>
              <CardMedia
                component="img"
                alt="imageUrl"
                maxheight="150"
                maxwidth="150"
                image={result.imageUrl}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {result.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {result.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatPrice(result.price)}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/login`}>
                  <Button size="small">View Detail</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Carousel>
    </Container>
  );
}
