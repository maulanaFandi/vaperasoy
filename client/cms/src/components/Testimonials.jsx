import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Swal from "sweetalert2";
import axios from "axios";
import { useTheme } from "@mui/system";
import { useState, useEffect } from "react";

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/public/users"
        );
        // Filter out data with role "admin"
        const filteredData = response.data.filter(
          (user) => user.role !== "admin"
        );

        // Shuffle the filtered data
        const shuffledData = filteredData.sort(() => Math.random() - 0.5);

        // Limit the data to 6 entries
        const limitedData = shuffledData.slice(0, 6);

        setData(limitedData);
      } catch (error) {
        console.log(error);
        Swal.fire;
      }
    };
    fetchData();
  }, []);

  return (
    <Container
      id="testimonials"
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
          Testimonials
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See what our customers love about our products. Discover how we excel
          in efficiency, durability, and satisfaction. Join us for quality,
          innovation, and reliable support.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {data.map((result) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={result._id}
            sx={{ display: "flex" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                p: 1,
              }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {result.testimony}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  pr: 2,
                }}>
                {/* Displaying the image as Avatar */}
                <CardHeader
                  avatar={<Avatar src={result.imgUrl} />} // Using Avatar component
                  title={result.name}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
