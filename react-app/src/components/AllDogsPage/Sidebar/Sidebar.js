import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
import { loadPlaydates } from "../../../store/playdate";
import { loadMyDogs } from "../../../store/dog";
import DogEntry from "./DogEntry";

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
    </div>
  );
};

export default Sidebar;
