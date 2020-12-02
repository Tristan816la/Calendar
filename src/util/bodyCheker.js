import moment from "moment";

const validTime = (time) => {
  return moment(time, "h:mm").isValid();
};

export const bodyChecker = ({ title, start, end, date }) => {
  let errors = {};
  // Title Check
  if (!title || title.trim().length === 0) {
    errors = { ...errors, title: "Title cannot be empty" };
  } else if (title.length > 20) {
    errors = { ...errors, title: "Title too long" };
  }

  // Time Check
  if (!validTime(start)) {
    errors = { ...errors, start: "Start time is not valid" };
  }
  if (!validTime(end)) {
    errors = { ...errors, end: "End time is not valid" };
  }
  if (
    validTime(start) &&
    validTime(end) &&
    moment(start, "h:mm").isAfter(moment(end, "h:mm"))
  ) {
    errors = { ...errors, start: "Start time must be ealier than finish time" };
  }

  if (!moment(date).isValid()) {
    errors = { ...errors, date: "Date is not valid" };
  }
  return errors;
};
