import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import EventSlider from "../components/EventSlider";
import backend_url from "../constants/backend_url";
import toast from "react-hot-toast";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchEvent, setSearchEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);

  useEffect(() => {
  let toastId;

  const fetchEvents = async () => {
    if (!toastId) {
      toastId = toast.loading("Loading events...");
    }

    try {
      const res = await axios.get(`${backend_url}/events`);
      setEvents(res.data.events);
      toast.success("Events Loaded", { id: toastId });
    } catch (err) {
      toast.error("Failed to load events", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  fetchEvents();
}, []);

  useEffect(()=>{
    const filtered = events.filter((event)=>{
      return(event.title.toLowerCase().includes(searchEvent.toLowerCase()))
    })
    setFilteredEvents(filtered)
},[searchEvent]);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar search={true} searchEvent={setSearchEvent}/>

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
          isLoading ? (
            <div className="text-center text-gray-400 text-xl">
              Fetching events...
            </div>
          ):
            filteredEvents.length > 0 ? (
              <EventSlider events={filteredEvents} />
              ) : 
                events.length > 0 ? (
                  <EventSlider events={events} />
                ):
                 (
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
