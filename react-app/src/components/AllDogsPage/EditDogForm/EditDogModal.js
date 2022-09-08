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

  useEffect(() => {
    setShowModal(location.pathname === `/dogs/${dogId}/edit`);
  }, [location.pathname]);

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
            history.push(`/dogs/${dogId}`);
            setShowModal(false);
          }}
        >
          <EditDogForm />
        </Modal>
      )}
    </>
  );
};

export default EditDogModal;
