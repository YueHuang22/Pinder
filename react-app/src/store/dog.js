const LOAD_DOGS = "dog/LOAD_DOGS";

// Actions
const loadAllDogs = (dogs) => ({
    type: LOAD_DOGS,
    payload: dogs,
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


// Reducer
const initialState = { dogs: [], };

export default function dogRuducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_DOGS:
            newState = { ...state, dogs: action.payload };
            return newState;
        default:
            return state;
    }
}
