import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDog, loadDogs, clearCurrentDog, deleteOneDog } from '../../store/dog';
import "./DogDetailPage.css";

function DogDetailPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { dogId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    //const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        setIsLoaded(false)

        const intializeDetailPage = async () => {
            const data = await dispatch(getDog(dogId));
            if (!data) {
                history.push('/404');
            } else {
                await dispatch(loadDogs());
                setIsLoaded(true);
            }
        };

        intializeDetailPage();

        return () => {
            dispatch(clearCurrentDog());
        };
    }, [dispatch, history, dogId]);


    const dog = useSelector((state) => {
        const currentDog = state.dog.currentDog;

        return String(currentDog?.id) === dogId
            ? currentDog : null
    });

    //onClicks
    const deleteClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneDog(dogId)).then(
            () => history.push('/dogs')
        );
    };

    return (
        <>
            {isLoaded && (
                <>
                    <div className='detail-container'>
                        <div>
                            <div className="alldog-cardimage">
                                <img
                                    className="detail-dogimage"
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
                        <button className='detail-button' onClick={() => history.push(`/dogs/${dog.id}/edit`)}>Edit</button>
                        {/* Use EditDogModal, pass in `dog` props */}
                        <button className='detail-button' onClick={deleteClick}>Delete</button>
                    </div>
                </>
            )}
        </>
    );
}

export default DogDetailPage;