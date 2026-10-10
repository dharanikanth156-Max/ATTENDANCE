import { useState } from "react";
import SearchBar from "../components/SearchBar";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

function Students({ students, onAdd, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);

  const filteredStudents = students.filter((s) => {
    const text = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(text) ||
      s.rollNo.toLowerCase().includes(text) ||
      s.department.toLowerCase().includes(text) ||
      s.email.toLowerCase().includes(text)
    );
  });

  const handleAddClick = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = (student) => {
    const ok = window.confirm(`Are you sure you want to delete ${student.name}? Their attendance will also be removed.`);
    if (ok) onDelete(student.id);
  };

  const handleSubmit = (data) => {
    if (editingStudent) {
      onUpdate(data);
    } else {
      onAdd(data);
    }
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Students</h2>
          <p>Manage all student information</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddClick}>➕ Add Student</button>
      </div>

      <div className="card">
        <div className="toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name, roll no, department..."
          />
          <span className="badge none">{filteredStudents.length} students</span>
        </div>

        <StudentTable
          students={filteredStudents}
          onView={setViewStudent}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {showForm && (
        <StudentForm
          students={students}
          editingStudent={editingStudent}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {viewStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>🎓 Student Details</h3>
            <div className="detail-grid">
              <div><span>Roll Number</span><strong>{viewStudent.rollNo}</strong></div>
              <div><span>Name</span><strong>{viewStudent.name}</strong></div>
              <div><span>Department</span><strong>{viewStudent.department}</strong></div>
              <div><span>Year</span><strong>{viewStudent.year}</strong></div>
              <div><span>Email</span><strong>{viewStudent.email}</strong></div>
              <div><span>Phone</span><strong>{viewStudent.phone}</strong></div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => setViewStudent(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;