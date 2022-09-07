import React from "react";
import { useHistory } from "react-router-dom";
import DateEntry, {
  FutureDate,
  RequestReceived,
  RequestSent,
} from "./PlaydateEntry";

const DogEntry = ({ dog, playdates }) => {
  const history = useHistory();

  return (
    <div className="sidebar-dog">
      <div
        className="sidebar-dog-title"
        onClick={() => history.push(`/dogs/${dog.id}`)}
      >
        <div className="sidebar-dog-img">
          <img src={dog.imageUrl} alt={dog.name} />
        </div>
        <div>{dog.name}</div>
      </div>

      {playdates && (
        <>
          {futureDates(playdates.filter((pd) => pd.status === "Approved"))}
          {dateRequests(
            playdates.filter(
              (pd) => pd.status === "Pending" && pd.receiverPetId === dog.id
            )
          )}
          {dateSent(
            playdates.filter(
              (pd) => pd.status === "Pending" && pd.senderPetId === dog.id
            )
          )}
        </>
      )}
    </div>
  );
};

const futureDates = (dates) => {
  return (
    <div className="sidebar-date-entry-container">
      <div className="sidebar-title">
        Future Playdates {dates.length > 0 && `(${dates.length})`}
      </div>

      {dates.map((date) => (
        <FutureDate date={date} isRequest={false} />
      ))}
    </div>
  );
};

const dateRequests = (dates) => {
  return (
    <div className="sidebar-date-entry-container">
      <div className="sidebar-title">
        Pending Playdates {dates.length > 0 && `(${dates.length})`}
      </div>

      {dates.map((date) => (
        <RequestReceived date={date} isRequest={true} />
      ))}
    </div>
  );
};

const dateSent = (dates) => {
  return (
    <div className="sidebar-date-entry-container">
      <div className="sidebar-title">
        Requests Sent {dates.length > 0 && `(${dates.length})`}
      </div>

      {dates.map((date) => (
        <RequestSent date={date} isRequest={true} />
      ))}
    </div>
  );
};

export default DogEntry;
