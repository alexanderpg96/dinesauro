import React from "react";
import { Link } from "react-router-dom";

import { Button, Grid, TextField } from "@mui/material";
import { spacing } from "@mui/system";

import appLogoImage from "../assets/images/dinesauro-img.svg";

export default function LoginPage() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={6}>
        <img
          src={appLogoImage}
          alt="appLogoImage"
          style={{ width: "6.5rem" }}
        />
      </Grid>
      <Grid item xs={6}>
        <span
          className="cursive-font primary-color"
          style={{ fontSize: "2.5rem" }}
        >
          Dinesauro
        </span>
      </Grid>
      <Grid item xs={6} sx={{ mt: 6 }}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          style={{ width: "35vw" }}
        />
      </Grid>
      <Grid item xs={6} sx={{ mt: 4 }}>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          style={{ width: "35vw" }}
        />
      </Grid>

      <Grid item xs={6} sx={{ mt: 6 }}>
        <Button variant="contained" size="large" style={{ width: "35vw" }}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
