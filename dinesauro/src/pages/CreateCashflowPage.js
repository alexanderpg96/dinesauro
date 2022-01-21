import React from "react";
import { Grid, Card, Typography, Button, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../styles/pages/CreateCashflowPage.css";
import NewCashflowComponent from "../components/NewCashflowComponent";
import { uuidv4 } from "../util/util.js";

// Images
import visaLogo from "../assets/images/visa-logo.png";
import discoverLogo from "../assets/images/discover-logo.png";
import appleLogo from "../assets/images/apple-logo.jpeg";
import targetLogo from "../assets/images/target-logo.png";

export default class CreateCashflowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPaymentSelector: false,
      paymentOptions: [],
      currPayment: null,
      availableCategories: [],
      cashFlowObjects: [],
    };
    this.showPaymentSelector = this.showPaymentSelector.bind(this);
    this.setCurrPayment = this.setCurrPayment.bind(this);
    this.submitExpenses = this.submitExpenses.bind(this);
    this.getPaymentOptions();
    this.getAvailableCategories();
  }

  showPaymentSelector() {
    this.setState(() => ({
      paymentOptions: this.state.paymentOptions,
      currPayment: this.state.currPayment,
      showPaymentSelector: true,
      availableCategories: this.state.availableCategories,
      cashFlowObjects: this.state.cashFlowObjects,
    }));
  }

  setCurrPayment(event, payment) {
    event.stopPropagation();
    this.setState(() => ({
      paymentOptions: this.state.paymentOptions,
      showPaymentSelector: false,
      currPayment: payment,
      availableCategories: this.state.availableCategories,
      cashFlowObjects: this.state.cashFlowObjects,
    }));
  }

  getPaymentOptions() {
    fetch(`http://localhost:8000/api/v1/payment/`)
      .then((response) => response.json())
      .then((result) => {
        this.setState((prevState) => ({
          showPaymentSelector: this.state.showPaymentSelector,
          paymentOptions: result,
          currPayment: result[0],
          availableCategories: this.state.availableCategories,
          cashFlowObjects: this.state.cashFlowObjects,
        }));
      });
  }

  async getAvailableCategories() {
    await fetch(`http://localhost:8000/api/v1/category/`)
      .then((response) => response.json())
      .then((result) => {
        this.setState(() => ({
          showPaymentSelector: this.state.showPaymentSelector,
          paymentOptions: this.state.paymentOptions,
          currPayment: this.state.currPayment,
          availableCategories: result,
          cashFlowObjects: this.state.cashFlowObjects,
        }));
      });
  }

  addCashflow() {
    const cashFlowObjects = this.state.cashFlowObjects;
    cashFlowObjects.push({
      id: uuidv4(),
      name: "",
      category: "",
      payment: this.state.currPayment.id,
      date_of_expense: new Date(),
      ammount: 0.0,
      is_income: false,
    });
    this.setState(() => ({
      showPaymentSelector: this.state.showPaymentSelector,
      paymentOptions: this.state.paymentOptions,
      currPayment: this.state.currPayment,
      availableCategories: this.state.availableCategories,
      cashFlowObjects: this.state.cashFlowObjects,
    }));
  }

  setCashflowFormValue(value) {
    const index = this.state.cashFlowObjects.findIndex(
      (obj) => obj.id === value.id
    );
    const objects = this.state.cashFlowObjects;
    objects[index] = value;
    this.setState(() => ({
      showPaymentSelector: this.state.showPaymentSelector,
      paymentOptions: this.state.paymentOptions,
      currPayment: this.state.currPayment,
      availableCategories: this.state.availableCategories,
      cashFlowObjects: objects,
    }));
  }

  submitExpenses() {
    const bodyObj = this.state.cashFlowObjects;
    bodyObj.forEach((o) => {
      if (o.is_income) {
        o.payment = "";
      } else {
        o.payment = this.state.currPayment.id;
      }
    });
    fetch(`http://localhost:8000/api/v1/expense/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    })
      .then((response) => response.json())
      .then((result) => {
        window.location.href = "/";
      });
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={4}
        style={{ paddingTop: "2vh" }}
        sx={{ p: 8 }}
      >
        <Grid item xs={8}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Box>
                <Typography variant="h2">Add Cash Flow</Typography>
              </Box>
              <Box
                className="payment-selector"
                onClick={this.showPaymentSelector}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Box sx={{ mr: 2 }}>
                  {this.state.currPayment?.name
                    .toLowerCase()
                    .includes("visa") && (
                    <img
                      src={visaLogo}
                      alt="visa logo"
                      style={{ width: "50px" }}
                    />
                  )}
                  {this.state.currPayment?.name
                    .toLowerCase()
                    .includes("discover") && (
                    <img
                      src={discoverLogo}
                      alt="discover logo"
                      style={{ width: "50px" }}
                    />
                  )}
                  {this.state.currPayment?.name
                    .toLowerCase()
                    .includes("apple") && (
                    <img
                      src={appleLogo}
                      alt="apple logo"
                      style={{ width: "25px" }}
                    />
                  )}
                  {this.state.currPayment?.name
                    .toLowerCase()
                    .includes("target") && (
                    <img
                      src={targetLogo}
                      alt="target logo"
                      style={{ width: "25px" }}
                    />
                  )}
                </Box>
                {this.state.currPayment?.name}
                <KeyboardArrowDownIcon
                  style={{ position: "relative", top: "4px", left: "5px" }}
                />
                {this.state.showPaymentSelector && (
                  <Box className="payment-selector-popup">
                    <Card sx={{ p: 0 }} variant="outlined">
                      {this.state.paymentOptions.map((payment, index) => {
                        return (
                          <Box
                            sx={{ fontSize: "18px" }}
                            className="payment-row"
                            key={payment.id}
                            onClick={(e) => this.setCurrPayment(e, payment)}
                          >
                            {payment.name}
                          </Box>
                        );
                      })}
                    </Card>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Grid container>
                <Grid item xs={12}>
                  {this.state.cashFlowObjects.map((co, index) => {
                    return this.state.availableCategories.length ? (
                      <NewCashflowComponent
                        key={index}
                        availableCategories={this.state.availableCategories}
                        cashflowObject={co}
                        updateFormValue={this.setCashflowFormValue.bind(this)}
                      />
                    ) : (
                      <></>
                    );
                  })}
                </Grid>
                <Grid item xs={12} sx={{ mt: 3, textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    style={{ width: "50%" }}
                    onClick={() => this.addCashflow()}
                  >
                    Add Cashflow
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Card sx={{ p: 4 }} variant="outlined">
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4">Summary of Expenses</Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="h6">Number of Expenses</Typography>
                <Typography variant="body1">
                  {
                    this.state.cashFlowObjects.filter((obj) => !obj.is_income)
                      .length
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography variant="h6">Number of Incomes</Typography>
                <Typography variant="body1">
                  {
                    this.state.cashFlowObjects.filter((obj) => obj.is_income)
                      .length
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography variant="h6">Expense Card</Typography>
                <Box style={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ mr: 2 }}>
                    {this.state.currPayment?.name
                      .toLowerCase()
                      .includes("visa") && (
                      <img
                        src={visaLogo}
                        alt="visa logo"
                        style={{
                          width: "30px",
                          position: "relative",
                          top: "3px",
                        }}
                      />
                    )}
                    {this.state.currPayment?.name
                      .toLowerCase()
                      .includes("discover") && (
                      <img
                        src={discoverLogo}
                        alt="discover logo"
                        style={{ width: "45px" }}
                      />
                    )}
                    {this.state.currPayment?.name
                      .toLowerCase()
                      .includes("apple") && (
                      <img
                        src={appleLogo}
                        alt="apple logo"
                        style={{ width: "22px" }}
                      />
                    )}
                    {this.state.currPayment?.name
                      .toLowerCase()
                      .includes("target") && (
                      <img
                        src={targetLogo}
                        alt="target logo"
                        style={{ width: "22px" }}
                      />
                    )}
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      {this.state.currPayment?.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="h6">Total Expenses</Typography>
                <Typography
                  variant="string"
                  sx={{ fontSize: "30px", fontWeight: "600" }}
                >
                  $
                  {this.state.cashFlowObjects.reduce(
                    (prevAmmount, curr_obj) => {
                      if (!curr_obj.is_income) {
                        return prevAmmount + parseFloat(curr_obj.ammount);
                      } else {
                        return prevAmmount;
                      }
                    },
                    0
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h6">Total Income</Typography>
                <Typography
                  variant="string"
                  sx={{ fontSize: "30px", fontWeight: "600" }}
                >
                  $
                  {this.state.cashFlowObjects.reduce(
                    (prevAmmount, curr_obj) => {
                      if (curr_obj.is_income) {
                        return prevAmmount + parseFloat(curr_obj.ammount);
                      } else {
                        return prevAmmount;
                      }
                    },
                    0
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h6">Gross Cashflow</Typography>
                <Typography
                  variant="string"
                  sx={{ fontSize: "30px", fontWeight: "600" }}
                  className={
                    this.state.cashFlowObjects.reduce(
                      (prevAmmount, curr_obj) => {
                        if (curr_obj.is_income) {
                          return prevAmmount + parseFloat(curr_obj.ammount);
                        } else {
                          return prevAmmount - parseFloat(curr_obj.ammount);
                        }
                      },
                      0
                    ) >= 0
                      ? "success-color"
                      : "error-color"
                  }
                >
                  $
                  {this.state.cashFlowObjects.reduce(
                    (prevAmmount, curr_obj) => {
                      if (curr_obj.is_income) {
                        return prevAmmount + parseFloat(curr_obj.ammount);
                      } else {
                        return prevAmmount - parseFloat(curr_obj.ammount);
                      }
                    },
                    0
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Card>

          <Button
            variant="outlined"
            sx={{ mt: 4 }}
            onClick={this.submitExpenses}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  }
}
