import { useNavigate } from "react-router-dom";
import { MapPin, Users, Briefcase } from "lucide-react";

const parseDateString = (dateStr) => {
  if (!dateStr) return { month: null, year: null, day: null };

  const parts = dateStr.split(" ");
  const month = parts[0]; 
  const year = parts[parts.length - 1]; 

  const dayPart = parts[1]?.replace(",", "");
  const day = dayPart || null;

  return { month, year, day };
};


const getMonthNum = (monthName) => {
  const months = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };
  return months[monthName] ?? -1;
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const date = new Date();
  const currentMonth = date.getMonth();
  
  const { month, year, day } = parseDateString(event.date);

  return (
    <div className="min-w-[300px] max-w-[300px] bg-[#0d0f16] rounded-2xl shadow-xl overflow-hidden border border-[#1c1f27] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

      <div className="relative h-40 w-full">
        <img
          src={event.image || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"}
          alt="event-banner"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

        {day ? (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md rounded-lg px-3 py-2 text-center">
            <p className="text-white text-xs">{day}</p>
            <p className="text-white font-bold text-lg leading-none">{month}</p>
            <p className="text-gray-300 text-xs">{year}</p>
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md rounded-lg px-3 py-2 text-center">
            <p className="text-white font-bold text-lg leading-none">{month}</p>
            <p className="text-gray-300 text-xs">{year}</p>
          </div>
        )}

        {month && getMonthNum(month) === currentMonth && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            🔥 Hot
          </div>
        )}
      </div>

      <div className="p-5 text-white">

        <h2 className="text-lg font-semibold leading-tight mb-1">
          {event.title}
        </h2>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {event.overview?.about?.slice(0, 90) || event.description?.slice(0, 90)}...
        </p>

        <div className="flex items-center gap-2 text-gray-300 text-sm mb-1">
          <MapPin size={14} /> {event.location || event.city || "N/A"}
        </div>

        <div className="flex items-center gap-2 text-gray-300 text-sm mb-1">
          <Users size={14} /> {event.registeredUsersCount || event.overview?.highlights?.attendees || "N/A"}
        </div>

        <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
          <Briefcase size={14} /> 
          {event.overview?.shouldAttend?.[0]?.slice(0, 30) || "N/A"}...
        </div>

        <div className="flex gap-2 text-xs text-gray-300 mb-4">
          {event.domains?.[0] && <span className="font-medium">{event.domains[0]}</span>}
          {event.domains?.[1] && <span className="font-medium">{event.domains[1]}</span>}
          {event.domains?.length > 2 && <span className="font-medium">+{event.domains.length - 2}</span>}
        </div>

        <button
          onClick={() => navigate(`/events/${event._id.$oid || event._id}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-2 rounded-xl text-sm font-medium shadow-lg"
        >
          View Insights →
        </button>
      </div>
    </div>
  );
};

export default EventCard;