
import React, { useState, useHistory } from "react";

const AddDogModal = () => {

    const history = useHistory()

    return (
        <div className="alldogs-card-button">
            <button className="alldogs-button" onClick={() => history.push('/dogs/new')}>
                ADD YOUR DOG
            </button>
        </div>
    )
}

export default AddDogModal