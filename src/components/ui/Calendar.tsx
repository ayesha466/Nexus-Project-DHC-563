import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Custom wrapper for dark/cyan theme
const CalendarComponent: React.FC = () => {
  const [editingIdx, setEditingIdx] = React.useState<number | null>(null);
  const [editTime, setEditTime] = React.useState('10:00');
  const [date, setDate] = React.useState<Date>(new Date());

  // Handle calendar change safely
  const handleCalendarChange = (value: Date | Date[] | null) => {
    if (value && value instanceof Date) {
      setDate(value);
    }
  };
  // Load slots from localStorage
  const [slots, setSlots] = React.useState<{ date: Date; time: string }[]>(() => {
    const saved = localStorage.getItem('calendar_slots');
    if (saved) {
      try {
        return JSON.parse(saved).map((s: any) => ({ ...s, date: new Date(s.date) }));
      } catch {
        return [];
      }
    }
    return [];
  });
  // Load requests from localStorage
  const [requests, setRequests] = React.useState<{ id: string; date: Date; time: string; status: 'pending' | 'accepted' | 'declined' }[]>(() => {
    const saved = localStorage.getItem('calendar_requests');
    if (saved) {
      try {
        return JSON.parse(saved).map((r: any) => ({ ...r, date: new Date(r.date) }));
      } catch {
        return [];
      }
    }
    return [];
  });

  // Save slots and requests to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('calendar_slots', JSON.stringify(slots));
  }, [slots]);
  React.useEffect(() => {
    localStorage.setItem('calendar_requests', JSON.stringify(requests));
  }, [requests]);
  const [selectedTime, setSelectedTime] = React.useState('10:00');

  // Add slot
  const handleAddSlot = () => {
    setSlots([...slots, { date, time: selectedTime }]);
  };

  // Edit slot
  const handleEditSlot = (idx: number) => {
    setEditingIdx(idx);
    setEditTime(slots[idx].time);
  };

  const handleSaveEditSlot = (idx: number) => {
    const updatedSlots = [...slots];
    updatedSlots[idx] = { ...updatedSlots[idx], time: editTime };
    setSlots(updatedSlots);
    setEditingIdx(null);
  };

  // Delete slot
  const handleDeleteSlot = (idx: number) => {
    setSlots(slots.filter((_, i) => i !== idx));
    if (editingIdx === idx) setEditingIdx(null);
  };

  // Simulate sending a meeting request
  const handleSendRequest = (slot: { date: Date; time: string }) => {
    setRequests([
      ...requests,
      {
        id: Math.random().toString(36).substr(2, 9),
        date: slot.date,
        time: slot.time,
        status: 'pending',
      },
    ]);
  };

  // Accept/decline meeting request
  const handleUpdateRequest = (id: string, status: 'accepted' | 'declined') => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6 rounded-2xl shadow-2xl max-w-lg mx-auto border border-gray-800">
      <h2 className="text-cyan-400 text-3xl font-heading mb-6 text-center tracking-wide">Meeting Calendar</h2>
      <Calendar
        onChange={handleCalendarChange}
        value={date}
        className="calendar-dark rounded-xl mb-6"
      />
      <div className="flex flex-col md:flex-row items-center gap-12 mb-9">
        <div className="flex flex-col">
          <label className="block text-gray-200 mb-2 font-semibold">Select time:</label>
          <select
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            className="bg-gray-900 text-cyan-300 p-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="10:00">10:00</option>
            <option value="12:00">12:00</option>
            <option value="14:00">14:00</option>
            <option value="16:00">16:00</option>
          </select>
        </div>
        <button
          className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-bold shadow transition"
          onClick={handleAddSlot}
        >
          Add Availability Slot
        </button>
      </div>
      <div className="mt-6 bg-gray-800 rounded-xl p-4 shadow mb-6">
        <h3 className="text-xl text-cyan-300 mb-4 font-semibold">Your Availability Slots</h3>
        <ul>
          {slots.length === 0 && <li className="text-gray-400">No slots added yet.</li>}
          {slots.map((slot, idx) => (
            <li key={idx} className="mb-3 text-gray-100 flex flex-col md:flex-row justify-between items-center gap-2">
              <span>{slot.date.toDateString()} at {editingIdx === idx ? (
                <select
                  value={editTime}
                  onChange={e => setEditTime(e.target.value)}
                  className="bg-gray-900 text-cyan-300 p-1 rounded border border-gray-700 ml-2"
                >
                  <option value="10:00">10:00</option>
                  <option value="12:00">12:00</option>
                  <option value="14:00">14:00</option>
                  <option value="16:00">16:00</option>
                </select>
              ) : slot.time}</span>
              <div className="flex gap-2">
                <button
                  className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
                  onClick={() => handleSendRequest(slot)}
                >Send Meeting Request</button>
                {editingIdx === idx ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded font-semibold"
                    onClick={() => handleSaveEditSlot(idx)}
                  >Save</button>
                ) : (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-2 py-1 rounded font-semibold"
                    onClick={() => handleEditSlot(idx)}
                  >Edit</button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded font-semibold"
                  onClick={() => handleDeleteSlot(idx)}
                >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 bg-gray-800 rounded-xl p-4 shadow mb-6">
        <h3 className="text-xl text-cyan-300 mb-4 font-semibold">Meeting Requests</h3>
        <ul>
          {requests.length === 0 && <li className="text-gray-400">No meeting requests yet.</li>}
          {requests.map(request => (
            <li key={request.id} className="mb-3 text-gray-100 flex justify-between items-center">
              <span>{request.date.toDateString()} at {request.time} -
                <span className="ml-2 font-bold text-cyan-400">{request.status}</span>
              </span>
              {request.status === 'pending' && (
                <span>
                  <button
                    className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg font-semibold shadow"
                    onClick={() => handleUpdateRequest(request.id, 'accepted')}
                  >Accept</button>
                  <button
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-semibold shadow"
                    onClick={() => handleUpdateRequest(request.id, 'declined')}
                  >Decline</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 bg-gray-800 rounded-xl p-4 shadow">
        <h3 className="text-xl text-cyan-300 mb-4 font-semibold">Confirmed Meetings</h3>
        <ul>
          {requests.filter(r => r.status === 'accepted').length === 0 && <li className="text-gray-400">No confirmed meetings yet.</li>}
          {requests.filter(r => r.status === 'accepted').map(request => (
            <li key={request.id} className="mb-3 text-gray-100">
              {request.date.toDateString()} at {request.time}
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .calendar-dark {
          background: #80837eff;
          color: #f3f4f6;
          border-radius: 0.75rem;
          border: 1px solid #222;
          box-shadow: 0 2px 16px 0 #000a;
        }
        .calendar-dark .react-calendar__tile--active {
          background: #06b6d4;
          color: #18181b;
        }
        .calendar-dark .react-calendar__tile {
          background: #23272f;
          color: #f3f4f6;
        }
        .calendar-dark .react-calendar__month-view__days__day--weekend {
          color: #5cafe6ff;
        }
        .calendar-dark .react-calendar__navigation button {
          color: #f3f4f6;
          background: #23272f;
        }
      `}</style>
    </div>
  );
};

export default CalendarComponent;
