import React, { useState, useEffect } from "react";
import axios from "axios";
import TenderForm from "./TenderForm";
import TenderList from "./TenderList";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    axios
      .get("https://66346c589bb0df2359a17e03.mockapi.io/api/tenders")
      .then((response) => setTenders(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="adminPanel">
        <div className="add3">
          <Link to="/" className="back">
            Home
          </Link>
        </div>
        <div className="add">Admin Panel</div>
        <div className="add2">
          <Link to="/bids" className="adminPanelBids">
            View Bids
          </Link>
        </div>
      </div>

      <TenderForm />
      <TenderList tenders={tenders} />
    </div>
  );
};

export default AdminPanel;
