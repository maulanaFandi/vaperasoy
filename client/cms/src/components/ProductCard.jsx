import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
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

const ProductCardContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        setTotalPages(Math.ceil(response.data.length / 10)); // Calculate total pages
        setProducts(response.data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          text: "Something went wrong!",
        });
      }
    };
    fetchData();
  }, []); // Fetch data only once when component mounts

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = products.slice((page - 1) * 10, page * 10); // Get products for current page

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
        flexDirection: "row",
        gap: 4,
        width: "100%",
      }}
    >
      {paginatedProducts.length > 0 ? (
        paginatedProducts.map((product) => (
          <Card key={product._id} sx={{ maxWidth: 345, mt: 3 }}>
            <CardMedia
              component="img"
              alt="imageUrl"
              height="140"
              image={product.imageUrl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/products/${product._id}`}>
                <Button size="small">View Detail</Button>
              </Link>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="body1" gutterBottom>
          No products available
        </Typography>
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
