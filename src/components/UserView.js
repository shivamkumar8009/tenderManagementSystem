import React, { useState, useEffect } from "react";
import axios from "axios";
import QuotationForm from "./QuotationForm";
import { Link } from "react-router-dom";

const UserView = () => {
  const [tenders, setTenders] = useState([]);
  const [newTenderNotification, setNewTenderNotification] = useState(false);
  const [selectedTender, setSelectedTender] = useState(null);

  const fetchTenders = () => {
    axios
      .get("https://66346c589bb0df2359a17e03.mockapi.io/api/tenders")
      .then((response) => {
        const newTenders = response.data;
        const now = new Date();
        const recentTenders = newTenders.filter(
          (tender) => (now - new Date(tender.createdAt)) / 60000 < 5
        );

        if (recentTenders.length > 0) {
          setNewTenderNotification(true);
          setTimeout(() => {
            setNewTenderNotification(false);
          }, 5000);
        }

        setTenders(newTenders);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchTenders();
    const intervalId = setInterval(fetchTenders, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleQuotationClick = (tender) => {
    setSelectedTender(tender);
  };

  const handleFormSubmit = () => {
    setSelectedTender(null);
  };

  return (
    <div className="userViewContainer">
      {newTenderNotification && (
        <div className="notification">
          A new tender has been created within the last 5 minutes!
        </div>
      )}

      <div className="user">
        <div>
          <Link to="/" className="userback">
            Home
          </Link>
        </div>

        <div>
          <h2>Available Tenders</h2>
        </div>
      </div>

      <table className="tenderTable">
        <thead>
          <tr>
            <th>Tender Name</th>
            <th>Tender Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.name}</td>
              <td>{tender.description}</td>
              <td>{tender.starttime}</td>
              <td>{tender.endtime}</td>
              <td>
                <button
                  onClick={() => handleQuotationClick(tender)}
                  className="userViewButton"
                >
                  Submit Quotation
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTender && (
        <QuotationForm
          tenderId={selectedTender.id}
          tenderName={selectedTender.name}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default UserView;

