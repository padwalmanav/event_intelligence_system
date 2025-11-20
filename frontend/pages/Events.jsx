import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/events");
        setEvents(response.data.events);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <Navbar />
      
      <h1 className="text-3xl font-bold mb-4">Events</h1>

      {events.length === 0 ? (
        <p>Loading...</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="border p-4 rounded mb-4 shadow">
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p className="mt-2 text-gray-700">{event.description}</p>

            <div className="mt-4">
              <strong>Date:</strong> {event.date} <br />
              <strong>City:</strong> {event.city} <br />
              <strong>Venue:</strong> {event.venue}
            </div>

            <div className="mt-3">
              <strong>Related Industries:</strong>
              <ul className="list-disc ml-5 text-gray-800">
                {event.related_industries.map((industry, index) => (
                  <li key={index}>{industry}</li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <strong>Organizers:</strong>
              <ul className="list-disc ml-5">
                {event.organizers.map((org, index) => (
                  <li key={index}>
                    <strong>{org.name}</strong> — {org.ev_phone}
                    <br />
                    Website:{" "}
                    <a href={org.official_website} className="text-blue-600">
                      {org.official_website}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <a
                href={event.venue_website}
                className="text-blue-600 underline"
              >
                Venue Website
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Events;
