const LOAD_DOGS = "dog/LOAD_DOGS";
const CLEAR_CURRENT_DOG = "dog/CLEAR_CURRENT_DOG";
const SET_CURRENT_DOG = "dog/SET_CURRENT_DOG";
const CREATE_DOG = "dog/CREATE_DOG";
const EDIT_DOG = "dog/EDIT_DOG";
const DELETE_DOG = "dog/DELETE_DOG";
const LOAD_MY_DOGS = "dog/LOAD_MY_DOGS";

// Actions
const loadAllMyDogs = (dogs) => ({
  type: LOAD_MY_DOGS,
  payload: dogs,
});

const loadAllDogs = (dogs) => ({
  type: LOAD_DOGS,
  payload: dogs,
});

const unsetCurrentDog = () => ({
  type: CLEAR_CURRENT_DOG,
  payload: null,
});

const setCurrentDog = (dog) => ({
  type: SET_CURRENT_DOG,
  payload: dog,
});

const createDog = (dog) => ({
  type: CREATE_DOG,
  payload: dog,
});

const editDog = (id, dog) => ({
  type: EDIT_DOG,
  payload: { id, dog },
});

const deleteDog = (id) => ({
  type: DELETE_DOG,
  payload: id,
});

// Thunks
export const loadMyDogs = () => async (dispatch) => {
  const response = await fetch("/api/dogs/my");
  if (response.ok) {
    const dogs = await response.json();
    dispatch(loadAllMyDogs(dogs.dogs));
    return dogs;
  }
};

export const loadDogs = () => async (dispatch) => {
  const response = await fetch("/api/dogs");
  if (response.ok) {
    const dogs = await response.json();
    dispatch(loadAllDogs(dogs.dogs));
    return dogs;
  }
};

export const clearCurrentDog = () => (dispatch) => {
  dispatch(unsetCurrentDog());
};

export const getDog = (id) => async (dispatch) => {
  dispatch(unsetCurrentDog());

  const response = await fetch(`/api/dogs/${id}`);

  if (response.ok) {
    const dog = await response.json();
    dispatch(setCurrentDog(dog));
    return dog;
  } else return;
};

export const createOneDog = (payload) => async (dispatch) => {
  const {
    name,
    birthday,
    weight,
    breed,
    gender,
    fixed,
    energy_level,
    description,
    image_url,
  } = payload;
  const response = await fetch("/api/dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      birthday,
      weight,
      breed,
      gender,
      fixed,
      energy_level,
      description,
      image_url,
    }),
  });
  if (response.ok) {
    const dog = await response.json();
    dispatch(createDog(dog));
    return dog;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      throw data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const editOneDog = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/dogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const dog = await response.json();
    dispatch(editDog(id, dog));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      throw data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteOneDog = (id) => async (dispatch) => {
  const response = await fetch(`/api/dogs/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteDog(id));
  }
};

// Reducer
const initialState = { dogs: [], myDogs: [] };

export default function dogRuducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_MY_DOGS:
      newState = { ...state, myDogs: action.payload };
      return newState;
    case LOAD_DOGS:
      newState = { ...state, dogs: action.payload };
      return newState;
    case CLEAR_CURRENT_DOG:
      newState = { ...state, currentDog: null };
      return newState;
    case SET_CURRENT_DOG:
      newState = { ...state, currentDog: action.payload };
      return newState;
    case CREATE_DOG:
      newState = {
        ...state,
        dogs: [...state.dogs, action.payload],
        myDogs: [...state.myDogs, action.payload],
      };
      return newState;
    case EDIT_DOG:
      const newMyDogs = state.myDogs.filter(
        (dog) => dog.id !== action.payload.dog.id
      );
      newMyDogs.push(action.payload.dog);
      newMyDogs.sort((a, b) => (a.id < b.id ? -1 : 1));
      const newDogs = state.dogs.filter(
        (dog) => dog.id !== action.payload.dog.id
      );
      newDogs.push(action.payload.dog);
      newDogs.sort((a, b) => (a.id < b.id ? -1 : 1));
      newState = { ...state, dogs: newDogs, myDogs: newMyDogs };
      return newState;
    case DELETE_DOG:
      const new_dogs = state.dogs.filter((d) => d.id !== +action.payload);
      const new_myDogs = state.myDogs.filter((d) => d.id !== +action.payload);
      newState = { ...state, dogs: new_dogs, myDogs: new_myDogs };
      return newState;
    default:
      return state;
  }
}
