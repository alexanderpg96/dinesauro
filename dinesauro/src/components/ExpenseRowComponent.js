import React from "react";
import { Grid, Typography } from "@mui/material";
import { convertISOStringToMonthDay } from "../util/util";

export default class ExpenseRowComponent extends React.Component {
  render() {
    return (
      <Grid container direction="row" style={{ marginTop: "25px" }}>
        <Grid item xs={4}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="h6">{this.props?.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                {this.props?.category?.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Typography variant="body1">
            {convertISOStringToMonthDay(this.props?.date_of_expense)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            align="right"
            sx={{ fontSize: "18px", mr: 4, fontWeight: "bold" }}
            className={this.props.is_income ? "success-color" : "error-color"}
          >
            ${this.props.ammount}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
