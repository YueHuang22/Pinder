const LOAD_PLAYDATES = "playdate/LOAD_PLAYDATES";
const CREATE_PLAYDATE = "playdate/CREATE_PLAYDATE";
const EDIT_PLAYDATE = "playdate/EDIT_PLAYDATE";
const DELETE_PLAYDATE = "playdate/DELETE_PLAYDATE";

// Actions
const loadAllPlaydates = (playdates) => ({
    type: LOAD_PLAYDATES,
    payload: playdates,
});

const createPlaydate = (playdate) => ({
    type: CREATE_PLAYDATE,
    payload: playdate,
});

const editPlaydate = (id, playdate) => ({
    type: EDIT_PLAYDATE,
    payload: { id, playdate },
});

const deletePlaydate = (id) => ({
    type: DELETE_PLAYDATE,
    payload: id,
});

// Thunks
export const loadPlaydates = () => async (dispatch) => {
    const response = await fetch("/api/playdates");
    if (response.ok) {
        const playdates = await response.json();
        dispatch(loadAllPlaydates(playdates.playdates));
        return playdates;
    }
};

export const createOnePlaydate = (payload) => async (dispatch) => {
    const { name, birthday, weight, breed, gender, fixed, energy_level, description, image_url, } = payload;
    const response = await fetch("/api/playdates", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, birthday, weight, breed, gender, fixed, energy_level, description, image_url,
        }),
    });
    if (response.ok) {
        const playdate = await response.json();
        dispatch(createPlaydate(playdate));
        return playdate;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const editOnePlaydate = (id, payload) => async (dispatch) => {
    const response = await fetch(`/api/playdates/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const playdate = await response.json();
        dispatch(editPlaydate(id, playdate));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const deleteOnePlaydate = (id) => async (dispatch) => {
    const response = await fetch(`/api/playdates/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deletePlaydate(id));
    }
};

// Reducer
const initialState = { playdates: [], currentPlaydate: null };

export default function playdateRuducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_PLAYDATES:
            newState = { ...state, playdates: action.payload };
            return newState;
        case CREATE_PLAYDATE:
            let playdates = state.playdates;
            newState = { ...state, playdates: [...playdates, action.payload] };
            return newState;
        // case EDIT_PLAYDATE:
        //     newState = { ...state, currentPlaydate: action.payload };
        //     return newState;
        case EDIT_PLAYDATE:
            const playdate = state.playdates.find(playdate => playdate.id === +action.payload.id)
            let newPlaydates = state.playdates.filter(d => d !== playdate)
            newState = { playdates: newPlaydates, currentPlaydate: action.payload }
            return newState;
        case DELETE_PLAYDATE:
            const playdate_to_delete = state.playdates.find(
                (playdate) => playdate.id === +action.payload
            );
            let new_playdates = state.playdates.filter((d) => d !== playdate_to_delete);
            newState = { ...state, playdates: new_playdates };
            return newState;
        default:
            return state;
    }
}
