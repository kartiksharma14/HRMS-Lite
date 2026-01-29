import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const title =
    location.pathname === "/attendance" ? "Attendance" : "Employees";

  return <h1 className="page-title">{title}</h1>;
}
