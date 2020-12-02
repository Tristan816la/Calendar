import axios from "axios";
import {
  SET_EVENTS,
  UPDATE_EVENT,
  DELETE_EVENT,
  NEW_EVENT,
  SET_EDIT_EVENT,
} from "./types";

// Helper Function since our database don't store
// The same Event Object as required by big calendar
const generateEvent = (d) => {
  let [year, month, date] = d.date.split("-");
  let [startHour, startMin] = d.start.split(":");
  let [endHour, endMin] = d.end.split(":");

  // Month - 1 since Date() month starts from 0
  return {
    title: d.title,
    start: new Date(year, month - 1, date, startHour, startMin),
    end: new Date(year, month - 1, date, endHour, endMin),
    id: d._id,
  };
};

// Get All Events
export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get("/events");
    const payload = res.data.map((d) => generateEvent(d));
    dispatch({ type: SET_EVENTS, payload });
  } catch (err) {
    console.error(err.response.data);
  }
};

// Create an Event
export const createEvent = (body) => async (dispatch) => {
  try {
    const res = await axios.post("/events", body);
    const newEvent = generateEvent(res.data);
    dispatch({ type: NEW_EVENT, payload: newEvent });
  } catch (err) {
    console.error(err);
  }
};

// Update an Event
export const updateEvent = (id, body) => async (dispatch) => {
  try {
    const res = await axios.put(`/events/${id}`, body);
    const event = generateEvent(res.data);
    const payload = {
      event: event,
      id,
    };
    dispatch({ type: UPDATE_EVENT, payload });
  } catch (err) {
    console.error(err);
  }
};

// Delete an Event/
export const deleteEvent = (id) => async (dispatch) => {
  try {
    await axios.delete(`/events/${id}`);
    dispatch({ type: DELETE_EVENT, payload: id });
  } catch (err) {
    console.error(err.response.data);
  }
};

// SET Current Edit Event
export const setEditEvent = (event) => (dispatch) => {
  dispatch({ type: SET_EDIT_EVENT, payload: event });
};
