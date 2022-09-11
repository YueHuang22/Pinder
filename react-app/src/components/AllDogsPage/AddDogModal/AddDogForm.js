import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneDog } from "../../../store/dog";
import "./AddDogForm.css";

function AddDogForm() {
  const dispatch = useDispatch();
  let history = useHistory();

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState();
  const [weight, setWeight] = useState();
  const [breed, setBreed] = useState();
  const [gender, setGender] = useState("Female");
  const [fixed, setFixed] = useState(false);
  const [energy_level, setEnergyLevel] = useState("Low");
  const [description, setDescription] = useState();
  const [image_url, setImageUrl] = useState();

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    await dispatch(
      createOneDog({
        name,
        birthday,
        weight,
        breed,
        gender,
        fixed,
        energy_level,
        description,
        image_url,
      })
    )
      .then((dog) => history.push(`/dogs/${dog.id}`))
      .catch((errors) => {
        setErrors(errors);
      });
  };

  return (
    <div className="add-dog-form-container">
      <form className="add-dog-form" onSubmit={handleSubmit}>
        <div className="add-dog-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div className="add-dog-form-title">
          <label> Name *</label>
        </div>
        <input
          className="add-dog-form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength="15"
        ></input>

        <div className="add-dog-form-title">
          <label>Birthday *</label>
        </div>
        <input
          className="add-dog-form-input"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />

        <div className="add-dog-form-title">
          <label>Weight *</label>
        </div>
        <input
          className="add-dog-form-input"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <div className="add-dog-form-title">
          <label>Breed *</label>
        </div>
        <input
          className="add-dog-form-input"
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          maxLength="35"
        />

        <div className="add-dog-form-title">
          <label>Gender *</label>
        </div>
        <select
          className="add-dog-form-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>

        <div className="add-dog-form-title">
          <label>Spayed or Neutered * </label>
        </div>
        <select
          className="add-dog-form-input"
          value={fixed}
          onChange={(e) => setFixed(e.target.value)}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <div className="add-dog-form-title">
          <label>Energy Level *</label>
        </div>
        <select
          className="add-dog-form-input"
          value={energy_level}
          onChange={(e) => setEnergyLevel(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="add-dog-form-title">
          <label>Description</label>
        </div>
        <input
          className="add-dog-form-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="300"
        />

        <div className="add-dog-form-title">
          <label>Image *</label>
        </div>
        <input
          className="add-dog-form-input"
          type="text"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          maxLength="500"
        />

        <div className="add-dog-form-button-container">
          <button className="add-dog-form-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDogForm;
