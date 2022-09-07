import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Modal } from "../../context/Modal";
import DogDetailModal from "../DogDetailPage/DogDetailModal";
import DogDetailPage from "../DogDetailPage/DogDetailPage";
import "./AllDogsPage.css";

const DogCard = ({ dog }) => {
  const history = useHistory();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(
      history.location.pathname.split("/").at(-1) === dog.id.toString()
    );
  }, [location.pathname]);

  return (
    <>
      <div
        className="alldog-dogcard"
        onClick={() => {
          history.push(`/dogs/${dog.id}`);
          setShowModal(true);
        }}
      >
        <div className="alldog-cardimage-div">
          <img className="alldog-dogimage" alt="dog" src={dog.imageUrl}></img>
        </div>

        <div className="alldog-cardtext">
          <div className="alldog-cardtext-name">{dog.name}</div>
          <div className="alldog-cardtext-other">
            I weight: {dog.weight} lbs
          </div>
          <div className="alldog-cardtext-other">
            My energy level: {dog.energyLevel}
          </div>
        </div>
      </div>

      {showModal && (
        <DogDetailModal
          dog={dog}
          onClose={() => {
            setShowModal(false);
            history.push("/dogs");
          }}
        />
      )}
    </>
  );
};

export default DogCard;
