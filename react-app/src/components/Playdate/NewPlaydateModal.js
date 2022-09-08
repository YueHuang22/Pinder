import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { createOnePlaydate } from "../../store/playdate";
import "./NewPlaydate.css";

const NewPlaydateModal = ({ receiverPetId }) => {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [detail, setDetail] = useState("");
  const [time, setTime] = useState("");
  const [senderPetId, setSenderPetId] = useState("");

  const myDogs = useSelector((state) => state.dog.myDogs);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      createOnePlaydate({
        location,
        time,
        detail,
        senderPetId,
        receiverPetId,
      })
    );
    if (data) {
      setErrors(data);
    } else {
      setShowModal(false);
      history.push("/dogs");
    }
  };

  return (
    <>
      <button className="send-request" onClick={() => setShowModal(true)}>
        Schedule a Playdate
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="request-form-container">
            <form className="request-form" onSubmit={onSubmit}>
              <div className="request-errors">
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>

              <div className="request-form-title">
                <label>Location *</label>
              </div>
              <input
                className="request-form-input"
                name="location"
                type="text"
                placeholder="Location"
                maxLength="300"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div className="request-form-title">
                <label>
                  Time * (Please use format: 10/22/2022, 2:30:00 PM)
                </label>
              </div>
              <input
                className="request-form-input"
                name="time"
                type="text"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <div className="request-form-title">
                <label>Detail *</label>
              </div>
              <input
                className="request-form-input"
                name="detail"
                type="text"
                placeholder="Details"
                maxLength="300"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />

              <div className="request-form-title">
                <label>Sender *</label>
              </div>
              <select
                className="request-form-input"
                name="sender_pet_id"
                value={senderPetId}
                onChange={(e) => setSenderPetId(e.target.value)}
              >
                <option value=""></option>
                {myDogs.map((myDog) => (
                  <option value={myDog.id}>{myDog.name}</option>
                ))}
              </select>

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

export default NewPlaydateModal;
