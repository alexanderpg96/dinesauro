import React from "react";
import { Grid, Typography } from "@mui/material";
import "../styles/components/ExpenseForecastProgress.css";

export default class ExpenseForecastProgressComponent extends React.Component {
  render() {
    return (
      <Grid container direction="row" style={{ marginTop: "15px" }}>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={6}>
              <Typography variant="h6">{this.props.category}</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography
                variant="body1"
                style={{ position: "relative", right: "6px", top: "4px" }}
              >
                ${this.props.forecast.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <div className="progress-bar-container">
                <div
                  className={
                    "progress-bar " +
                    ((this.props.expenses / this.props.forecast) * 100 > 100
                      ? "error-progress"
                      : "")
                  }
                  style={{
                    width: `${Math.min(
                      Math.max(
                        (this.props.expenses / this.props.forecast) * 100,
                        0
                      ),
                      100
                    )}%`,
                  }}
                >
                  ${this.props.expenses.toFixed(2)}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
