import React, { useState, useEffect } from "react";
//Mui
import {
  Dialog,
  TextField,
  DialogActions,
  Typography,
  Select,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DeleteIcon from "@material-ui/icons/Delete";
// Styled Components
import {
  StyledDialogActions,
  StyledDialogTitle,
  StyledTitle,
  SaveButton,
} from "../../styled/Dialog";
import { DeleteButton, EditTitle } from "./EditEventStyle";
// Util
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setEditEvent, deleteEvent, updateEvent } from "../../redux/actions";
import { ParseTimeApm } from "../../util/timeParser";
import { bodyChecker } from "../../util/bodyCheker";

const EditEvent = () => {
  // States
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startApm, setStartApm] = useState("");
  const [endApm, setEndApm] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  // Redux
  const event = useSelector((state) => state.editEvent);
  const dispatch = useDispatch();

  // Parse the Current Event
  useEffect(() => {
    const parseEvent = () => {
      setDate(moment(event.start).format("YYYY-MM-DD"));
      setStart(moment(event.start).format("h:mm"));
      setEnd(moment(event.end).format("h:mm"));
      setStartApm(moment(event.start).format("a"));
      setEndApm(moment(event.end).format("a"));
      setTitle(event.title);
    };
    parseEvent();
  }, [event]);

  // Boring Handlers
  const handleClose = () => {
    dispatch(setEditEvent({}));
  };

  const handleDateChange = (e) => {
    setErrors({ ...errors, date: "" });
    setDate(e.target.value);
  };
  const handleStartApmChange = (e) => {
    setStartApm(e.target.value);
  };
  const handleEndApmChange = (e) => {
    setEndApm(e.target.value);
  };
  const handleTitleChange = (e) => {
    setErrors({ ...errors, title: "" });
    setTitle(e.target.value);
  };
  const handleStartChange = (e) => {
    setErrors({ ...errors, start: "" });
    setStart(e.target.value);
  };
  const handleEndChange = (e) => {
    setErrors({ ...errors, end: "" });
    setEnd(e.target.value);
  };

  const handleSubmit = () => {
    let newStart = ParseTimeApm(start, startApm);
    let newEnd = ParseTimeApm(end, endApm);

    const body = {
      title,
      start: newStart,
      end: newEnd,
      date,
    };

    // Check before submitting an event
    const check = bodyChecker(body);
    setErrors(check);
    if (check.start || check.end || check.date || check.title) return;

    dispatch(updateEvent(event.id, body));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteEvent(event.id));
    handleClose();
  };

  return (
    <Dialog open={!!event && !!event.start} onClose={handleClose}>
      <EditTitle>
        <Typography variant="h5">Edit your event</Typography>
        <Tooltip title="Delete event" arrow placement="top">
          <DeleteButton onClick={handleDelete}>
            <DeleteIcon />
          </DeleteButton>
        </Tooltip>
      </EditTitle>
      <StyledDialogTitle>
        <StyledTitle
          value={title}
          onChange={handleTitleChange}
          error={!!errors.title}
          helperText={errors.title}
        ></StyledTitle>
      </StyledDialogTitle>

      <StyledDialogActions>
        <ScheduleIcon />
        <TextField
          defaultValue={date}
          fullWidth
          onChange={handleDateChange}
          error={!!errors.date}
          helperText={errors.date}
        ></TextField>
        <TextField
          defaultValue={start}
          fullWidth
          onChange={handleStartChange}
          error={!!errors.start}
          helperText={errors.start}
        ></TextField>
        <Select value={startApm} onChange={handleStartApmChange}>
          <MenuItem value={"am"}>am</MenuItem>
          <MenuItem value={"pm"}>pm</MenuItem>
        </Select>
        <Typography>—</Typography>
        <TextField
          defaultValue={end}
          fullWidth
          onChange={handleEndChange}
          error={!!errors.end}
          helperText={errors.end}
        ></TextField>
        <Select value={endApm} onChange={handleEndApmChange}>
          <MenuItem value={"am"}>am</MenuItem>
          <MenuItem value={"pm"}>pm</MenuItem>
        </Select>
      </StyledDialogActions>

      <DialogActions>
        <SaveButton onClick={handleSubmit}>Save</SaveButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditEvent;
