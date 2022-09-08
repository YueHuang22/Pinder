import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getDog,
  editOneDog,
  loadDogs,
  clearCurrentDog,
} from "../../../store/dog";
import "./EditDogForm.css";

function EditDogForm({ onSubmit = () => {} }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { dogId } = useParams();

  const dog = useSelector((state) =>
    state.dog.myDogs.find((d) => d.id === +dogId)
  );

  const [name, setName] = useState(dog.name);
  const [birthday, setBirthday] = useState(formatDate(new Date(dog.birthday)));
  const [weight, setWeight] = useState(dog.weight);
  const [breed, setBreed] = useState(dog.breed);
  const [gender, setGender] = useState(dog.gender);
  const [fixed, setFixed] = useState(dog.fixed.toString());
  const [energy_level, setEnergyLevel] = useState(dog.energyLevel);
  const [description, setDescription] = useState(dog.description);
  const [image_url, setImageUrl] = useState(dog.imageUrl);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    await dispatch(
      editOneDog(dogId, {
        name,
        birthday,
        weight: +weight,
        breed,
        gender,
        fixed: fixed === "true" ? true : false,
        energy_level,
        description,
        image_url,
      })
    )
      .then(() => onSubmit())
      .catch((errors) => {
        setErrors(errors);
      });
  };

  return (
    <>
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
            maxLength="35"
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
            maxLength="50"
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
            <label>Spayed or Neutered *</label>
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
    </>
  );
}

const formatDate = (date) =>
  date.toLocaleDateString("en-CA", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
export default EditDogForm;
