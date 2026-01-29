import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* =========================
   EMPLOYEES
========================= */

export async function fetchEmployees() {
  const res = await api.get("/employees");
  return res.data;
}

export async function createEmployee(payload) {
  const res = await api.post("/employees", payload);
  return res.data;
}

export async function deleteEmployee(id) {
  await api.delete(`/employees/${id}`);
}

/* =========================
   ATTENDANCE
========================= */

export async function fetchAttendance(employeeId, params = {}) {
  const res = await api.get(`/attendance/${employeeId}`, { params });
  return res.data;
}


export async function markAttendance(payload) {
  const res = await api.post("/attendance", payload);
  return res.data;
}

// Future use (edit attendance)
export async function updateAttendance(id, payload) {
  const res = await api.put(`/attendance/${id}`, payload);
  return res.data;
}
