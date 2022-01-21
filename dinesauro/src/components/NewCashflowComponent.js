import React from "react";
import {
  Grid,
  Card,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default class ExpenseForecastProgressComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableCategories: props.availableCategories,
      formValue: props.cashflowObject,
    };
  }

  handleChange = (event, type) => {
    const formValue = this.state.formValue;

    if (type === "date_of_expense") {
      formValue[type] = event;
    } else if (type === "is_income") {
      formValue[type] = event.target.checked;
    } else {
      formValue[type] = event.target.value;
    }

    this.setState(() => ({
      availableCategories: this.state.availableCategories,
      formValue: formValue,
    }));
    this.props.updateFormValue(this.state.formValue);
  };

  render() {
    return (
      <Card sx={{ p: 4, mb: 3 }} variant="outlined">
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              style={{ width: "100%" }}
              value={this.state.formValue.name}
              onChange={(event) => this.handleChange(event, "name")}
            />
          </Grid>
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
              {this.state.availableCategories?.map((cat) => {
                return (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date of Expense"
                inputFormat="MM/dd/yyyy"
                value={this.state.formValue.date_of_expense}
                renderInput={(params) => <TextField {...params} />}
                onChange={(event) =>
                  this.handleChange(event, "date_of_expense")
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Ammount"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              style={{ width: "100%" }}
              value={this.state.formValue.ammount}
              onChange={(event) => this.handleChange(event, "ammount")}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <FormControlLabel
              control={
                <Checkbox
                  value={!this.state.formValue.is_income}
                  onChange={(event) => this.handleChange(event, "is_income")}
                />
              }
              label="Income"
            />
          </Grid>
        </Grid>
      </Card>
    );
  }
}
