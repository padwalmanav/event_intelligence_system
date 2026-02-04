import React from "react";
import EventCard from "./EventCard";

const EventGrid = ({ events, userId }) => {
  return (
    <div
      className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      {events.map((ev) => (
        <EventCard
          key={ev._id?.$oid || ev._id}
          event={ev}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default EventGrid;
