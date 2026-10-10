import { useState } from "react";
import StatCard from "../components/StatCard";
import SearchBar from "../components/SearchBar";

function Reports({ students, attendance }) {
  const [search, setSearch] = useState("");

  const dates = Object.keys(attendance).sort().reverse();

  // Calculate report for each student
  const report = students.map((student) => {
    let present = 0;
    let absent = 0;
    dates.forEach((date) => {
      const status = attendance[date][student.id];
      if (status === "Present") present++;
      if (status === "Absent") absent++;
    });
    const total = present + absent;
    const percentage = total ? Math.round((present / total) * 100) : 0;
    return { ...student, present, absent, total, percentage };
  });

  const filteredReport = report.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  const average = report.length
    ? Math.round(report.reduce((sum, r) => sum + r.percentage, 0) / report.length)
    : 0;
  const goodCount = report.filter((r) => r.total > 0 && r.percentage >= 75).length;
  const lowCount = report.filter((r) => r.total > 0 && r.percentage < 75).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Reports</h2>
          <p>Attendance percentages and summaries (75% minimum required)</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Working Days" value={dates.length} icon="📅" />
        <StatCard title="Average Attendance" value={`${average}%`} icon="📈" color="orange" />
        <StatCard title="Above 75%" value={goodCount} icon="🏆" color="green" />
        <StatCard title="Below 75%" value={lowCount} icon="⚠️" color="red" />
      </div>

      <div className="card">
        <h3>Student-wise Report</h3>
        <div className="toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search student..." />
        </div>

        {filteredReport.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No students found.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Total</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReport.map((r) => (
                  <tr key={r.id}>
                    <td>{r.rollNo}</td>
                    <td><strong>{r.name}</strong></td>
                    <td>{r.present}</td>
                    <td>{r.absent}</td>
                    <td>{r.total}</td>
                    <td>
                      <div className="progress">
                        <div
                          className={r.percentage < 75 ? "progress-fill low" : "progress-fill"}
                          style={{ width: `${r.percentage}%` }}
                        ></div>
                      </div>
                      {r.percentage}%
                    </td>
                    <td>
                      {r.total === 0 ? (
                        <span className="badge none">No data</span>
                      ) : r.percentage >= 75 ? (
                        <span className="badge present">Good</span>
                      ) : (
                        <span className="badge absent">Shortage</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Date-wise Summary</h3>
        {dates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No attendance data available.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {dates.map((date) => {
                  const p = students.filter((s) => attendance[date][s.id] === "Present").length;
                  const a = students.filter((s) => attendance[date][s.id] === "Absent").length;
                  const total = p + a;
                  const pct = total ? Math.round((p / total) * 100) : 0;
                  return (
                    <tr key={date}>
                      <td><strong>{date}</strong></td>
                      <td><span className="badge present">{p}</span></td>
                      <td><span className="badge absent">{a}</span></td>
                      <td>{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;