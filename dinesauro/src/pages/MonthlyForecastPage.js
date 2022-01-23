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
      expenses: [],
      availableCategories: [],
      showAddForecast: false,
      showForecastEditIndex: -1,
    };
    this.getExpenses();
    this.getForecasts();
    this.getAvailableCategories();

    this.createForecast = this.createForecast.bind(this);
    this.updateShowCreateForecastState =
      this.updateShowCreateForecastState.bind(this);
  }

  getExpenses() {
    const currDate = new Date();
    let currMonth = currDate.getMonth() + 1;
    currMonth = currMonth < 10 ? "0" + currMonth : currMonth;
    fetch(
      `http://127.0.0.1:8000/api/v1/expense/?start_date=2022-${currMonth}-01&end_date=2022-${currMonth}-31`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState((prevState) => ({
          forecasts: this.state.forecasts,
          formValue: this.state.formValue,
          availableCategories: this.state.availableCategories,
          expenses: result,
          showAddForecast: this.state.showAddForecast,
          showForecastEditIndex: this.state.showForecastEditIndex,
        }));
      });
  }

  getForecasts() {
    const currDate = new Date();
    let currMonth = currDate.getMonth() + 1;
    currMonth = currMonth < 10 ? "0" + currMonth : currMonth;
    fetch(
      `http://127.0.0.1:8000/api/v1/category_forecast/?start_date=2022-${currMonth}-01&end_date=2022-${currMonth}-31`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState(() => ({
          formValue: this.state.formValue,
          availableCategories: this.state.availableCategories,
          forecasts: result,
          expenses: this.state.expenses,
          showAddForecast: this.state.showAddForecast,
          showForecastEditIndex: this.state.showForecastEditIndex,
        }));
      });
  }

  getAvailableCategories() {
    fetch(`http://127.0.0.1:8000/api/v1/category/`)
      .then((response) => response.json())
      .then((result) => {
        this.setState(() => ({
          formValue: this.state.formValue,
          availableCategories: result,
          forecasts: this.state.forecasts,
          expenses: this.state.expenses,
          showAddForecast: this.state.showAddForecast,
          showForecastEditIndex: this.state.showForecastEditIndex,
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

    return availableCats;
  }

  createForecast() {
    const bodyObj = this.state.formValue;
    bodyObj.created_by = "1124be7a-fbb9-4a66-a46c-2a5f6aea3833";
    bodyObj.updated_by = "1124be7a-fbb9-4a66-a46c-2a5f6aea3833";

    fetch(`http://127.0.0.1:8000/api/v1/category_forecast/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    })
      .then((response) => response.json())
      .then((result) => {
        this.getForecasts();
        this.updateShowCreateForecastState();
      });
  }

  updateForecast(forecastId, index) {
    const bodyObj = this.state.formValue;
    bodyObj.created_by = "1124be7a-fbb9-4a66-a46c-2a5f6aea3833";
    bodyObj.updated_by = "1124be7a-fbb9-4a66-a46c-2a5f6aea3833";

    fetch(`http://127.0.0.1:8000/api/v1/category_forecast/${forecastId}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    })
      .then((response) => response.json())
      .then((result) => {
        this.showForecastEdit(index);
        this.getForecasts();
      });
  }

  handleChange = (event, type) => {
    const formValue = this.state.formValue;

    formValue[type] = event.target.value;

    this.setState(() => ({
      formValue: formValue,
      availableCategories: this.state.availableCategories,
      forecasts: this.state.forecasts,
      expenses: this.state.expenses,
      showAddForecast: this.state.showAddForecast,
      showForecastEditIndex: this.state.showForecastEditIndex,
    }));
  };

  updateShowCreateForecastState() {
    this.setState(() => ({
      formValue: this.state.formValue,
      availableCategories: this.state.availableCategories,
      forecasts: this.state.forecasts,
      expenses: this.state.expenses,
      showAddForecast: !this.state.showAddForecast,
      showForecastEditIndex: this.state.showForecastEditIndex,
    }));
  }

  showForecastEdit(index) {
    console.log(this.state.showForecastEditIndex);
    this.setState(() => ({
      formValue: {
        category: this.state.forecasts[index].category_id,
        ammount: this.state.forecasts[index].forecast,
      },
      availableCategories: this.state.availableCategories,
      forecasts: this.state.forecasts,
      expenses: this.state.expenses,
      showAddForecast: this.state.showAddForecast,
      showForecastEditIndex: this.state.showForecastEditIndex > -1 ? -1 : index,
    }));
  }

  render() {
    return (
      <Grid
        container
        direction="row"
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
        <Grid item xs={8}>
          <Grid container>
            {this.state.forecasts.map((f, index) => {
              if (this.state.showForecastEditIndex !== index) {
                return (
                  <>
                    <Grid item xs={12}>
                      <ExpenseForecastProgressComponent key={index} {...f} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "right", mt: 1, mr: 1 }}
                      className="edit-link"
                      onClick={() => this.showForecastEdit(index)}
                    >
                      Edit
                    </Grid>
                  </>
                );
              } else {
                return (
                  <Grid item xs={12} sx={{ mt: 4 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Select
                          displayEmpty
                          id="demo-simple-select"
                          input={<OutlinedInput />}
                          value={this.state.formValue.category}
                          label="Category"
                          onChange={(event) =>
                            this.handleChange(event, "category")
                          }
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
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Ammount Forecasted"
                          variant="outlined"
                          type="number"
                          value={this.state.formValue.ammount}
                          onChange={(event) =>
                            this.handleChange(event, "ammount")
                          }
                          style={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          variant="contained"
                          style={{ width: "100%" }}
                          onClick={() => this.updateForecast(f.id, index)}
                        >
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            })}
          </Grid>
        </Grid>
        {this.state.showAddForecast && (
          <Grid item xs={8} sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Ammount Forecasted"
                  variant="outlined"
                  type="number"
                  onChange={(event) => this.handleChange(event, "ammount")}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={this.createForecast}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}

        {!this.state.showAddForecast && (
          <Grid item xs={8}>
            <Button
              variant="outlined"
              className="dark-grey-btn"
              sx={{ mt: 5, width: "50%", marginLeft: "25%" }}
              onClick={this.updateShowCreateForecastState}
            >
              Create New Forecast
            </Button>
          </Grid>
        )}
      </Grid>
    );
  }
}
