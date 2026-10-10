import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import AttendanceTable from "../components/AttendanceTable";

// Returns today's date as YYYY-MM-DD (local time)
function getToday() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function MarkAttendance({ students, attendance, onSave }) {
  const [date, setDate] = useState(getToday());
  const [records, setRecords] = useState({});
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load existing attendance when the date changes
  useEffect(() => {
    setRecords(attendance[date] || {});
  }, [date, attendance]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setMessage("");
    setError("");
  };

  const handleStatusChange = (studentId, status) => {
    setRecords({ ...records, [studentId]: status });
    setMessage("");
    setError("");
  };

  const markAll = (status) => {
    const all = {};
    students.forEach((s) => {
      all[s.id] = status;
    });
    setRecords(all);
    setMessage("");
    setError("");
  };

  const handleSave = () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }
    if (students.length === 0) {
      setError("There are no students to mark.");
      return;
    }
    const unmarked = students.filter((s) => !records[s.id]).length;
    if (unmarked > 0) {
      setError(`${unmarked} student(s) are not marked yet. Please mark everyone.`);
      return;
    }

    const finalRecords = {};
    students.forEach((s) => {
      finalRecords[s.id] = records[s.id];
    });
    onSave(date, finalRecords);
    setError("");
    setMessage(`Attendance for ${date} saved successfully!`);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = students.filter((s) => records[s.id] === "Present").length;
  const absentCount = students.filter((s) => records[s.id] === "Absent").length;
  const unmarkedCount = students.length - presentCount - absentCount;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Mark Attendance</h2>
          <p>Select a date and mark each student Present or Absent</p>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="select-input"
              value={date}
              max={getToday()}
              onChange={handleDateChange}
            />
          </div>
          <SearchBar value={search} onChange={setSearch} placeholder="Search student..." />
          <button className="btn btn-green" onClick={() => markAll("Present")}>✅ All Present</button>
          <button className="btn btn-red" onClick={() => markAll("Absent")}>❌ All Absent</button>
        </div>

        <div className="summary-row">
          <span className="badge present">Present: {presentCount}</span>
          <span className="badge absent">Absent: {absentCount}</span>
          <span className="badge none">Not marked: {unmarkedCount}</span>
        </div>

        {message && <div className="alert success">{message}</div>}
        {error && <div className="alert error">{error}</div>}

        <AttendanceTable
          students={filteredStudents}
          records={records}
          onChange={handleStatusChange}
          readOnly={false}
        />

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSave}>💾 Save Attendance</button>
        </div>
      </div>
    </div>
  );
}

export default MarkAttendance;