import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Sidebar.css";
import { loadPlaydates } from "../../../store/playdate";
import { loadMyDogs } from "../../../store/dog";
import DateEntry from "./DateEntry";
import DogEntry from "./DogEntry";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const myDogs = useSelector((state) => state.dog.myDogs);
  const myPlaydates = useSelector((state) => state.playdate.playdates);

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
      {myDogs.map((dog) => (
        <DogEntry dog={dog} playdates={myPlaydates[dog.id]} />
      ))}
    </div>
  );
};

export default Sidebar;
