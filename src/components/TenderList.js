import React from "react";

const TenderList = ({ tenders }) => {
  return (
    <div className="tenderList">
      <h3>Previous Tenders</h3>
      <table className="tenderTableList">
        <thead>
          <tr>
            <th>Tender Name</th>
            <th>Tender Description</th>
            <th>Tender Start Date</th>
            <th>Tender End Date</th>
            <th>Buffer Time</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.name}</td>
              <td>{tender.description}</td>
              <td>{tender.starttime}</td>
              <td>{tender.endtime}</td>
              <td>{tender.bufferTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenderList;
