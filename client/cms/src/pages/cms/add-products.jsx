import React from "react";
import AddProductForm from "../../components/addProductForm.jsx";
import { Grid } from "@mui/material";

export default function AddProducts() {
  return (
    <>
      <Grid style={{ textAlign: "center", marginTop: "70px"}}>
      <AddProductForm />
      </Grid>
    </>
  );
}
