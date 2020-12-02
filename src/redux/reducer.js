import {
  DELETE_EVENT,
  UPDATE_EVENT,
  NEW_EVENT,
  SET_EDIT_EVENT,
  SET_EVENTS,
} from "./types";

const initialState = {
  editEvent: {},
  events: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case NEW_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    case DELETE_EVENT: {
      const id = action.payload;
      const newEvents = state.events.filter((e) => e.id !== id);
      return {
        ...state,
        events: newEvents,
      };
    }
    case UPDATE_EVENT: {
      let { id } = action.payload;
      const changed = state.events.filter((e) => e.id !== id);
      return {
        ...state,
        events: [...changed, action.payload.event],
      };
    }
    case SET_EDIT_EVENT: {
      return {
        ...state,
        editEvent: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
