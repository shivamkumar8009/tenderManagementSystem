import React, { useState } from "react";
import axios from "axios";

const TenderForm = () => {
  const [tender, setTender] = useState({
    name: "",
    description: "",
    starttime: "",
    endtime: "",
    bufferTime: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTender({ ...tender, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("https://66346c589bb0df2359a17e03.mockapi.io/api/tenders", tender)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.error(error));
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

  
    if (!tender.name.trim()) {
      newErrors.name = "Tender Name is required";
      valid = false;
    }

   
    if (!tender.description.trim()) {
      newErrors.description = "Tender Description is required";
      valid = false;
    }

   
    if (!tender.starttime) {
      newErrors.starttime = "Start Date is required";
      valid = false;
    }

  
    if (!tender.endtime) {
      newErrors.endtime = "End Date is required";
      valid = false;
    }

  
    if (tender.bufferTime && isNaN(tender.bufferTime)) {
      newErrors.bufferTime = "Buffer Time must be a number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <form onSubmit={handleSubmit} className="tenderForm">
      <h3>Create Tender</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <label>
                <h4>Tender Name</h4>
              </label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                placeholder="Tender Name"
                value={tender.name}
                onChange={handleChange}
                className="tenderInput"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <h4>Tender Description</h4>
              </label>
            </td>
            <td>
              <textarea
                name="description"
                placeholder="Tender Description"
                value={tender.description}
                onChange={handleChange}
                className="tenderTextarea"
              ></textarea>
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <h4>Start Time</h4>
              </label>
            </td>
            <td>
              <input
                type="datetime-local"
                name="starttime"
                value={tender.starttime}
                onChange={handleChange}
                className="tenderInput"
              />
              {errors.starttime && (
                <span className="error">{errors.starttime}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <h4>End Time</h4>
              </label>
            </td>
            <td>
              <input
                type="datetime-local"
                name="endtime"
                value={tender.endtime}
                onChange={handleChange}
                className="tenderInput"
              />
              {errors.endtime && (
                <span className="error">{errors.endtime}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <h4>Buffer Time</h4>
              </label>
            </td>
            <td>
              <input
                type="text"
                name="bufferTime"
                placeholder="Buffer Time (days)"
                value={tender.bufferTime}
                onChange={handleChange}
                className="tenderInput"
              />
              {errors.bufferTime && (
                <span className="error">{errors.bufferTime}</span>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <button type="submit" className="tenderButton">
                Create
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default TenderForm;
