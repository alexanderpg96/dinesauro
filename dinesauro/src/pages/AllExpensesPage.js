import React from "react";
import { Grid, Typography } from "@mui/material";

import ExpenseRowComponent from "../components/ExpenseRowComponent";

import { getMonthString } from "../util/util";

export default class AllExpensesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
    };
    this.getExpenses();
  }

  getExpenses() {
    const currDate = new Date();
    let currMonth = currDate.getMonth() + 1;
    currMonth = currMonth < 10 ? "0" + currMonth : currMonth;
    fetch(
      `http://localhost:8000/api/v1/expense/?start_date=2022-${currMonth}-01&end_date=2022-${currMonth}-31`
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState((prevState) => ({
          expenses: result,
        }));
      });
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
          <Typography variant="h2">All Expenses</Typography>
          <Typography variant="body2">
            For the month of {getMonthString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {this.state.expenses.map((e, index) => {
            return <ExpenseRowComponent key={e.id} {...e} />;
          })}
        </Grid>
      </Grid>
    );
  }
}
