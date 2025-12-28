import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://event-intelligence-system-3.onrender.com/events/${id}`);
        setEvent(res.data.event);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [id]);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "speakers", label: "Speakers" },
    { id: "agenda", label: "Agenda" },
    { id: "network", label: "Network" },
    { id: "insights", label: "Insights" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-gray-200">
      <Navbar />

      {!event ? (
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
            <div className="relative max-w-7xl mx-auto px-6 pb-10 w-full">
              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.domains?.map((tag, i) => (
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
                <span>📍 {event.location}</span>
              </div>
            </div>
          </div>

          {/* TAB NAVIGATION */}
          <div className="bg-[#0d1117] border-b border-gray-800 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 text-sm font-medium transition-all relative ${
                      activeTab === tab.id
                        ? "text-blue-400"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="max-w-7xl mx-auto px-6 py-10">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN - Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* ABOUT EVENT */}
                  <Card title="About This Event">
                    <p className="text-gray-300 leading-relaxed">{event.overview?.about}</p>
                  </Card>

                  {/* WHAT YOU'LL LEARN */}
                  {event.overview?.learnings && (
                    <Card title="What You'll Learn">
                      <ul className="space-y-3">
                        {event.overview.learnings.map((learning, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {/* WHO SHOULD ATTEND */}
                  {event.overview?.shouldAttend && (
                    <Card title="Who Should Attend">
                      <div className="grid grid-cols-2 gap-3">
                        {event.overview.shouldAttend.map((attendee, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-gray-300"
                          >
                            <span className="text-blue-400">◉</span>
                            <span className="text-sm">{attendee}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>

                {/* RIGHT COLUMN - Sidebar */}
                <div className="space-y-6">
                  
                  {/* REGISTRATION STATUS */}
                  <Card title="Registration Status">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">Registered</span>
                          <span className="text-gray-300">
                            {event.registeredUsersCount || "N/A"}
                          </span>
                        </div>
                        {event.overview?.highlights?.attendees && (
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                        )}
                      </div>
                      
                      {event.overview?.highlights?.attendees && (
                        <p className="text-gray-400 text-sm">
                          Expected: {event.overview.highlights.attendees} attendees
                        </p>
                      )}
                    </div>
                  </Card>

                  {/* EVENT HIGHLIGHTS */}
                  {event.overview?.highlights && (
                    <Card title="Event Highlights">
                      <div className="space-y-3">
                        {event.overview.highlights.sessions && (
                          <Stat label="Sessions" value={event.overview.highlights.sessions} />
                        )}
                        {event.overview.highlights.exhibitors && (
                          <Stat label="Exhibitors" value={event.overview.highlights.exhibitors} />
                        )}
                        {event.overview.highlights.speakers && (
                          <Stat label="Speakers" value={event.overview.highlights.speakers} />
                        )}
                        {event.overview.highlights.networking && (
                          <Stat label="Networking Events" value={event.overview.highlights.networking} />
                        )}
                      </div>
                    </Card>
                  )}

                  {/* ORGANIZER */}
                  <Card title="Organizer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400 text-xl font-bold">
                          {(event.eventCenter || event.overview?.organizer || "E")[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {event.eventCenter || event.overview?.organizer}
                        </p>
                        <p className="text-gray-400 text-sm">Event Organizer</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* SPEAKERS TAB */}
            {activeTab === "speakers" && (
              <div>
                {event.speakers && event.speakers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {event.speakers.map((speaker, i) => (
                      <div
                        key={i}
                        className="bg-[#111827] p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                          {speaker.name[0]}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {speaker.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">{speaker.designation}</p>
                        {speaker.day && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-blue-400">📅</span>
                            <span className="text-gray-300">{speaker.day}</span>
                          </div>
                        )}
                        {speaker.time && (
                          <div className="flex items-center gap-2 text-sm mt-2">
                            <span className="text-blue-400">🕐</span>
                            <span className="text-gray-300">{speaker.time}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState message="No speakers information available" />
                )}
              </div>
            )}

            {/* AGENDA TAB */}
            {activeTab === "agenda" && (
              <div>
                {event.agenda && event.agenda.length > 0 ? (
                  <div className="space-y-6">
                    {event.agenda.map((day, i) => (
                      <div key={i} className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
                        <div className="bg-[#1a2332] p-5 border-b border-gray-700 flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{day.day}</h3>
                            <p className="text-gray-400 text-sm mt-1">{day.type}</p>
                          </div>
                          <span className="px-4 py-2 bg-blue-500/10 text-blue-300 rounded-full text-sm border border-blue-500/20">
                            {day.events?.length || 0} Events
                          </span>
                        </div>
                        
                        <div className="p-5 space-y-4">
                          {day.events?.map((evt, j) => (
                            <div key={j} className="flex gap-4 p-4 bg-[#0d1117] rounded-lg hover:bg-[#161b22] transition-all">
                              <div className="text-blue-400 font-semibold min-w-[140px] text-sm">
                                {evt.time}
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-300">{evt.event}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState message="No agenda information available" />
                )}
              </div>
            )}

            {/* NETWORK TAB */}
            {activeTab === "network" && (
              <div>
                {event.network ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {event.network.attendeeProfiles && (
                      <Card title="Attendee Profiles">
                        <div className="space-y-6">
                          <div className="p-5 bg-[#0d1117] rounded-xl border border-gray-700">
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-5xl font-bold text-blue-400">
                                {event.network.attendeeProfiles.seniorLevel}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              {event.network.attendeeProfiles.seniorLevelDescription}
                            </p>
                          </div>
                          
                          <div className="p-5 bg-[#0d1117] rounded-xl border border-gray-700">
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-5xl font-bold text-blue-400">
                                {event.network.attendeeProfiles.buyingInfluence}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              {event.network.attendeeProfiles.buyingInfluenceDescription}
                            </p>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                ) : (
                  <EmptyState message="No network information available" />
                )}
              </div>
            )}

            {/* INSIGHTS TAB */}
            {activeTab === "insights" && (
              <div>
                {event.insights ? (
                  <div className="space-y-8">
                    
                    {/* ROLE DISTRIBUTION */}
                    {event.insights.roleDistribution && (
                      <Card title="Role Distribution">
                        <div className="space-y-3">
                          {event.insights.roleDistribution.map((role, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                  <span className="text-gray-300 text-sm">{role.role}</span>
                                  <span className="text-blue-400 font-semibold text-sm">{role.percentage}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all" 
                                    style={{ width: role.percentage }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* TOP COMPANIES */}
                    {event.insights.topCompanies && (
                      <Card title="Top Attending Companies">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {event.insights.topCompanies.map((company, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-4 bg-[#0d1117] rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all"
                            >
                              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-blue-400 font-bold">{i + 1}</span>
                              </div>
                              <span className="text-gray-300">{company}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                ) : (
                  <EmptyState message="No insights available" />
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------ COMPONENTS ------------------ */

const Card = ({ title, children }) => (
  <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
    <h2 className="text-xl font-bold text-white mb-5">{title}</h2>
    {children}
  </div>
);

const Stat = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="text-white font-semibold">{value}</span>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
      <span className="text-gray-600 text-2xl">📋</span>
    </div>
    <p className="text-gray-500">{message}</p>
  </div>
);

export default EventDetails;