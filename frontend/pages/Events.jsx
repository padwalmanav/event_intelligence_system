import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EventSlider from "../components/EventSlider";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/events");
        setEvents(res.data.events);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      {/* PAGE CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HERO SECTION */}
        <div className="
          w-full text-center py-20 rounded-3xl mb-16
          bg-gradient-to-b from-[#0a1125] to-[#000510]
        ">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="text-gray-200">Tech Events </span>
            <span className="text-blue-400">Gallery</span>
          </h1>

          <p className="text-xl text-gray-400 mt-4">
            Browse technology events in an easy-to-scan card format
          </p>
        </div>

        {/* EVENTS SECTION */}
        {
          events.length > 0 ? (
            <EventSlider events={events} />
          ) : (
            <div className="bg-[#0f172a] rounded-xl h-80 mt-10 pt-16 flex flex-col items-center">
              <h1 className="text-gray-300 text-3xl font-semibold">
                --- No events to display ---
              </h1>
            </div>
          )
        }

      </div>
    </div>
  );
};

export default Events;
