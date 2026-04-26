import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App/App";
import MainNavbar from "./Components/Navbar/MainNavbar";
import Footer from "./Components/Footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <div className="App">
        <MainNavbar />
        <App />
        <Footer />
      </div>
    </React.StrictMode>
  </BrowserRouter>
);
