import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CryptoCurrencies from "./pages/CryptoCurrencies";
import CurrencyDetails from "./pages/CurrencyDetails";
import Exchanges from "./pages/Exchanges";
import Home from "./pages/Home";
import News from "./pages/News";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cryptoCurrencies" element={<CryptoCurrencies />} />
          <Route path="/news" element={<News />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/crypto/:uuid" element={<CurrencyDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
