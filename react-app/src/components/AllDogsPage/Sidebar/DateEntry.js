import React from "react";
import { useHistory } from "react-router-dom";

const DateEntry = ({ date, isRequest = false }) => {
  return (
    <div className="sidebar-date-entry">
      <img src={date.playmate.imageUrl} alt={date.playmate.name} />
      {isRequest ? <DateRequest date={date} /> : <FutureDate date={date} />}
    </div>
  );
};

const FutureDate = ({ date }) => {
  const history = useHistory();
  return (
    <div>
      <a onClick={() => history.push(`/dogs/${date.playmate.id}`)}>
        {date.playmate.name}
      </a>{" "}
      wants to play with you on {new Date(date.time).toLocaleDateString()}
      <div>
        <button>
          <i class="fa-solid fa-pen" />
        </button>
      </div>
    </div>
  );
};

const DateRequest = ({ date }) => {
  const history = useHistory();
  return (
    <div>
      A date with{" "}
      <a onClick={() => history.push(`/dogs/${date.playmate.id}`)}>
        {date.playmate.name}
      </a>{" "}
      on {new Date(date.time).toLocaleDateString()}
      <div>
        <button>
          <i class="fa-sharp fa-solid fa-check" />
        </button>
        <button>
          <i class="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  );
};

export default DateEntry;
