import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/events/${id}`);
        setEvent(res.data.event);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event)
    return (
      <div className="p-8 text-center text-gray-400 animate-pulse text-lg">
        Loading event details...
      </div>
    );

  const llm = event.llm_response;

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Page Header */}
        <div className="bg-[#111827] rounded-2xl p-8 shadow-xl border border-gray-800">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {event.title}
          </h1>
          <p className="text-gray-400 text-lg mt-3">{event.description}</p>
        </div>

        {/* GRID - Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card title="Event Information">
            <Info label="Date" value={event.date} />
            <Info label="City" value={event.city} />
            <Info label="Venue" value={event.venue} />

            <Info
              label="Venue Website"
              value={
                <a
                  href={event.venue_website}
                  className="text-blue-400 hover:underline"
                >
                  {event.venue_website}
                </a>
              }
            />

            <Info label="Venue Phone" value={event.venue_phone} />
            <Info label="Venue Fax" value={event.venue_fax} />

            <Info
              label="Event Website"
              value={
                <a
                  href={event.event_website}
                  className="text-blue-400 hover:underline"
                >
                  {event.event_website}
                </a>
              }
            />

            <Info label="Event Email" value={event.event_email} />
            <Info label="Audience" value={event.audience} />
            <Info label="Cycle" value={event.cycle} />
          </Card>

          <Card title="Related Industries">
            <ul className="list-disc ml-6 space-y-2 text-gray-300">
              {event.related_industries.map((ind, idx) => (
                <li key={idx}>{ind}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Organizers */}
        <Card title="Organizers" className="mt-8">
          <ul className="space-y-4">
            {event.organizers.map((org, i) => (
              <li
                key={i}
                className="p-5 bg-[#0F162A] border border-gray-800 rounded-xl shadow-sm"
              >
                <p className="text-xl font-semibold text-white">{org.name}</p>
                <p className="text-gray-400 mt-1">{org.address}</p>

                <div className="mt-2">
                  <p>
                    <span className="font-semibold text-gray-300">Phone:</span>{" "}
                    {org.ev_phone}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Fax:</span>{" "}
                    {org.ev_fax}
                  </p>
                </div>

                <a
                  href={org.official_website}
                  className="text-blue-400 hover:underline block mt-2"
                >
                  {org.official_website}
                </a>
              </li>
            ))}
          </ul>
        </Card>

        {/* LLM INSIGHTS SECTION */}
        {llm && (
          <Card title="AI Insights" className="mt-10">

            <SectionBlock title="Summary">
              <p>{llm.about_this_event}</p>
            </SectionBlock>

            <SectionBlock title="Target Audience">
              <p>{llm.target_audience}</p>
            </SectionBlock>

            <SectionList title="Event Highlights" list={llm.event_highlights} />
            <SectionList title="Skills Required" list={llm.skills_required} />
            <SectionList title="Agenda Themes" list={llm.agenda_themes} />
            <SectionList title="Domain Categories" list={llm.domain_categories} />
            <SectionList title="Best Use Cases" list={llm.best_use_cases} />

            {/* Meta Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Meta label="Technical Depth" value={llm.technical_depth} />
              <Meta label="Business Relevance" value={llm.business_relevance} />
              <Meta label="Networking Potential" value={llm.networking_potential} />
              <Meta label="Sentiment" value={llm.sentiment} />
              <Meta label="Industry Impact" value={llm.industry_impact} />
            </div>

            {llm.value_insight && (
              <SectionBlock title="Value Insight">
                <p>{llm.value_insight}</p>
              </SectionBlock>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

/* ------------------ Reusable Components ------------------ */

const Card = ({ title, children, className }) => (
  <div
    className={`bg-[#111827] rounded-2xl p-6 shadow-xl border border-gray-800 ${className}`}
  >
    <h2 className="text-2xl font-bold text-white mb-5">{title}</h2>
    {children}
  </div>
);

const Info = ({ label, value }) => (
  <p className="mb-2 text-gray-300">
    <span className="font-semibold text-gray-200">{label}:</span> {value}
  </p>
);

const SectionBlock = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
    <div className="bg-[#0F162A] p-4 rounded-xl border border-gray-800">
      {children}
    </div>
  </div>
);

const SectionList = ({ title, list }) =>
  !list || list.length === 0 ? null : (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
      <ul className="list-disc ml-6 space-y-1 text-gray-300">
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );

const Meta = ({ label, value }) => (
  <div className="p-4 bg-[#0F162A] border border-gray-800 rounded-xl shadow-sm">
    <p className="text-gray-300 font-semibold">{label}</p>
    <p className="text-gray-400 text-lg">{value}</p>
  </div>
);

export default EventDetails;
