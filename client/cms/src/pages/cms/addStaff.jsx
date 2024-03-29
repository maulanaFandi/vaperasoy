import React from "react";
import AddStaffForm from "../../components/addStaffForm.jsx";
import { Grid } from "@mui/material";

export default function AddProducts() {
  return (
    <>
      <Grid style={{ textAlign: "center", marginTop: "70px"}}>
      <AddStaffForm />
      </Grid>
    </>
  );
}
