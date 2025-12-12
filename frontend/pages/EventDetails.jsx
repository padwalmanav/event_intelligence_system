import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ llm, setLLm ] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://event-intelligence-system-3.onrender.com/events/${id}`);
        setEvent(res.data.event);
        setLLm(event.llm_response)
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-gray-200">
      <Navbar />

      {
        !event ? (
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 mt-4 text-lg">Fetching event details...</p>
            </div>
          </div>
        ) : (
          <div>
            {/* HERO SECTION */}
            <div className="relative h-[320px] w-full bg-gradient-to-b from-black/60 to-transparent flex items-end">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')] bg-cover bg-center opacity-30" />
              <div className="relative max-w-6xl mx-auto px-6 pb-10">
                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.llm_response.domain_categories.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* TITLE */}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {event.title}
                </h1>

                {/* META ROW */}
                <div className="flex flex-wrap items-center gap-4 text-gray-300 mt-4 text-sm">
                  <span>📅 {event.date}</span>
                  <span>📍 {event.city}</span>
                  <span>🏛️ {event.venue}</span>
                </div>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

              {/* ABOUT EVENT */}
              <Card title="About This Event">
                <p className="text-gray-300">{event.description}</p>
                {llm?.about_this_event && (
                  <p className="text-gray-400 mt-4">{llm.about_this_event}</p>
                )}
              </Card>

              {/* GRID: EVENT INFO + INDUSTRIES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <Card title="Event Information">
                  <Info label="Date" value={event.date} />
                  <Info label="City" value={event.city} />
                  <Info label="Venue" value={event.venue} />

                  <Info
                    label="Venue Website"
                    value={
                      <a href={event.venue_website} className="text-blue-400 underline">
                        {event.venue_website}
                      </a>
                    }
                  />

                  <Info label="Phone" value={event.venue_phone} />
                  <Info label="Fax" value={event.venue_fax} />

                  <Info
                    label="Event Website"
                    value={
                      <a href={event.event_website} className="text-blue-400 underline">
                        {event.event_website}
                      </a>
                    }
                  />

                  <Info label="Email" value={event.event_email} />
                  <Info label="Audience" value={event.audience} />
                  <Info label="Cycle" value={event.cycle} />
                </Card>

                {/* INDUSTRIES */}
                <Card title="Related Industries">
                  <ul className="space-y-2 text-gray-300">
                    {event.related_industries.map((ind, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full" />
                        {ind}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* ORGANIZERS */}
              <Card title="Organizers">
                {event.organizers.map((org, i) => (
                  <div
                    key={i}
                    className="p-5 bg-[#0F162A] rounded-xl border border-gray-700/50 mb-4"
                  >
                    <p className="text-xl font-semibold text-white">{org.name}</p>
                    <p className="text-gray-400 mt-1">{org.address}</p>

                    <div className="mt-3 space-y-1">
                      <Info label="Phone" value={org.ev_phone} />
                      <Info label="Fax" value={org.ev_fax} />
                    </div>

                    <a
                      className="text-blue-400 underline mt-3 block"
                      href={org.official_website}
                    >
                      {org.official_website}
                    </a>
                  </div>
                ))}
              </Card>

              {/* AI INSIGHTS */}
              {llm && (
                <Card title="AI Insights">

                  {/* SUMMARY */}
                  {llm.value_insight && (
                    <div className="mb-10">
                      <h3 className="text-xl font-semibold text-gray-100 mb-3 flex items-center gap-2">
                        <span className="text-blue-400 text-2xl">💡</span> Overview Insight
                      </h3>
                      <p className="text-gray-300 leading-relaxed bg-[#0F162A] p-5 rounded-xl border border-gray-800">
                        {llm.value_insight}
                      </p>
                    </div>
                  )}

                  {/* GRID: QUICK META METRICS */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    <Meta label="Technical Depth" value={llm.technical_depth} />
                    <Meta label="Business Relevance" value={llm.business_relevance} />
                    <Meta label="Industry Impact" value={llm.industry_impact} />
                    <Meta label="Networking Potential" value={llm.networking_potential} />
                    {llm.sentiment && <Meta label="Sentiment" value={llm.sentiment} />}
                  </div>

                  {/* HIGHLIGHTS */}
                  <FancyList
                    title="Event Highlights"
                    emoji="✨"
                    list={llm.event_highlights}
                  />

                  {/* AUDIENCE */}
                  <FancyList
                    title="Target Audience"
                    emoji="🎯"
                    list={llm.target_audience}
                  />

                  {/* SKILLS */}
                  <FancyList
                    title="Skills Required"
                    emoji="🛠️"
                    list={llm.skills_required}
                  />

                  {/* AGENDA */}
                  <FancyList
                    title="Agenda Themes"
                    emoji="📌"
                    list={llm.agenda_themes}
                  />

                  {/* CATEGORIES */}
                  <FancyList
                    title="Domain Categories"
                    emoji="📂"
                    list={llm.domain_categories}
                  />

                  {/* USE CASES */}
                  <FancyList
                    title="Best Use Cases"
                    emoji="🚀"
                    list={llm.best_use_cases}
                  />

                  {/* SPEAKERS */}
                  {llm.speakers?.length > 0 && (
                    <FancyList
                      title="Speakers"
                      emoji="🎤"
                      list={llm.speakers}
                    />
                  )}
                </Card>
              )}

            </div>
          </div>
        )}
    </div>
  );
};

/* ------------------ COMPONENTS ------------------ */

const Card = ({ title, children }) => (
  <div className="bg-[#111827] rounded-2xl p-6 shadow-xl border border-gray-800">
    <h2 className="text-2xl font-bold text-white mb-5">{title}</h2>
    {children}
  </div>
);

const Info = ({ label, value }) => (
  <p className="text-gray-300">
    <span className="font-semibold text-gray-100">{label}:</span>{" "}
    {value}
  </p>
);

export default EventDetails;


/* ---------------------------------------------
   ENHANCED UI — BEAUTIFUL LIST COMPONENT
----------------------------------------------*/
const FancyList = ({ title, emoji, list }) => {
  if (!list || list.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-100 mb-3 flex items-center gap-2">
        <span className="text-blue-400 text-2xl">{emoji}</span> {title}
      </h3>

      <div className="bg-[#0F162A] border border-gray-800 rounded-xl p-5">
        <ul className="space-y-3">
          {list.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-gray-300 leading-relaxed"
            >
              <span className="text-blue-400 text-lg mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ---------------------------------------------
   META BOX — VISUAL METRIC BADGE
----------------------------------------------*/
const Meta = ({ label, value }) => (
  <div className="p-4 bg-[#0F162A] rounded-xl border border-gray-800 shadow-md hover:shadow-blue-900/20 transition">
    <p className="font-semibold text-gray-200">{label}</p>
    <p className="text-gray-300 text-lg mt-1 capitalize">{value}</p>
  </div>
);
