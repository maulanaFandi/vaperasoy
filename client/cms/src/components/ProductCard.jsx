import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Select, MenuItem, CircularProgress, Box } from "@mui/material";
import { styled } from "@mui/system";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ProductCardContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products`, // Fetch all products
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const filteredProducts = response.data.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const sortedProducts = category
          ? filteredProducts.filter((product) => product.category === category)
          : filteredProducts;

        setTotalPages(Math.ceil(sortedProducts.length / 12)); // Calculate total pages
        setProducts(sortedProducts);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          text: "Something went wrong!",
        });
      }
    };
    fetchData();
  }, [searchQuery, category]); // Fetch data when search query or category changes

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = products.slice((page - 1) * 10, page * 10); // Get products for current page

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: 10,
        mb: 10,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Grid
        container
        item
        xs={12}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
        }}
        mt={2}
        mb={2}
      >
        <Grid item xs={12} md={6} sx={{ display: "flex", flexGrow: 1, maxWidth: "300px" }}>
          <TextField
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "100%", py: 1, px: 2 }}
          />
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ minWidth: 120, height: 57, ml: 2, mt: 1 }}
          >
            <MenuItem value="Liquid">Liquid</MenuItem>
            <MenuItem value="Device">Devices</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
          </Select>
        </Grid>
      </Grid>
      {paginatedProducts.length > 0 ? (
        paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card sx={{ maxWidth: 345, height: "500px" }}>
              <CardMedia
                component="img"
                alt="imageUrl"
                sx={{padding: 2, maxWidth: 300, objectFit: "contain", margin: "auto", display: "block", justifyContent: "center", alignItems: "center", height: "300px" }}
                image={product.imageUrl}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatPrice(product.price)}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/products/${product._id}`}>
                  <Button size="small">View Detail</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <CircularProgress />
        </Box>
      )}

      <Grid
        item
        xs={12}
        sx={{
          textAlign: "center",
          mt: 2,
          mb: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/products${item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
