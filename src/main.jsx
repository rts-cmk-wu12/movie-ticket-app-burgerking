import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./styles/main.scss";
import Details from "./pages/details";
import SelectSeats from "./pages/seats";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/details/:movieId" element={<Details />} />
        <Route path="/seats/:movieId" element={<SelectSeats />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
