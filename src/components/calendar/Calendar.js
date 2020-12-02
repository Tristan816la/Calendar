import React, { useEffect } from "react";
// Utils
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import EditEvent from "../editEvent/EditEvent";
import "react-big-calendar/lib/css/react-big-calendar.css";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getEvents, updateEvent, setEditEvent } from "../../redux/actions";

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const localizer = momentLocalizer(moment);

const Calendar = () => {
  // Redux
  const events = useSelector((state) => state.events);
  const editEvent = useSelector((state) => state.editEvent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleSelectEvent = (event, e) => {
    dispatch(setEditEvent(event));
  };

  const moveEvent = async ({ event, start, end }) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    // Backend call
    try {
      const id = event.id;
      const newStartDate = moment(start).format("YYYY-MM-DD");
      const newStartTime = moment(start).format("H:mm");
      const newEndTime = moment(end).format("H:mm");

      const body = {
        date: newStartDate,
        start: newStartTime,
        end: newEndTime,
      };
      dispatch(updateEvent(id, body));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        onSelectEvent={handleSelectEvent}
        onEventDrop={moveEvent}
        defaultView="week"
        views={["week", "day"]}
      />
      <EditEvent event={editEvent} />
    </div>
  );
};

export default Calendar;
