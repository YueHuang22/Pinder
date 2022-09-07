import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { deleteOneDog } from "../../store/dog";
import NewPlaydateModal from "../Playdate/NewPlaydateModal";
import EditDogModal from "../AllDogsPage/EditDogForm/EditDogModal";
import "./DogDetailPage.css";

const DogDetailModal = ({ dog, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { dogId } = useParams();
  const myDogs = useSelector((state) => state.dog.myDogs);
  const isMyDog = myDogs.some((myDog) => myDog.id === dog.id);

  //onClicks
  const deleteClick = async () => {
    await dispatch(deleteOneDog(dogId)).then(() => history.push("/dogs"));
  };

  return (
    <Modal onClose={onClose}>
      <div className="dog-detail-modal-container">
        <div>
          <img style={{ height: 500 }} alt="dog" src={dog.imageUrl}></img>
        </div>

        <div className="dog-detail-modal-details">
          <div>
            <h1>
              {dog.name} {getGenderSign(dog.gender)}
            </h1>
            <div>Owner: {dog.owner.firstName}</div>
            <div>Birthday: {new Date(dog.birthday).toLocaleDateString()}</div>
            <div>Breed: {dog.breed}</div>
            <div>Energy level: {dog.energyLevel}</div>
            <div>Fixed: {dog.fixed}</div>
            <div></div>
            <div>Weight: {dog.weight} lbs</div>
            <div>{dog.description}</div>
          </div>

          {isMyDog ? (
            <>
              <div className="detail-button-holder">
                <div>
                  <EditDogModal />
                </div>
                <button className="detail-delete-button" onClick={deleteClick}>
                  Delete
                </button>
              </div>
            </>
          ) : (
            <NewPlaydateModal receiverPetId={dog.id} />
          )}
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
