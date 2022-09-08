import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import EditDogForm from "./EditDogForm";
import "./EditDogForm.css";

const EditDogModal = () => {
  const history = useHistory();
  const location = useLocation();
  const { dogId } = useParams();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="detail-edit-button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Edit
      </button>

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
        >
          <EditDogForm onSubmit={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default EditDogModal;
