import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlaydates } from "../../../store/playdate";
import { loadMyDogs } from "../../../store/dog";
import AddDogModal from "../AddDogModal/AddDogModal";
import DogEntry from "./DogEntry";
import "../AllDogsPage.css";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const dogs = useSelector((state) => state.dog.myDogs);
  const playdates = useSelector((state) => state.playdate.playdates);

  useEffect(() => {
    setIsLoaded(false);

    const intializePage = async () => {
      await dispatch(loadMyDogs());
      await dispatch(loadPlaydates());
      setIsLoaded(true);
    };

    intializePage();
  }, [dispatch]);

  return (
    <div class="sidebar-content">
      {dogs.map((dog) => (
        <DogEntry
          dog={dog}
          playdates={playdates.filter(
            (playdate) =>
              playdate.senderPetId === dog.id ||
              playdate.receiverPetId === dog.id
          )}
        />
      ))}

      <div className="alldogs-card-button">
        <AddDogModal />
      </div>
    </div>
  );
};

export default Sidebar;
