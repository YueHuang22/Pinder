import React from "react";
import { useHistory } from "react-router-dom";
import EditPlaydateModal from "../../Playdate/EditPlaydateModal";
import { approveOnePlaydate, deleteOnePlaydate } from "../../../store/playdate";
import { useDispatch } from "react-redux";
import PlaydateTooltip from "./PlaydateTooltip";

export const FutureDate = ({ date }) => {
  const history = useHistory();

  return (
    <div className="sidebar-date-entry">
      <div>
        <img
          className="sidebar-date-entry-img"
          onError={({ target }) => {
            target.onError = null;
            target.src =
              "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg";
          }}
          src={date.playmate.imageUrl}
        />
      </div>
      <PlaydateTooltip playdate={date}>
        <div className="sidebar-date-entry-text">
          A date with{" "}
          <a
            className="sidebar-date-entry-link"
            onClick={() => history.push(`/dogs/${date.playmate.id}`)}
          >
            {date.playmate.name}
          </a>{" "}
          on {new Date(date.time).toLocaleDateString()}
        </div>
      </PlaydateTooltip>
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
          onError={({ target }) => {
            target.onError = null;
            target.src =
              "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg";
          }}
          src={date.playmate.imageUrl}
        />
      </div>

      <div className="sidebar-date-entry-text">
        <PlaydateTooltip playdate={date}>
          <div>
            <a
              className="sidebar-date-entry-link"
              onClick={() => history.push(`/dogs/${date.playmate.id}`)}
            >
              {date.playmate.name}
            </a>{" "}
            wants to play with you on {new Date(date.time).toLocaleDateString()}
          </div>
        </PlaydateTooltip>
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
          onError={({ target }) => {
            target.onError = null;
            target.src =
              "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg";
          }}
          src={date.playmate.imageUrl}
        />
      </div>
      <div className="sidebar-date-entry-text">
        <PlaydateTooltip playdate={date}>
          <div>
            Waiting for{" "}
            <a
              className="sidebar-date-entry-link"
              onClick={() => history.push(`/dogs/${date.playmate.id}`)}
            >
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
        </PlaydateTooltip>
      </div>
    </div>
  );
};
