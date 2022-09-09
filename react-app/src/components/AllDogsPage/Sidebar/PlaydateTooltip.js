import React from "react";
import "./Sidebar.css";

const PlaydateTooltip = ({ playdate, children }) => {
  return (
    <div class="playdate-tooltip">
      {children}
      <span class="playdate-tooltip-content">
        <div>Time</div>
        <span>{playdate.time}</span>
        <div>Location</div>
        <span>{playdate.location}</span>
        <div>Detail</div>
        <span>{playdate.detail}</span>
      </span>
    </div>
  );
};

export default PlaydateTooltip;
