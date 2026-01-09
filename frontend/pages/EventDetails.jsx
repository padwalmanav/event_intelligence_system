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
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events/${id}`);
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
    { id: "roi", label: "ROI & Metrics" },
    { id: "costs", label: "Costs" },
    { id: "logistics", label: "Logistics" },
    { id: "strategic", label: "Strategic Fit" },
    { id: "insights", label: "Insights" },
    { id: "gtm", label: "GTM Intelligence" }
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
          <div className="relative h-[320px] w-full bg-gradient-to-b from-black/60 to-transparent flex items-end">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')] bg-cover bg-center opacity-30" />
            <div className="relative max-w-7xl mx-auto px-6 pb-10 w-full">

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

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                {event.title}
              </h1>

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
                    className={`py-4 px-2 text-sm font-medium transition-all relative ${activeTab === tab.id
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

          <div className="max-w-7xl mx-auto px-6 py-10">

            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">

                  <Card title="About This Event">
                    <p className="text-gray-300 leading-relaxed">{event.overview?.about}</p>
                  </Card>

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

                <div className="space-y-6">

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
                  <div className="space-y-12">

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Networking & Audience Intelligence
                      </h2>
                      <p className="text-gray-400 max-w-3xl">
                        Understand who attends, how decisions are made, and how to maximize
                        networking ROI at this event.
                      </p>
                    </div>

                    {event.network.attendeeProfiles && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-6 rounded-2xl border border-blue-500/20">
                          <p className="text-gray-400 text-sm mb-2">
                            Senior-Level Attendees
                          </p>
                          <div className="flex items-baseline gap-3">
                            <span className="text-5xl font-bold text-blue-400">
                              {event.network.attendeeProfiles.seniorLevel}
                            </span>
                            <span className="text-gray-400 text-sm">C-Suite / VP+</span>
                          </div>
                          <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                            {event.network.attendeeProfiles.seniorLevelDescription}
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-6 rounded-2xl border border-purple-500/20">
                          <p className="text-gray-400 text-sm mb-2">
                            Buying Influence
                          </p>
                          <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-purple-400">
                              {event.network.attendeeProfiles.buyingInfluence}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                            {event.network.attendeeProfiles.buyingInfluenceDescription}
                          </p>
                        </div>

                      </div>
                    )}

                    {event.network.officialNetworkingEvents && (
                      <Card title="Official Networking Events">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {event.network.officialNetworkingEvents.map((evt, i) => (
                            <div
                              key={i}
                              className="p-4 bg-[#0d1117] rounded-lg border border-gray-700 hover:border-blue-500/40 transition-all"
                            >
                              <h4 className="text-white font-semibold mb-1">
                                {evt.name}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {evt.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {event.network.vendorPartnerParties && (
                      <Card title="Vendor & Partner Parties">
                        <p className="text-gray-300 text-sm leading-relaxed mb-2">
                          <span className="font-semibold text-white">Availability:</span>{" "}
                          {event.network.vendorPartnerParties.availability}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {event.network.vendorPartnerParties.notes}
                        </p>
                      </Card>
                    )}

                    {event.network.meetingOpportunities && (
                      <Card title="Meeting & Deal-Making Opportunities">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                          <div>
                            <h4 className="text-white font-semibold mb-3">
                              Tools & Formats
                            </h4>
                            <ul className="space-y-2">
                              {event.network.meetingOpportunities.tools.map((tool, i) => (
                                <li key={i} className="text-gray-300 text-sm flex gap-2">
                                  <span className="text-blue-400">•</span>
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-white font-semibold mb-3">
                              Strategy Notes
                            </h4>
                            <ul className="space-y-2 text-gray-300 text-sm">
                              <li>
                                <span className="text-green-400">✓</span>{" "}
                                {event.network.meetingOpportunities.preEventOutreach}
                              </li>
                              <li>
                                <span className="text-green-400">✓</span>{" "}
                                {event.network.meetingOpportunities.onSiteMeetings}
                              </li>
                            </ul>
                          </div>

                        </div>
                      </Card>
                    )}

                    {event.network.networkingValueSummary && (
                      <div className="bg-[#0d1117] p-6 rounded-2xl border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Overall Networking Value
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {event.network.networkingValueSummary}
                        </p>
                      </div>
                    )}

                  </div>
                ) : (
                  <EmptyState message="No network information available" />
                )}
              </div>
            )}

            {/* ROI TAB */}
            {activeTab === "roi" && (
              <div className="space-y-8">

                <Card title="Overall ROI Assessment">
                  <p className="text-2xl text-green-400 font-bold">
                    {event.roi_indicators?.overallRoiScore}
                  </p>
                </Card>

                <Card title="Lead Generation Benchmarks">
                  <div className="space-y-3">
                    {event.roi_indicators?.leadGenerationBenchmarks.map((item, i) => (
                      <Stat key={i} label={item.metric} value={item.range} />
                    ))}
                  </div>
                </Card>

                <Card title="Conversion Metrics">
                  <Stat label="Lead → Meeting" value={event.roi_indicators.conversionMetrics.leadToMeeting} />
                  <Stat label="Meeting → Opportunity" value={event.roi_indicators.conversionMetrics.meetingToOpportunity} />
                  <Stat label="Average Deal Size" value={event.roi_indicators.conversionMetrics.averageDealSize} />
                </Card>

                <Card title="ROI Measurement Framework">
                  <p className="text-gray-300 leading-relaxed">
                    {event.roi_indicators.roiCalculationFramework.exampleSummary}
                  </p>
                </Card>

              </div>
            )}


            {/* COST TAB */}
            {activeTab === "costs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Registration Pricing */}
                <Card title="Registration Pricing">
                  <div className="space-y-3">
                    {event.event_cost_analysis.registrationPricing.map((item, i) => (
                      <Stat
                        key={i}
                        label={`${item.ticketType} (${item.deadline})`}
                        value={item.price}
                      />
                    ))}
                  </div>
                </Card>

                {/* Estimated Attendee Budget */}
                <Card title="Estimated Attendee Budget">
                  <div className="space-y-3">
                    {Object.entries(event.event_cost_analysis.attendeeBudgetEstimate).map(
                      ([key, value], i) => (
                        <Stat
                          key={i}
                          label={key.replace(/([A-Z])/g, " $1")}
                          value={value}
                        />
                      )
                    )}
                  </div>
                </Card>

              </div>
            )}


            {activeTab === "logistics" && (
              <div className="space-y-8">

                <Card title="Key Dates & Deadlines">
                  {event.logistics_planning.keyDeadlines.map((d, i) => (
                    <Stat key={i} label={d.milestone} value={d.date} />
                  ))}
                </Card>

                <Card title="Venue & Transportation">
                  <p className="text-gray-300 mb-3">
                    {event.logistics_planning.venueDetails.venueName}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {event.logistics_planning.venueDetails.transportationNotes}
                  </p>
                </Card>

                <Card title="Accommodation Recommendations">
                  <ul className="space-y-2 text-gray-300 text-sm">
                    {event.logistics_planning.accommodationRecommendations.map((tip, i) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                </Card>

                <Card title="Pro Tips for Attendees">
                  <ul className="space-y-2 text-gray-300 text-sm">
                    {event.logistics_planning.proTips.map((tip, i) => (
                      <li key={i}>✓ {tip}</li>
                    ))}
                  </ul>
                </Card>

              </div>
            )}

            {/* STRATEGIC FIT TAB */}
            {activeTab === "strategic" && (
              <div className="space-y-8">

                <Card title="Ideal For">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                    {event.strategic_fit_assessment.idealFor.map((item, i) => (
                      <li key={i}>✓ {item}</li>
                    ))}
                  </ul>
                </Card>

                <Card title="Not Recommended For">
                  <ul className="space-y-2 text-sm text-gray-300">
                    {event.strategic_fit_assessment.notRecommendedFor.map((item, i) => (
                      <li key={i}>⚠ {item}</li>
                    ))}
                  </ul>
                </Card>

                <Card title="Objective Fit Scorecard">
                  <div className="space-y-4">
                    {[...event.strategic_fit_assessment.objectivesBestServed]
                      .map((obj) => {
                        // Normalize score to percentage
                        let percent = 0;

                        if (typeof obj.score === "number") {
                          percent = Math.min(obj.score, 100);
                        } else if (typeof obj.score === "string" && obj.score.includes("/")) {
                          const [val, total] = obj.score.split("/").map(Number);
                          percent = total ? (val / total) * 100 : 0;
                        }

                        return { ...obj, percent };
                      })
                      .sort((a, b) => b.percent - a.percent)
                      .map((obj, i) => (
                        <div key={i} className="space-y-2">
                          {/* Label + Score */}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{obj.objective}</span>
                            <span className="text-blue-400 font-medium">
                              {obj.score}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                              style={{ width: `${obj.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>


                <Card title="Final Recommendation">
                  <p className="text-gray-300 leading-relaxed">
                    {event.strategic_fit_assessment.finalRecommendation}
                  </p>
                </Card>

              </div>
            )}

            {/* INSIGHTS TAB */}
            {activeTab === "insights" && (
              <div>
                {event.insights ? (
                  <div className="space-y-8">

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

                    {event.insights.topCompanies && (
                      <Card title="Top Attending Companies">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {event.insights.topCompanies.map((company, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-4 bg-[#0d1117] rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all"
                            >
                              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-blue-400 font-bold">{i + 1}</span>
                              </div>
                              <span className="text-gray-300 truncate">{company}</span>
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

            {/* GTM INTELLIGENCE TAB */}
            {activeTab === "gtm" && (
              <div>
                {event.gtm_intelligence ? (
                  <div className="space-y-8">

                    {event.gtm_intelligence.ideal_personas && (
                      <Card title="Ideal Target Personas">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {event.gtm_intelligence.ideal_personas.map((persona, i) => (
                            <span
                              key={i}
                              className="px-3 py-2 bg-blue-500/10 text-blue-300 rounded-lg text-sm border border-blue-500/20 text-center"
                            >
                              {persona}
                            </span>
                          ))}
                        </div>
                      </Card>
                    )}

                    {event.gtm_intelligence.why_attend && (
                      <Card title="Why Attend This Event">
                        <p className="text-gray-300 leading-relaxed">
                          {event.gtm_intelligence.why_attend}
                        </p>
                      </Card>
                    )}

                    {event.gtm_intelligence.best_fit_companies && (
                      <Card title="Best Fit Companies">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                          <div>
                            <h4 className="text-white font-semibold mb-3">Industries</h4>
                            <ul className="space-y-2">
                              {event.gtm_intelligence.best_fit_companies.industries.map((item, i) => (
                                <li key={i} className="text-gray-300 text-sm flex gap-2">
                                  <span className="text-blue-400">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-white font-semibold mb-3">Company Size</h4>
                            <ul className="space-y-2">
                              {event.gtm_intelligence.best_fit_companies.company_size.map((item, i) => (
                                <li key={i} className="text-gray-300 text-sm flex gap-2">
                                  <span className="text-blue-400">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-white font-semibold mb-3">Business Models</h4>
                            <ul className="space-y-2">
                              {event.gtm_intelligence.best_fit_companies.business_models.map((item, i) => (
                                <li key={i} className="text-gray-300 text-sm flex gap-2">
                                  <span className="text-blue-400">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </Card>
                    )}

                    {event.gtm_intelligence.reasons_to_skip && (
                      <Card title="Reasons This Event May Not Be a Fit">
                        <ul className="space-y-3">
                          {event.gtm_intelligence.reasons_to_skip.map((reason, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300">
                              <span className="text-red-400 mt-1">⚠</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    )}

                  </div>
                ) : (
                  <EmptyState message="No GTM intelligence available" />
                )}
              </div>
            )}


          </div>
        </div>
      )}
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
    <h2 className="text-xl font-bold text-white mb-5">{title}</h2>
    {children}
  </div>
);

const Stat = ({ label, value }) => {
  return (
    <div className="flex items-start gap-6 border-b border-white/10 pb-3">
      <div className="w-32 text-sm text-gray-400 shrink-0">
        {label}
      </div>

      <div className="text-sm text-white font-medium leading-relaxed">
        {value}
      </div>
    </div>
  );
};

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
      <span className="text-gray-600 text-2xl">📋</span>
    </div>
    <p className="text-gray-500">{message}</p>
  </div>
);

export default EventDetails;