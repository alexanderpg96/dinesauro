import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

import { getMonthString } from "../util/util";
import ExpenseForecastProgressComponent from "../components/ExpenseForecastProgressComponent";

export default class MonthlyForecastPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecasts: [],
      formValue: {
        category: "",
        ammount: 0,
      },
      availableCategories: [],
    };
    this.getForecasts();
    this.getAvailableCategories();
  }

  getForecasts() {
    const currDate = new Date();
    let currMonth = currDate.getMonth() + 1;
    currMonth = currMonth < 10 ? "0" + currMonth : currMonth;
    fetch(
      `http://localhost:8000/api/v1/category_forecast/?start_date=2022-${currMonth}-01&end_date=2022-${currMonth}-31`
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState(() => ({
          formValue: this.state.formValue,
          availableCategories: this.state.availableCategories,
          forecasts: result,
        }));
      });
  }

  getAvailableCategories() {
    fetch(`http://localhost:8000/api/v1/category/`)
      .then((response) => response.json())
      .then((result) => {
        this.setState(() => ({
          formValue: this.state.formValue,
          availableCategories: result,
          forecasts: this.state.forecasts,
        }));
      });
  }

  filterAvailableCategories(categories) {
    const availableCats = [];

    categories.forEach((cat) => {
      if (
        this.state.forecasts.filter((f) => f.category === cat.name).length === 0
      ) {
        availableCats.push(cat);
      }
    });

    console.log(availableCats);

    return availableCats;
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={2}
        style={{ paddingTop: "2vh" }}
        sx={{ p: 8 }}
      >
        <Grid item xs={12}>
          <Typography variant="h2">All Forecasts</Typography>
          <Typography variant="body2">
            For the month of {getMonthString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {this.state.forecasts.map((f, index) => {
            return <ExpenseForecastProgressComponent key={index} {...f} />;
          })}
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Select
                displayEmpty
                id="demo-simple-select"
                input={<OutlinedInput />}
                value={this.state.formValue.category}
                label="Category"
                onChange={(event) => this.handleChange(event, "category")}
                style={{ width: "100%" }}
              >
                <MenuItem disabled value="">
                  <em>Category</em>
                </MenuItem>
                {this.filterAvailableCategories(
                  this.state.availableCategories
                )?.map((cat) => {
                  return (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Ammount Forecasted"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            className="dark-grey-btn"
            sx={{ mt: 5, width: "50%", marginLeft: "25%" }}
          >
            Create New Forecast
          </Button>
        </Grid>
      </Grid>
    );
  }
}
