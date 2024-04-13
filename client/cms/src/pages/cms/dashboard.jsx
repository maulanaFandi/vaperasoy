import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress, Container, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DailySummary from "../../components/dailySummary.jsx";
import MonthlySummary from "../../components/monthlySummary.jsx";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const transformedData = response.data.map((item) => ({
          id: item._id,
          name: item.productData.name,
          price: item.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          }),
          quantity: item.quantity,
          totalPrice: item.totalPrice.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          }),
          paymentMethod: item.paymentMethod,
          timestamp: formatDate(new Date(item.timestamp)),
        }));

        setData(transformedData);
        setLoading(false); // Data fetching is complete
      } catch (error) {
        setError(error.message); // Set error message
        setLoading(false); // Data fetching failed
      }
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

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
      {loading ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <CircularProgress />
        </Container>
      ) : error ? (
        <Typography variant="h5" color="error" align="center">
          Error: {error}
        </Typography>
      ) : data.length === 0 ? (
        <Typography variant="h5" align="center">
          No data available
        </Typography>
      ) : (
        <>
          <Container>
            <Grid container justifyContent="center">
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 10,
                  flexGrow: 1,
                  marginLeft: 15,
                }}>
                <DailySummary />
                <MonthlySummary />
              </Container>
              
                
              <Grid item xs={12} sx={{ marginTop: 5 }}>
                <DataGrid
                  getRowId={(row) => row.id}
                  rows={data}
                  columns={columns}
                  sx={{
                    marginLeft: 20,
                    width: "80%",
                    height: "80%",
                  }}

                />
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
