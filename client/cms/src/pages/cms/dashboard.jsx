import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Container, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DailySummary from "../../components/dailySummary.jsx";
import MonthlySummary from "../../components/monthlySummary.jsx";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://localhost:3000/api/products/purchases",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const transformedData = response.data.map((item) => ({
          id: item._id,
          name: item.productData.name,
          price: formatCurrency(item.price),
          quantity: item.quantity,
          totalPrice: formatCurrency(item.totalPrice),
          paymentMethod: item.paymentMethod,
          timestamp: formatDate(new Date(item.timestamp)),
        }));

        setData(transformedData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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

  const formatCurrency = (amount) => {
    // Fungsi untuk mengubah ke format mata uang IDR
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
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
                <div style={{ height: 400, width: "80%", marginLeft: "175px" }}>
                  <DataGrid
                    getRowId={(row) => row.id}
                    rows={data}
                    columns={columns}
                    pagination
                    pageSize={10}
                  />
                </div>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
