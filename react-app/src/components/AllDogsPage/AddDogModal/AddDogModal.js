import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import AddDogForm from "./AddDogForm";
import "./AddDogForm.css";

const AddDogModal = () => {
  const history = useHistory();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(location.pathname === "/dogs/new");
  }, [location.pathname]);

  return (
    <>
      <button
        className="add-dog-button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        ADD YOUR DOG
      </button>

      {showModal && (
        <Modal
          onClose={() => {
            history.push("/dogs");
            setShowModal(false);
          }}
        >
          <AddDogForm />
        </Modal>
      )}
    </>
  );
};

export default AddDogModal;
