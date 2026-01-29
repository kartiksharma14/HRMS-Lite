const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function fetchEmployees() {
  const res = await fetch(`${API_BASE_URL}/api/employees`);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}

export async function createEmployee(payload) {
  const res = await fetch(`${API_BASE_URL}/api/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to create employee");
  }

  return res.json();
}

export async function deleteEmployee(id) {
  const res = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete employee");
}
