import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

const Onboarding = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-gray-200">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
          <span className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
            AI-Powered Event Intelligence Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Understand Events.
            <br />
            <span className="text-blue-400">Outperform with Intelligence.</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
            <strong className="text-gray-200">MyEventsIQ</strong> helps businesses,
            GTM teams, and decision-makers analyze tech & industry events to
            uncover opportunities, audience insights, and strategic value —
            before investing time or money.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={()=>navigate('/contact')}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-3 bg-transparent border border-gray-700 hover:border-blue-500/50 text-gray-300 rounded-xl transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* WHAT IS MYEVENTSIQ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              What is MyEventsIQ?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              MyEventsIQ is an <span className="text-blue-400">AI-driven event intelligence platform</span>
              that transforms raw event information into actionable insights.
              Instead of guessing which events matter, we help you understand
              <strong className="text-gray-200"> who attends, why it matters, and how it aligns with your business goals</strong>.
            </p>
            <p className="text-gray-400 leading-relaxed">
              From global tech conferences to niche industry meetups, MyEventsIQ
              gives you clarity on event value — powered by structured data,
              GTM intelligence, and audience analysis.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoCard title="AI-Curated Events" value="Smartly analyzed & structured" />
            <InfoCard title="Audience Insights" value="Know who actually attends" />
            <InfoCard title="GTM Intelligence" value="Perfect ICP & personas" />
            <InfoCard title="Decision Ready" value="Attend, sponsor, or skip" />
          </div>
        </div>
      </section>

      {/* HOW IT HELPS */}
      <section className="bg-[#0d1117] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white text-center mb-14">
            How MyEventsIQ Helps Teams
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="For Business Leaders"
              points={[
                "Evaluate ROI before attending or sponsoring",
                "Understand audience buying power",
                "Align events with company strategy",
              ]}
            />

            <FeatureCard
              title="For GTM & Sales Teams"
              points={[
                "Identify ideal personas & ICP fit",
                "Target events with high-intent audiences",
                "Plan outreach before the event starts",
              ]}
            />

            <FeatureCard
              title="For Marketing Teams"
              points={[
                "Choose events that match brand goals",
                "Discover top attending companies",
                "Optimize sponsorship & booth strategy",
              ]}
            />
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-14">
          What You Can Do With MyEventsIQ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UseCase
            title="Event Evaluation"
            description="Decide whether an event is worth attending, sponsoring, or skipping — based on real data."
          />
          <UseCase
            title="Audience Intelligence"
            description="Understand roles, seniority, industries, and buying influence of attendees."
          />
          <UseCase
            title="Competitive Awareness"
            description="See which companies and competitors are actively participating."
          />
          <UseCase
            title="Strategic Planning"
            description="Align your event strategy with revenue, partnerships, and growth goals."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Know If an Event Is Worth It — Before You Attend
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Analyze ROI, audience quality, and GTM fit in minutes.
            Make confident, data-backed decisions about where your time,
            team, and budget should go.
          </p>

          <div className="flex sm:flex-row justify-center gap-4">
            {/* Primary CTA */}
            {
              localStorage.getItem('isLoggedIn') == 'true'
                ?
                <NavLink
                  to='/events'
                  className="
                    px-10 py-4 bg-blue-500 hover:bg-blue-600
                    text-white font-semibold rounded-xl
                    transition-all shadow-lg shadow-blue-500/20
                  "
                >
                  View Event Intelligence
                </NavLink>
                :
                <NavLink
                  to='/events'
                  className="
                    px-10 py-4 bg-blue-500 hover:bg-blue-600
                    text-white font-semibold rounded-xl
                    transition-all shadow-lg shadow-blue-500/20
                  "
                >
                  Analyze an Event
                </NavLink>
            }
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const InfoCard = ({ title, value }) => (
  <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
    <h4 className="text-white font-semibold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{value}</p>
  </div>
);

const FeatureCard = ({ title, points }) => (
  <div className="bg-[#111827] p-8 rounded-xl border border-gray-800 hover:border-blue-500/40 transition-all">
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <ul className="space-y-3">
      {points.map((point, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
          <span className="text-blue-400 mt-1">✓</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

const UseCase = ({ title, description }) => (
  <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 hover:border-blue-500/40 transition-all">
    <h4 className="text-lg font-semibold text-white mb-3">{title}</h4>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default Onboarding;
