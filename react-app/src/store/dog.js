const LOAD_DOGS = "dog/LOAD_DOGS";
const CLEAR_CURRENT_DOG = "dog/CLEAR_CURRENT_DOG";
const SET_CURRENT_DOG = "dog/SET_CURRENT_DOG";
const DELETE_DOG = "watchlist/DELETE_DOG";

// Actions
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

const deleteDog = (id) => ({
    type: DELETE_DOG,
    payload: id,
});


// Thunks
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

export const deleteOneDog = (id) => async (dispatch) => {
    const response = await fetch(`/api/dogs/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteDog(id));
    }
};

// Reducer
const initialState = { dogs: [], currentDog: null };

export default function dogRuducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_DOGS:
            newState = { ...state, dogs: action.payload };
            return newState;
        case CLEAR_CURRENT_DOG:
            newState = { ...state, currentDog: null };
            return newState;
        case SET_CURRENT_DOG:
            newState = { ...state, currentDog: action.payload };
            return newState;
        case DELETE_DOG:
            const dog_to_delete = state.dogs.find(
                (dog) => dog.id === +action.payload
            );
            let new_dogs = state.dogs.filter((d) => d !== dog_to_delete);
            newState = { ...state, dogs: new_dogs };
            return newState;
        default:
            return state;
    }
}
