import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";
import "./SignUpModal.css";

const SignUpModal = () => {
  const history = useHistory();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(location.pathname === "/sign-up");
  }, [location.pathname]);

  return (
    <>
      <button
        className="signup-button"
        onClick={() => {
          history.push("/sign-up");
          setShowModal(true);
        }}
      >
        Sign up
      </button>

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            history.push("/");
          }}
        >
          <SignUpForm />
        </Modal>
      )}
    </>
  );
};

export default SignUpModal;
