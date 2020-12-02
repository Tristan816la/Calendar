import React from "react";
import Calendar from "../components/calendar/Calendar";
import AddEvent from "../components/addEvent/AddEvent";

const Home = () => {
  return (
    <div>
      <Calendar />
      <AddEvent />
    </div>
  );
};

export default Home;
