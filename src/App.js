import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import UserView from "./components/UserView";
import BidsManagement from "./components/BidsManagement";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/bids" element={<BidsManagement />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
