import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadDogs } from "../../store/dog";
import "./AllDogsPage.css";
import "../../index.css";
import DogCard from "./DogCard";

const DogList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dogs = useSelector((state) => state.dog.dogs);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);

    const intializePage = async () => {
      await dispatch(loadDogs());
      setIsLoaded(true);
    };

    intializePage();
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <div className="alldogs-title">FRIENDS TO MEET</div>
          <div className="alldogs-card-div">
            {dogs.map((dog) => {
              return <DogCard dog={dog} />;
            })}
          </div>

          <div className="alldogs-card-button">
            <button
              className="alldogs-button"
              onClick={() => history.push("/dogs/new")}
            >
              ADD YOUR DOG
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DogList;
