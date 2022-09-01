import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadDogs, } from "../../store/dog";
import "./AllDogsPage.css";

function AllDogsPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const dogs = useSelector(state => state.dog.dogs);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadDogs());
    }, [dispatch]);

    return (
        <>

            <div className="alldog-container">

                <div className="alldog-title">Our dogs</div>
                <button className="alldog-button">
                    add a dog
                </button>
                <div className="alldog-dogcard">
                    <div className="alldog-cardimage">

                        <img
                            className="alldog-dogimage"
                            alt="⚡"
                            src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                        ></img>
                    </div>
                    <div className="alldog-cardtext">
                        <div>
                            Owner: Yue
                        </div>
                        <div>
                            Name: Ollie
                        </div>
                        <div>
                            Gender: Male
                        </div>
                        <div>
                            Weight: 25 lbs
                        </div>
                    </div>
                </div>


                <div>
                    {dogs.map((dog) => {
                        return (
                            <>
                                <div className="alldog-dogcard">
                                    <div className="alldog-cardimage">

                                        <img
                                            className="alldog-dogimage"
                                            alt="⚡"
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
                                        <div>
                                            Weight: {dog.weight} lbs
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="card" onClick={() => history.push(`/dogs/${dog.id}`)}>
                                    <div className="cardimg">
                                        <img alt="" src={dog.imageUrl}></img>
                                    </div>

                                    <div className="card-content">

                                        <div className="title" key={dog.name} to={`/dogs/${dog.id}`}>{dog.name}
                                        </div>

                                        <div className="address" >
                                            {dog.birthday}, {dog.weight}
                                        </div>
                                        <div className="card-text">{dog.descrption}</div>
                                    </div>
                                </div> */}
                            </>
                        );
                    })}
                </div>
            </div>

        </>
    );
}

export default AllDogsPage;
