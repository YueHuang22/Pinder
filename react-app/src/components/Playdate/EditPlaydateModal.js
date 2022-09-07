import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { editOnePlaydate } from "../../store/playdate";
import "./NewPlaydate.css";

const EditPlaydateModal = ({ date }) => {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const [location, setLocation] = useState(date.location);
  const [detail, setDetail] = useState(date.detail);
  const [time, setTime] = useState(new Date(date.time).toLocaleString());
  const playdateId = date.id;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      editOnePlaydate(playdateId, {
        location,
        time,
        detail,
      })
    );
    if (data) {
      setErrors(data);
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        className="sidebar-date-entry-button"
        onClick={() => setShowModal(true)}
      >
        <i class="fa-solid fa-pen" />
      </button>

      {showModal && (
        <Modal
          onClose={() => {
            setLocation(date.location);
            setDetail(date.detail);
            setTime(new Date(date.time).toLocaleString());
            setShowModal(false);
          }}
        >
          <div className="request-form-container">
            <form className="request-form" onSubmit={onSubmit}>
              <div className="request-errors">
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>

              <div className="request-form-title">
                <label>Location:</label>
              </div>
              <input
                className="request-form-input"
                name="location"
                type="text"
                placeholder="Location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div className="request-form-title">
                <label>Time:</label>
              </div>
              <input
                className="request-form-input"
                name="time"
                type="text"
                placeholder="Time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <div className="request-form-title">
                <label>Details:</label>
              </div>
              <input
                className="request-form-input"
                name="detail"
                type="text"
                placeholder="Details"
                required
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />

              <div className="request-form-button-container">
                <button className="request-form-button" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditPlaydateModal;
