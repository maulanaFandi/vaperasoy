import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function DailySummary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailySummary, setDailySummary] = useState([]);

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
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          paymentMethod: item.paymentMethod,
          timestamp: formatDate(new Date(item.timestamp)),
        }));

        setData(transformedData);
        setLoading(false); // Data fetching is complete

        // Calculate daily summary
        const summary = calculateDailySummary(transformedData);
        setDailySummary(summary);
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

  const calculateDailySummary = (data) => {
    const summary = {};
    data.forEach((item) => {
      const date = item.timestamp.split(" ")[0]; // Get date part only
      if (!summary[date]) {
        summary[date] = {
          totalPrice: 0,
          totalQuantity: 0,
        };
      }
      summary[date].totalPrice += item.totalPrice;
      summary[date].totalQuantity += item.quantity;
    });
    return summary;
  };

  const columns = [
    { field: "date", headerName: "Date", width: 200 },
    { field: "totalPrice", headerName: "Total Price", width: 180 },
    { field: "totalQuantity",align: "center", headerName: "Total Quantity", width: 180 },
  ];

  const summaryRows = Object.keys(dailySummary).map((date) => ({
    id: date,
    date,
    totalPrice: dailySummary[date].totalPrice.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    totalQuantity: dailySummary[date].totalQuantity,
  }));

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
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
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              width: 450,
              height: 350,
              margin: "auto",
              "& .actions": {
                color: "text.secondary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },
            }}
          >
            <Typography variant="h5">
              Daily Summary
            </Typography>
            <DataGrid
              getRowId={(row) => row.id}
              rows={summaryRows}
              columns={columns}
            />
          </Box>
        </>
      )}
    </>
  );
}
