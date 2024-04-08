import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";

export default function Home() {
  const [data, setData] = useState([]);

  // useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products/purchases",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(response.data);

        // Transform data from MongoDB response
        const transformedData = response.data.map((item, index) => ({
          id: item._id, 
          name: item.productData.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          paymentMethod: item.paymentMethod,
          timestamp: new Date(item.timestamp).toLocaleString(),
        }));

        setData(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: "timestamp", headerName: "Date", width: 200 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "price", headerName: "Price", width: 180 },
    { field: "quantity", headerName: "Quantity", width: 180 },
    { field: "totalPrice", headerName: "Total Price", width: 180 },
    { field: "paymentMethod", headerName: "Payment Method", width: 180 },
  ];

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Grid container justifyContent="center" sx={{ mt: 2, mb: 2 }}>
          Test
        </Grid>
        <Typography variant="h6" sx={{ textAlign: "left", marginTop: "20px" }}>
          Log
        </Typography>
        <DataGrid
          getRowId={(row) => row.id}
          rows={data}
          columns={columns}
          sx={{
            flexGrow: 1,
            width: "70%",
            marginBottom: "10px",
            marginLeft: "250px",
            marginRight: "auto",
            textAlign: "center",
            alignContent: "center",
          }}
        />
      </Box>
    </>
  );
}
