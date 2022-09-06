import React from "react";
import "./AllDogsPage.css";
import "../../index.css"
import AllDogs from "./AllDogs";
import Sidebar from "./Sidebar/Sidebar";




function AllDogsPage() {
    return (
        <div className='container'>
            <div className="content-container">
                <div >
                    <AllDogs />
                </div>
                <div className="sidebar-container">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default AllDogsPage;