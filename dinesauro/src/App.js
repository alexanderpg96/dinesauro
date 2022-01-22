import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NavbarComponent from "./components/NavbarComponent";
import CreateCashflowPage from "./pages/CreateCashflowPage";
import AllExpensesPage from "./pages/AllExpensesPage";
import MonthlyForecastPage from "./pages/MonthlyForecastPage";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route exact path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cashflow" element={<CreateCashflowPage />} />
        <Route path="/expenses" element={<AllExpensesPage />} />
        <Route path="/forecasts" element={<MonthlyForecastPage />} />
      </Routes>
    </>
  );
}

export default App;
