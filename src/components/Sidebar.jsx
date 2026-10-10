import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/students", label: "Students", icon: "🎓" },
  { to: "/mark-attendance", label: "Mark Attendance", icon: "✅" },
  { to: "/records", label: "Attendance Records", icon: "📋" },
  { to: "/reports", label: "Reports", icon: "📈" },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <aside className={isOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar-logo">
          <span>🏫</span>
          <h2>EduTrack</h2>
        </div>

        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={onClose}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </>
  );
}

export default Sidebar;