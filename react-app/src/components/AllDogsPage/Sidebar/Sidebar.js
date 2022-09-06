import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Sidebar.css";
import { loadPlaydates } from "../../../store/playdate";
import { loadMyDogs } from "../../../store/dog";
import DateEntry from "./DateEntry";


const Sidebar = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const myDogs = useSelector(state => state.dog.myDogs);
    const myPlaydates = useSelector(state => state.playdate.playdates)

    useEffect(() => {

        setIsLoaded(false)

        const intializePage = async () => {
            await dispatch(loadMyDogs())
            await dispatch(loadPlaydates());
            setIsLoaded(true);
        };

        intializePage();

    }, [dispatch]);


    return (
        <div class='sidebar-content'>
            {myDogs.map(dog => (
                <div className="sidebar-dog">
                    <img src={dog.imageUrl} alt={dog.name} />
                    {dog.name}
                    {myPlaydates[dog.id] && (
                        <>
                            {futureDates(myPlaydates[dog.id]["future_dates"])}
                            {dateRequests(myPlaydates[dog.id]["requests"])}
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}


const futureDates = (dates) => {
    return (<div>
        Future Playdates {dates.length > 0 && `(${dates.length})`}
        {
            dates.map(date => <DateEntry date={date} isRequest={false} />)
        }
    </div>)
}

const dateRequests = (dates) => {
    return (<div>
        Playdate Requests {dates.length > 0 && `(${dates.length})`}
        {
            dates.map(date => <DateEntry date={date} isRequest={true} />)
        }
    </div>)
}

export default Sidebar