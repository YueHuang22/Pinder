import React from "react";
import { useHistory } from "react-router-dom";
import EditPlaydateModal from "../../Playdate/EditPlaydateModal";
import { approveOnePlaydate, deleteOnePlaydate } from "../../../store/playdate";
import { useDispatch } from "react-redux";

export const FutureDate = ({ date }) => {
  const history = useHistory();

  return (
    <div className="sidebar-date-entry">
      <div>
        <img
          className="sidebar-date-entry-img"
          src={date.playmate.imageUrl}
          alt={date.playmate.name}
        />
      </div>

      <div className="sidebar-date-entry-text">
        A date with{" "}
        <a onClick={() => history.push(`/dogs/${date.playmate.id}`)}>
          {date.playmate.name}
        </a>{" "}
        on {new Date(date.time).toLocaleDateString()}
      </div>
    </div>
  );
};

//-----------------------------------------------------------------------
export const RequestReceived = ({ date }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const playdateId = date.id;

  //onClicks
  const clickDeletePlaydate = async () => {
    await dispatch(deleteOnePlaydate(playdateId)).then(() =>
      history.push("/dogs")
    );
  };

  const clickAcceptPlaydate = async () => {
    await dispatch(approveOnePlaydate(playdateId)).then(() =>
      history.push("/dogs")
    );
  };

  return (
    <div className="sidebar-date-entry">
      <div>
        <img
          className="sidebar-date-entry-img"
          src={date.playmate.imageUrl}
          alt={date.playmate.name}
        />
      </div>

      <div className="sidebar-date-entry-text">
        <div>
          <a onClick={() => history.push(`/dogs/${date.playmate.id}`)}>
            {date.playmate.name}
          </a>{" "}
          wants to play with you on {new Date(date.time).toLocaleDateString()}
        </div>
        <div>
          <button
            className="sidebar-date-entry-button"
            onClick={clickAcceptPlaydate}
          >
            <i class="fa-sharp fa-solid fa-check" />
          </button>
          <button
            className="sidebar-date-entry-button"
            onClick={clickDeletePlaydate}
          >
            <i class="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
    </div>
  );
};

//-----------------------------------------------------------------------
export const RequestSent = ({ date }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const playdateId = date.id;

  //onClicks
  const clickDeletePlaydate = async () => {
    await dispatch(deleteOnePlaydate(playdateId)).then(() =>
      history.push("/dogs")
    );
  };

  return (
    <div className="sidebar-date-entry">
      <div>
        <img
          className="sidebar-date-entry-img"
          src={date.playmate.imageUrl}
          alt={date.playmate.name}
        />
      </div>
      <div className="sidebar-date-entry-text">
        <div>
          Waiting for{" "}
          <a onClick={() => history.push(`/dogs/${date.playmate.id}`)}>
            {date.playmate.name}
          </a>{" "}
          to accept playdate request on{" "}
          {new Date(date.time).toLocaleDateString()}
          <div>
            <EditPlaydateModal date={date} />
            <button
              className="sidebar-date-entry-button"
              onClick={clickDeletePlaydate}
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
