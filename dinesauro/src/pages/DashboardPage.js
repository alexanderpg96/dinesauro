import React from "react";
import { Grid, Card, Typography, Button } from "@mui/material";
import ExpenseRowComponent from "../components/ExpenseRowComponent";
import ExpenseForecastProgressComponent from "../components/ExpenseForecastProgressComponent";
import { getMonthString } from "../util/util";

export default class DashboardPage extends React.Component {
  totalExpenses = 0;
  totalIncome = 0;

  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      forecasts: [],
    };
  }

  async componentDidMount() {
    await this.getExpenses();
    await this.getForecasts();
    this.calculateExpenseIncomeSums();
  }

  async getExpenses() {
    const currDate = new Date();
    let currMonth = currDate.getMonth() + 1;
    currMonth = currMonth < 10 ? "0" + currMonth : currMonth;
    await fetch(
      `http://localhost:8000/api/v1/expense/?start_date=2022-${currMonth}-01&end_date=2022-${currMonth}-31`
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState((prevState) => ({
          ...prevState.forecasts,
          expenses: result,
        }));
      });
  }

  async getForecasts() {
    const currDate = new Date();
    let currMonth = currDate.getMonth() + 1;
    currMonth = currMonth < 10 ? "0" + currMonth : currMonth;
    await fetch(
      `http://localhost:8000/api/v1/category_forecast/?start_date=2022-${currMonth}-01&end_date=2022-${currMonth}-31`
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState((prevState) => ({
          ...prevState.expenses,
          forecasts: result,
        }));
      });
  }

  calculateExpenseIncomeSums() {
    this.state.expenses.forEach((exp) => {
      if (exp.is_income) {
        this.totalIncome += exp.ammount;
      } else {
        this.totalExpenses += exp.ammount;
      }
    });
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={10}
        style={{ paddingTop: "2vh" }}
      >
        <Grid item xs={8}>
          <Grid container direction="row" justifyContent="center" spacing={10}>
            <Grid item xs={6}>
              <Card sx={{ minWidth: 275, p: 2, ml: 7 }} variant="outlined">
                <Typography align="center" variant="h2" className="error-color">
                  $
                  {parseFloat(
                    this.state.expenses.reduce((prev, obj) => {
                      if (!obj.is_income) {
                        return prev + obj.ammount;
                      }

                      return prev;
                    }, 0)
                  ).toFixed(2)}
                </Typography>
                <Typography align="center" sx={{ fontSize: "18px" }}>
                  Expenses
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ minWidth: 275, p: 2 }} variant="outlined">
                <Typography
                  align="center"
                  variant="h2"
                  className="success-color"
                >
                  $
                  {parseFloat(
                    this.state.expenses.reduce((prev, obj) => {
                      if (obj.is_income) {
                        return prev + obj.ammount;
                      }

                      return prev;
                    }, 0)
                  ).toFixed(2)}
                </Typography>
                <Typography align="center" sx={{ fontSize: "18px" }}>
                  Income
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ minWidth: 275, p: 4, ml: 7 }} variant="outlined">
                <Grid container direction="row" spacing={0}>
                  <Grid item xs>
                    <Typography variant="h4">Expenses</Typography>
                    <Typography variant="body2">
                      For the month of {getMonthString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button href="/cashflow" variant="outlined">
                      Add Cash Flow
                    </Button>
                  </Grid>
                </Grid>

                {this.state.expenses.map(
                  (e, index) =>
                    index < 4 && <ExpenseRowComponent {...e} key={e.id} />
                )}

                <Grid container direction="row" spacing={0}>
                  <Grid item xs={4} />
                  <Grid item xs={4}>
                    <Button
                      href="/expenses"
                      variant="outlined"
                      className="dark-grey-btn"
                      sx={{ mt: 5 }}
                    >
                      View All
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minWidth: 275, p: 4, mr: 7 }} variant="outlined">
            <Grid container direction="row" spacing={0}>
              <Grid item xs={12}>
                <Typography variant="h4">Your Forecast</Typography>
              </Grid>
            </Grid>

            {this.state.forecasts.map((c, index) => (
              <ExpenseForecastProgressComponent key={index} {...c} />
            ))}

            <Button
              href="/forecasts"
              variant="outlined"
              className="dark-grey-btn"
              sx={{ mt: 5 }}
            >
              Manage Monthly Forecast
            </Button>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
