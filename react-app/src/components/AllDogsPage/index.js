import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadDogs } from "../../store/dog";
import "./AllDogsPage.css";

function AllDogsPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const dogs = useSelector(state => state.dog.dogs);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        setIsLoaded(false)

        const intializePage = async () => {
            await dispatch(loadDogs());
            setIsLoaded(true);
        };

        intializePage();

    }, [dispatch]);

    return (
        <>
            {isLoaded && (
                <div className="alldogs-container">
                    <div className="alldogs-title">OUR DOGS</div>
                    <div className="alldogs-card-div">
                        {dogs.map((dog) => {
                            return (
                                <div className="alldog-dogcard" onClick={() => history.push(`/dogs/${dog.id}`)}>
                                    <div className="alldog-cardimage">
                                        <img
                                            className="alldog-dogimage"
                                            alt="dog"
                                            src={dog.imageUrl}
                                        ></img>
                                    </div>

                                    <div className="alldog-cardtext">
                                        <div>
                                            Owner: {dog.owner.firstName}
                                        </div>
                                        <div>
                                            Name: {dog.name}
                                        </div>
                                        <div>
                                            Gender: {dog.gender}
                                        </div>
                                        <div>{dog.birthday}</div>
                                        <div>{dog.breed}</div>
                                        <div>{dog.description}</div>
                                        <div>{dog.energyLevel}</div>
                                        <div>fixed:{dog.fixed}</div>
                                        <div>{dog.breed}</div>
                                        <div></div>
                                        <div>
                                            Weight: {dog.weight} lbs
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="alldogs-card-button">
                        <button className="alldogs-button" onClick={() => history.push('/dogs/new')}>
                            ADD YOUR DOG
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AllDogsPage;