import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BidsManagement = () => {
  const [bids, setBids] = useState([]);
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bids
        const bidsResponse = await axios.get(
          "https://66346c589bb0df2359a17e03.mockapi.io/api/quotation"
        );
        console.log("Bids Response:", bidsResponse.data);
        setBids(bidsResponse.data.sort((a, b) => a.bidcost - b.bidcost));

        // Fetch tenders
        const tendersResponse = await axios.get(
          "https://66346c589bb0df2359a17e03.mockapi.io/api/tenders"
        );
        console.log("Tenders Response:", tendersResponse.data);
        setTenders(tendersResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateTenderEndTime = async (tender) => {
      try {
        console.log(
          `Updating tender ${tender.id} with new end time: ${tender.endtime}`
        );
        await axios.put(
          `https://66346c589bb0df2359a17e03.mockapi.io/api/tenders/${tender.id}`,
          { endtime: tender.endtime }
        );
      } catch (error) {
        console.error(error);
      }
    };

    const processBids = () => {
      const updatedBids = bids.map((bid) => {
        const tender = tenders.find((tender) => tender.id === bid.tenderId);
        if (tender) {
          const tenderEndTime = new Date(tender.endtime);
          const bidTime = new Date(bid.bidtime);
          const timeDiff = (tenderEndTime - bidTime) / 60000;

          if (timeDiff <= 5 && timeDiff >= 0) {
            bid.flag = true;

            const bufferTime = tender.bufferTime || 0;
            const newEndTime = new Date(
              tenderEndTime.getTime() + bufferTime * 60000
            );
            tender.endtime = newEndTime.toISOString();

            updateTenderEndTime(tender);
          }
        }
        return bid;
      });

      setBids(updatedBids);
    };

    if (bids.length > 0 && tenders.length > 0) {
      processBids();
    }
  }, [bids, tenders]);

  return (
    <div className="bidsManagementContainer">
      <div className="head">
        <Link to="/admin" className="head1">
          back
        </Link>
        <h2 className="head2">Bids Management</h2>
      </div>
      <table className="bidsTable">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Bid Time</th>
            <th>Bid Cost</th>
            <th>Tender Id</th>
            <th>Tender Name</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td>{bid.name}</td>
              <td>{new Date(bid.bidtime).toLocaleString()}</td>
              <td>{bid.bidcost}</td>
              <td>{bid.tenderId}</td>
              <td>{bid.tenderName}</td>
              <td>{bid.flag ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidsManagement;
