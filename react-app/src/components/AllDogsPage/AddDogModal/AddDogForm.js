import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneDog } from "../../../store/dog";
import './AddDogForm.css';

function AddDogForm() {
    const dispatch = useDispatch();
    let history = useHistory();

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState();
    const [weight, setWeight] = useState();
    const [breed, setBreed] = useState();
    const [gender, setGender] = useState("Female");
    const [fixed, setFixed] = useState("Spayed/Neutered");
    const [energy_level, setEnergyLevel] = useState("Low");
    const [description, setDescription] = useState();
    const [image_url, setImageUrl] = useState();

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // const data = await dispatch(createOneDog({ name, birthday, weight, breed, gender, fixed, energy_level, description, image_url, }))
        await dispatch(createOneDog({ name, birthday, weight, breed, gender, fixed, energy_level, description, image_url, }))
            .then((dog) => history.push(`/dogs/${dog.id}`))
        // if (data) {
        //     setErrors(data)
        // }
    };

    return (
        <div className="signup-form-page">
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-form-title">ADDING YOUR PET</div>
                <div className="signup-errors">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>

                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Name:
                        <input
                            className="form-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxlength="35"
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Birthday:
                        <input
                            className="form-input"
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Weight:
                        <input
                            className="form-input"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Breed:
                        <input
                            className="form-input"
                            type="text"
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                            maxlength="50"
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Gender:
                        <select className="form-input" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="Female" >Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Spayed or Neutered:
                        <select className="form-input" value={fixed} onChange={(e) => setFixed(e.target.value)}>
                            <option value='Spayed/Neutered' >Spayed/Neutered</option>
                            <option value="Not fixed">Not fixed</option>
                        </select>
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Energy Level:
                        <select className="form-input" value={energy_level} onChange={(e) => setEnergyLevel(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Description:
                        <input
                            className="form-input"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxlength="300"
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Image:
                        <input
                            className="form-input"
                            type="text"
                            value={image_url}
                            onChange={(e) => setImageUrl(e.target.value)}
                            maxlength="500"
                            required
                        />
                    </label>
                </div>

                <div>
                    <button className="signup-submitbutton" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddDogForm;