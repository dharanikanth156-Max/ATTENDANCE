import StatCard from "../components/StatCard";

function Dashboard({ students, attendance }) {
  const dates = Object.keys(attendance).sort();
  const latestDate = dates[dates.length - 1];
  const latest = latestDate ? attendance[latestDate] : {};

  const presentCount = students.filter((s) => latest[s.id] === "Present").length;
  const absentCount = students.filter((s) => latest[s.id] === "Absent").length;

  // Overall attendance percentage across all dates
  let totalMarks = 0;
  let totalPresent = 0;
  dates.forEach((date) => {
    students.forEach((s) => {
      const status = attendance[date][s.id];
      if (status) {
        totalMarks++;
        if (status === "Present") totalPresent++;
      }
    });
  });
  const percentage = totalMarks ? Math.round((totalPresent / totalMarks) * 100) : 0;

  // Last 5 days summary
  const recentDates = [...dates].reverse().slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>
            {latestDate
              ? `Showing latest attendance: ${latestDate}`
              : "No attendance has been marked yet"}
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Students" value={students.length} icon="🎓" />
        <StatCard title="Present Students" value={presentCount} icon="✅" color="green" />
        <StatCard title="Absent Students" value={absentCount} icon="❌" color="red" />
        <StatCard title="Overall Attendance" value={`${percentage}%`} icon="📈" color="orange" />
      </div>

      <div className="card">
        <h3>Recent Attendance Summary</h3>
        {recentDates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No attendance records yet. Go to "Mark Attendance" to add one.</p>
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
                {recentDates.map((date) => {
                  const p = students.filter((s) => attendance[date][s.id] === "Present").length;
                  const a = students.filter((s) => attendance[date][s.id] === "Absent").length;
                  const total = p + a;
                  const pct = total ? Math.round((p / total) * 100) : 0;
                  return (
                    <tr key={date}>
                      <td><strong>{date}</strong></td>
                      <td><span className="badge present">{p}</span></td>
                      <td><span className="badge absent">{a}</span></td>
                      <td>
                        <div className="progress">
                          <div className="progress-fill" style={{ width: `${pct}%` }}></div>
                        </div>
                        {pct}%
                      </td>
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

export default Dashboard;