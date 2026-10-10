function StudentTable({ students, onView, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎓</div>
        <p>No students found. Add a student to get started.</p>
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
            <th>Year</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.rollNo}</td>
              <td><strong>{student.name}</strong></td>
              <td>{student.department}</td>
              <td>{student.year}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <button className="btn btn-small btn-light" onClick={() => onView(student)}>👁 View</button>
                <button className="btn btn-small btn-green" onClick={() => onEdit(student)}>✏️ Edit</button>
                <button className="btn btn-small btn-red" onClick={() => onDelete(student)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;