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
        <div className="dog-detail-img-div">
          <img className="dog-detail-img" alt="dog" src={dog.imageUrl}></img>
        </div>

        <div className="dog-detail-modal-details">
          <div className="dog-detail-text">
            <h1>
              {dog.name} {getGenderSign(dog.gender)}
            </h1>
            <div className="dog-detail-owner">Owner: {dog.owner.firstName}</div>
            <div className="dog-detail-other">
              Birthday: {new Date(dog.birthday).toLocaleDateString()}
            </div>
            <div className="dog-detail-other">Breed: {dog.breed}</div>
            <div className="dog-detail-other">
              Energy level: {dog.energyLevel}
            </div>
            <div className="dog-detail-other">Weight: {dog.weight} lbs</div>
            <div className="dog-detail-other">
              Neutered/Spayed: {dog.fixed ? "Yes" : "No"}
            </div>
            {dog.description && (
              <div className="dog-detail-other">
                About {dog.name}: {dog.description}
              </div>
            )}
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
            <div className="detail-button-holder">
              <NewPlaydateModal receiverPetId={dog.id} />
            </div>
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
