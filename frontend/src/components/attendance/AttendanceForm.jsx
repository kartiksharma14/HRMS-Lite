import { useState } from "react";
import { markAttendance } from "../../services/api";

export default function AttendanceForm({
  employeeId,
  onSuccess,
  onFilter,
}) {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await markAttendance({ employee_id: employeeId, date, status });
    onSuccess();
  }

    function handleFilter(e) {
    e.preventDefault();
    if (!onFilter) return;

    onFilter({
        start_date: startDate || undefined,
        end_date: endDate || undefined,
    });
    }


  return (
    <>
      {/* 🔹 MARK ATTENDANCE (PRIMARY) */}
      <form onSubmit={handleSubmit} className="card">
        <h4>Mark Attendance</h4>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">Save</button>
      </form>

      {/* 🔹 FILTER ATTENDANCE (SECONDARY) */}
      <form onSubmit={handleFilter} className="card">
        <h4>Filter Attendance</h4>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button type="submit">Apply Filter</button>
      </form>
    </>
  );
}
