import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventCard from "./EventCard";

const EventSlider = ({ events }) => {
  const sliderRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const checkScroll = () => {
    const el = sliderRef.current;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => checkScroll(), [events]);

  const scrollByAmount = 300;

  return (
    <div className="relative w-full mt-6">

      {canLeft && (
        <button
          onClick={() => sliderRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" })}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-20 hover:bg-blue-50"
        >
          <ChevronLeft size={24} color="#2563eb"/>
        </button>
      )}

      <div
        ref={sliderRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-10 py-3"
      >
        {events.map((ev) => (
          <EventCard key={ev._id.$oid} event={ev} />
        ))}
      </div>

      {canRight && (
        <button
          onClick={() => sliderRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" })}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-20 hover:bg-blue-50"
        >
          <ChevronRight size={24} color="#2563eb"/>
        </button>
      )}
    </div>
  );
};

export default EventSlider;
