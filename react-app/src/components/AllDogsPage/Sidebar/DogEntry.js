import React from "react";
import { useHistory } from "react-router-dom";
import DateEntry from "./DateEntry";

const DogEntry = ({ dog, playdates }) => {
  const history = useHistory();
  return (
    <div className="sidebar-dog">
      <img src={dog.imageUrl} alt={dog.name} />
      <a onClick={() => history.push(`/dogs/${dog.id}`)}>{dog.name}</a>
      {playdates && (
        <>
          {futureDates(playdates.future_dates)}
          {dateRequests(playdates.requests)}
        </>
      )}
    </div>
  );
};

const futureDates = (dates) => {
  return (
    <div>
      Future Playdates {dates.length > 0 && `(${dates.length})`}
      {dates.map((date) => (
        <DateEntry date={date} isRequest={false} />
      ))}
    </div>
  );
};

const dateRequests = (dates) => {
  return (
    <div>
      Playdate Requests {dates.length > 0 && `(${dates.length})`}
      {dates.map((date) => (
        <DateEntry date={date} isRequest={true} />
      ))}
    </div>
  );
};

export default DogEntry;
