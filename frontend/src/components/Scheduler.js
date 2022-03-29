import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "white",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: " fixed ",
    backgroundOpacity: 0.5,
  },
}));

const SchedulerContainer = styled.div`
  background-color: #fff;
`;
const DatePickerStyle = styled.div`
  padding-left: 50px;
`;
const Heading = styled.div`
  text-align: center;
`;

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 2, 14),
    end: new Date(2022, 2, 14),
  },
  {
    title: "Vacation",
    start: new Date(2022, 2, 7),
    end: new Date(2022, 2, 10),
  },
  {
    title: "Conference",
    start: new Date(2022, 2, 20),
    end: new Date(2022, 2, 24),
  },
  {
    title: "Big Gym Event",
    allDay: true,
    start: new Date(2022, 2, 14),
    end: new Date(2022, 2, 14),
  },
];

function Scheduler() {
  const classes = useStyles();
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <SchedulerContainer>
      <div className={classes.root}>
        <Heading>
          <h1>Upcoming Events</h1>
        </Heading>
        <DatePickerStyle>
          <h2>Add New Event</h2>
          <div>
            <input
              type="text"
              placeholder="Add Title"
              style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <DatePicker
              placeholderText="Start Date"
              style={{ marginRight: "10px" }}
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
            <DatePicker
              placeholderText="End Date"
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
            <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
        </DatePickerStyle>

        <Calendar
          localizer={localizer}
          events={allEvents}
          views={["month"]}
          startAccessor="start"
          endAccessor={({ end }) => new Date(end.getTime() + 1)}
          style={{ height: "60rem", margin: "50px" }}
        />
      </div>
    </SchedulerContainer>
  );
}

export default Scheduler;
