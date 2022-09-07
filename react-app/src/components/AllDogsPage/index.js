import React from "react";
import AllDogs from "./DogList";
import Sidebar from "./Sidebar/Sidebar";
import "./AllDogsPage.css";

function AllDogsPage() {
  return (
    <div className="alldogs-container">
      <div className="alldogs-content-container">
        <div className="alldogs-card-container">
          <AllDogs />
        </div>
        <div className="alldogs-sidebar-container">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default AllDogsPage;
