import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import EventSlider from "../components/EventSlider";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchEvent, setSearchEvent] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const { userId } = useParams(); 

  useEffect(() => {
    let toastId;

    const fetchEvents = async () => {
      toastId = toast.loading("Loading events...");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/events`
        );
        setEvents(res.data.events || []);
        toast.success("Events Loaded", { id: toastId });
      } catch (err) {
        toast.error("Failed to load events", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!searchEvent) {
      setFilteredEvents([]);
      return;
    }

    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(searchEvent.toLowerCase())
    );

    setFilteredEvents(filtered);
  }, [searchEvent, events]);

  // ================= GATED EVENTS =================
  const sourceEvents =
    searchEvent.trim().length > 0 ? filteredEvents : events;

  const gatedEvents = (() => {
    if (isLoggedIn) return sourceEvents;

    if (sourceEvents.length === 0) return [];

    return [
      sourceEvents[0],
      ...sourceEvents.slice(1).map((event, index) => ({
        _id: `locked-${index}`,
        isLocked: true,

        title: event.title,
        location: event.location || event.city || "Location TBA",
        image: event.image,
        about:
          event.overview?.about?.slice(0, 70) ||
          "Discover insights, speakers, and sessions by logging in",

        domains: event.domains,
        date: event.date,
      })),
    ];
  })();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar search={true} searchEvent={setSearchEvent} />

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="w-full text-center py-20 rounded-3xl mb-16 bg-gradient-to-b from-[#0a1125] to-[#000510]">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="text-gray-200">Tech Events </span>
            <span className="text-blue-400">Gallery</span>
          </h1>

          <p className="text-xl text-gray-400 mt-4">
            Browse technology events in an easy-to-scan card format
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-400 text-xl">
            Fetching events...
          </div>
        ) : gatedEvents.length > 0 ? (
          <EventSlider events={gatedEvents} userId={userId}/>
        ) : (
          <div className="bg-[#0f172a] rounded-xl h-80 mt-10 pt-16 flex flex-col items-center">
            <h1 className="text-gray-300 text-3xl font-semibold">
              --- No events to display ---
            </h1>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Events;
