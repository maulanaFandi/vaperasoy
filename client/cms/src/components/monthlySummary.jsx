import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlySummary, setMonthlySummary] = useState([]);

  // useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vaperasoy.vercel.app/api/products/purchases",
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

        // Calculate monthly summary
        const summary = calculateMonthlySummary(transformedData);
        setMonthlySummary(summary);
      } catch (error) {
        setError(error.message); // Set error message
        setLoading(false); // Data fetching failed
      }
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const calculateMonthlySummary = (data) => {
    const summary = {};
    data.forEach((item) => {
      const date = formatDate(new Date(item.timestamp)); // Get month-year format
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
    { field: "month", headerName: "Month", width: 200 },
    { field: "totalPrice", headerName: "Total Price", width: 180 },
    { field: "totalQuantity",align: "center", headerName: "Total Quantity", width: 180 },
  ];

  const summaryRows = Object.keys(monthlySummary).map((month) => ({
    id: month,
    month,
    totalPrice: monthlySummary[month].totalPrice.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    }),
    totalQuantity: monthlySummary[month].totalQuantity,
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
              Monthly Summary
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
