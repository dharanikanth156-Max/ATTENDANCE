// Used for marking attendance (editable) and viewing records (readOnly)
function AttendanceTable({ students, records, onChange, readOnly }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p>No students to show.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            const status = records[student.id];
            return (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.rollNo}</td>
                <td><strong>{student.name}</strong></td>
                <td>{student.department}</td>
                <td>
                  {readOnly ? (
                    <span className={`badge ${status ? status.toLowerCase() : "none"}`}>
                      {status || "Not Marked"}
                    </span>
                  ) : (
                    <>
                      <button
                        className={status === "Present" ? "status-btn present active" : "status-btn present"}
                        onClick={() => onChange(student.id, "Present")}
                      >
                        Present
                      </button>
                      <button
                        className={status === "Absent" ? "status-btn absent active" : "status-btn absent"}
                        onClick={() => onChange(student.id, "Absent")}
                      >
                        Absent
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;