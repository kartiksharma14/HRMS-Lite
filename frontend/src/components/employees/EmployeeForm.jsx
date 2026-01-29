import { useState } from "react";
import { createEmployee } from "../../services/api";

export default function EmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await createEmployee(form);
      setForm({ full_name: "", email: "", department: "" });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Add Employee</h2>

      {error && <p className="error">{error}</p>}

      <input
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
      />

      <button disabled={loading}>
        {loading ? "Saving..." : "Add Employee"}
      </button>
    </form>
  );
}
