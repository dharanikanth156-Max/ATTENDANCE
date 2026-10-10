import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import MarkAttendance from "./pages/MarkAttendance";
import AttendanceRecords from "./pages/AttendanceRecords";
import Reports from "./pages/Reports";

const STUDENTS_KEY = "sas_students";
const ATTENDANCE_KEY = "sas_attendance";

// Sample students (used only the first time the app runs)
const sampleStudents = [
  { id: "1", rollNo: "CS001", name: "Aarav Kumar", department: "CSE", year: "3", email: "aarav@college.edu", phone: "9876543210" },
  { id: "2", rollNo: "CS002", name: "Dhanya Lakshmi", department: "CSE", year: "3", email: "dhanya@college.edu", phone: "9876543211" },
  { id: "3", rollNo: "CS003", name: "Karthik Raj", department: "CSE", year: "3", email: "karthik@college.edu", phone: "9876543212" },
  { id: "4", rollNo: "CS004", name: "Meera Nair", department: "CSE", year: "3", email: "meera@college.edu", phone: "9876543213" },
  { id: "5", rollNo: "CS005", name: "Rohit Sharma", department: "CSE", year: "3", email: "rohit@college.edu", phone: "9876543214" },
  { id: "6", rollNo: "CS006", name: "Sneha Iyer", department: "CSE", year: "3", email: "sneha@college.edu", phone: "9876543215" },
];

// Attendance format: { "date": { studentId: "Present" | "Absent" } }
const sampleAttendance = {
  "2026-10-05": { 1: "Present", 2: "Present", 3: "Absent", 4: "Present", 5: "Present", 6: "Present" },
  "2026-10-06": { 1: "Present", 2: "Absent", 3: "Present", 4: "Present", 5: "Absent", 6: "Present" },
  "2026-10-07": { 1: "Present", 2: "Present", 3: "Present", 4: "Absent", 5: "Present", 6: "Present" },
};

// Load data from LocalStorage (or use default data)
function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

function App() {
  const [students, setStudents] = useState(() => loadData(STUDENTS_KEY, sampleStudents));
  const [attendance, setAttendance] = useState(() => loadData(ATTENDANCE_KEY, sampleAttendance));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));
  }, [attendance]);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now().toString() }]);
  };

  const updateStudent = (updated) => {
    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    // Also remove this student's attendance
    const cleaned = {};
    for (const date in attendance) {
      const copy = { ...attendance[date] };
      delete copy[id];
      cleaned[date] = copy;
    }
    setAttendance(cleaned);
  };

  const saveAttendance = (date, records) => {
    setAttendance({ ...attendance, [date]: records });
  };

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard students={students} attendance={attendance} />} />
            <Route
              path="/students"
              element={
                <Students
                  students={students}
                  onAdd={addStudent}
                  onUpdate={updateStudent}
                  onDelete={deleteStudent}
                />
              }
            />
            <Route
              path="/mark-attendance"
              element={<MarkAttendance students={students} attendance={attendance} onSave={saveAttendance} />}
            />
            <Route
              path="/records"
              element={<AttendanceRecords students={students} attendance={attendance} />}
            />
            <Route path="/reports" element={<Reports students={students} attendance={attendance} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;