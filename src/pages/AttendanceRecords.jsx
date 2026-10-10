import { useState } from "react";
import SearchBar from "../components/SearchBar";
import AttendanceTable from "../components/AttendanceTable";

function AttendanceRecords({ students, attendance }) {
  const [mode, setMode] = useState("date"); // "date" or "student"
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [search, setSearch] = useState("");

  const dates = Object.keys(attendance).sort().reverse();

  // Use first item by default
  const activeDate = selectedDate || dates[0];
  const activeStudentId = selectedStudentId || (students[0] ? students[0].id : "");
  const activeStudent = students.find((s) => s.id === activeStudentId);

  const dateRecords = activeDate ? attendance[activeDate] || {} : {};
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  const presentOnDate = students.filter((s) => dateRecords[s.id] === "Present").length;
  const absentOnDate = students.filter((s) => dateRecords[s.id] === "Absent").length;

  const studentRows = dates
    .filter((d) => activeStudent && attendance[d][activeStudent.id])
    .map((d) => ({ date: d, status: attendance[d][activeStudent.id] }));

  const studentPresent = studentRows.filter((r) => r.status === "Present").length;
  const studentAbsent = studentRows.length - studentPresent;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Attendance Records</h2>
          <p>View attendance by date or by student</p>
        </div>
        <div className="tabs">
          <button className={mode === "date" ? "tab active" : "tab"} onClick={() => setMode("date")}>
            📅 By Date
          </button>
          <button className={mode === "student" ? "tab active" : "tab"} onClick={() => setMode("student")}>
            🎓 By Student
          </button>
        </div>
      </div>

      {dates.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No attendance records found. Mark attendance first.</p>
          </div>
        </div>
      ) : mode === "date" ? (
        <div className="card">
          <div className="toolbar">
            <div className="form-group">
              <label>Select Date</label>
              <select
                className="select-input"
                value={activeDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {dates.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <SearchBar value={search} onChange={setSearch} placeholder="Search student..." />
          </div>

          <div className="summary-row">
            <span className="badge present">Present: {presentOnDate}</span>
            <span className="badge absent">Absent: {absentOnDate}</span>
          </div>

          <AttendanceTable students={filteredStudents} records={dateRecords} readOnly={true} />
        </div>
      ) : (
        <div className="card">
          <div className="toolbar">
            <div className="form-group">
              <label>Select Student</label>
              <select
                className="select-input"
                value={activeStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.rollNo} - {s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="summary-row">
            <span className="badge present">Present: {studentPresent}</span>
            <span className="badge absent">Absent: {studentAbsent}</span>
            <span className="badge none">Total days: {studentRows.length}</span>
          </div>

          {studentRows.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No attendance records for this student.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentRows.map((row, index) => (
                    <tr key={row.date}>
                      <td>{index + 1}</td>
                      <td>{row.date}</td>
                      <td>
                        <span className={`badge ${row.status.toLowerCase()}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AttendanceRecords;