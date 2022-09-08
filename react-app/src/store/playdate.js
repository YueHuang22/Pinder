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

const editPlaydate = (playdate) => ({
  type: EDIT_PLAYDATE,
  payload: playdate,
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
  const { location, time, detail, senderPetId, receiverPetId } = payload;
  const response = await fetch("/api/playdates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location,
      time,
      detail,
      sender_pet_id: senderPetId,
      receiver_pet_id: receiverPetId,
    }),
  });
  if (response.ok) {
    const playdate = await response.json();
    dispatch(createPlaydate(playdate));
    return;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
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
    dispatch(editPlaydate(playdate));
    return;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const approveOnePlaydate = (id) => async (dispatch) => {
  const response = await fetch(`/api/playdates/${id}/approve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (response.ok) {
    const playdate = await response.json();
    dispatch(editPlaydate(playdate));
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
const initialState = { playdates: [] };

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
    case EDIT_PLAYDATE:
      const newPlaydates = state.playdates.filter(
        (d) => d.id !== action.payload.id
      );
      newState = { playdates: [...newPlaydates, action.payload] };
      return newState;
    case DELETE_PLAYDATE:
      newState = {
        ...state,
        playdates: state.playdates.filter(
          (playdate) => playdate.id !== +action.payload
        ),
      };
      return newState;
    default:
      return state;
  }
}
