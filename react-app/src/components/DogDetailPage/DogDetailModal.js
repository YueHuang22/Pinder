import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";

const DogDetailModal = ({ dog, onClose }) => {
  const myDogs = useSelector((state) => state.dog.myDogs);
  const isMyDog = myDogs.some((myDog) => myDog.id === dog.id);

  return (
    <Modal onClose={onClose}>
      <div className="dog-detail-modeal-container">
        <div>
          <img style={{ height: 500 }} alt="dog" src={dog.imageUrl}></img>
        </div>
        <div className="dog-detail-modeal-details">
          <div>
            <h1>
              {dog.name} {getGenderSign(dog.gender)}
            </h1>
            <div>Owner: {dog.owner.firstName}</div>
            <div>Gender: {dog.gender} </div>
            <div>Birthday: {new Date(dog.birthday).toLocaleDateString()}</div>
            <div>{dog.breed}</div>
            <div>{dog.energyLevel}</div>
            <div>fixed:{dog.fixed}</div>
            <div>{dog.breed}</div>
            <div></div>
            <div>Weight: {dog.weight} lbs</div>
            <div>{dog.description}</div>
          </div>
          <div>send request</div>
        </div>
      </div>
    </Modal>
  );
};

const getGenderSign = (gender) => {
  if (gender === "Male") {
    return <i style={{ color: "cornflowerblue" }} class="fa-solid fa-mars" />;
  } else if (gender === "Female") {
    return <i style={{ color: "hotpink" }} class="fa-solid fa-venus" />;
  }
};

export default DogDetailModal;
