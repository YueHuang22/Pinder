import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DogDetailModal from "../DogDetailPage/DogDetailModal";
import "./AllDogsPage.css";

const DogCard = ({ dog, hidden = false }) => {
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
      {!hidden && (
        <div
          className="alldog-dogcard"
          onClick={() => {
            history.push(`/dogs/${dog.id}`);
            setShowModal(true);
          }}
        >
          <div className="alldog-cardimage-div">
            <img
              className="alldog-dogimage"
              onError={({ target }) => {
                target.onError = null;
                target.src =
                  "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg";
              }}
              src={dog.imageUrl}
            ></img>
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
      )}

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
