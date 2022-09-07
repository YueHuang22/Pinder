import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDogs } from "../../store/dog";
import DogCard from "./DogCard";
import "./AllDogsPage.css";

const DogList = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dog.dogs);
  const myDogs = useSelector((state) => state.dog.myDogs.map((dog) => dog.id));
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
              return <DogCard dog={dog} hidden={myDogs.includes(dog.id)} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default DogList;
