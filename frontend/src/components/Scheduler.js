import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEventModal";

const Scheduler = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarAPI = this.calendarRef.current.getAPI();
    calendarAPI.addEvent(event);
  };

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event</button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
        />
      </div>

      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};
export default Scheduler;
