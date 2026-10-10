function Navbar({ onMenuClick }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick}>☰</button>
        <h1>Student Attendance System</h1>
      </div>
      <div className="navbar-right">
        <span className="navbar-date">📅 {today}</span>
        <div className="avatar">A</div>
      </div>
    </header>
  );
}

export default Navbar;