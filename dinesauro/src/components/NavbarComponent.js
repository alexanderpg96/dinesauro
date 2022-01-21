import React from "react";
import { Grid, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

import appLogoImage from "../assets/images/dinesauro-img.svg";

export default function NavbarComponent() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ height: "12vh" }}
    >
      <Grid item xs={4}>
        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
          <Typography
            sx={{ fontSize: "28px", ml: 4 }}
            className="cursive-font primary-color"
          >
            Dinesauro
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={4} style={{ textAlign: "center" }}>
        <img src={appLogoImage} alt="appLogoImage" style={{ width: "4rem" }} />
      </Grid>
      <Grid item xs={4}>
        <Typography align="right" sx={{ fontSize: "18px", mr: 4 }}>
          <AccountCircleIcon
            style={{ position: "relative", top: "5.5px", marginRight: "6px" }}
          />{" "}
          Alexander P.
        </Typography>
      </Grid>
    </Grid>
  );
}
