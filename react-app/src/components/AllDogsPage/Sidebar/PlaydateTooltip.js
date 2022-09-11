import React from "react";
import "./Sidebar.css";

const PlaydateTooltip = ({ playdate, children }) => {
  return (
    <div class="playdate-tooltip">
      {children}
      <div class="playdate-tooltip-content">
        <div className="tooltip-title">Time</div>
        <div className="tooltip-wrap">
          {new Date(playdate.time).toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        <div className="tooltip-title">Location</div>
        <div className="tooltip-wrap">{playdate.location}</div>

        <div className="tooltip-title">Detail</div>
        <div className="tooltip-wrap">{playdate.detail}</div>
      </div>
    </div>
  );
};

export default PlaydateTooltip;
