import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">HRMS Lite</h2>

      <nav>
        <NavLink to="/employees">Employees</NavLink>
      </nav>
    </aside>
  );
}
