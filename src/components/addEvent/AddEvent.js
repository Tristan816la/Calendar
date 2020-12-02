import React, { useState, useEffect } from "react";
// MUI
import {
  Tooltip,
  Dialog,
  TextField,
  Typography,
  Select,
  MenuItem,
  DialogActions,
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import ScheduleIcon from "@material-ui/icons/Schedule";
// Styled
import { AddButton, AddEventWrapper } from "./AddEvenStyle";
import {
  StyledDialogTitle,
  StyledTitle,
  StyledDialogActions,
  SaveButton,
} from "../../styled/Dialog";
//Utils
import moment from "moment";
import { ParseTimeApm } from "../../util/timeParser";
//Redux
import { useDispatch } from "react-redux";
import { createEvent } from "../../redux/actions";
import { bodyChecker } from "../../util/bodyCheker";

const AddEvent = () => {
  // States
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startApm, setStartApm] = useState("");
  const [endApm, setEndApm] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    // Parse current time as default placeholders
    const parseCurrentTime = () => {
      setDate(moment().format("YYYY-MM-DD"));
      setStart(moment().format("h:mm"));
      setEnd(moment().format("h:mm"));
      setStartApm(moment().format("a"));
      setEndApm(moment().format("a"));
    };
    parseCurrentTime();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };

  // Boring Handlers
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

    const check = bodyChecker(body);
    setErrors(check);
    if (check.start || check.end || check.date || check.title) return;

    dispatch(createEvent(body));
    handleClose();
  };

  return (
    <>
      <AddEventWrapper>
        <Tooltip title="Add a new event!" arrow placement="top">
          <AddButton onClick={handleClickOpen}>
            <Edit />
          </AddButton>
        </Tooltip>
      </AddEventWrapper>

      <Dialog open={open} onClose={handleClose}>
        <StyledDialogTitle>
          <StyledTitle
            placeholder="Add Title"
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
    </>
  );
};

export default AddEvent;
