import { Routes, Route, Navigate } from "react-router-dom";
import Employees from "../pages/Employees";
import Layout from "../components/layout/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/employees" />} />
        <Route path="/employees" element={<Employees />} />
      </Route>
    </Routes>
  );
}
