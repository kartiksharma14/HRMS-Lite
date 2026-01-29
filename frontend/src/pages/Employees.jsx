import { useEffect, useState } from "react";
import {
  fetchEmployees,
  deleteEmployee,
  fetchAttendance,
} from "../services/api";

import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeTable from "../components/employees/EmployeeTable";
import AttendanceForm from "../components/attendance/AttendanceForm";
import AttendanceTable from "../components/attendance/AttendanceTable";
import Modal from "../components/common/Modal";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [attendance, setAttendance] = useState([]);
  const [presentDays, setPresentDays] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     LOAD EMPLOYEES
  ========================= */

  async function loadEmployees() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchEmployees();
      setEmployees(data);
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     LOAD ATTENDANCE
  ========================= */

  async function loadAttendance(employeeId) {
    const data = await fetchAttendance(employeeId, {
      page,
      page_size: pageSize,
    });

    setAttendance(data.records);
    setTotalRecords(data.total_records);
    setPresentDays(data.present_days);
  }

  /* =========================
     ACTIONS
  ========================= */

  async function handleDelete(id) {
    if (!confirm("Delete this employee?")) return;

    await deleteEmployee(id);

    if (selectedEmployee?.id === id) {
      closeAttendanceModal();
    }

    loadEmployees();
  }

  function handleViewAttendance(employee) {
    setSelectedEmployee(employee);
    setAttendance([]);
    setPage(1);
    loadAttendance(employee.id);
  }

  function closeAttendanceModal() {
    setSelectedEmployee(null);
    setAttendance([]);
    setPresentDays(0);
    setTotalRecords(0);
    setPage(1);
  }

  /* =========================
     EFFECTS
  ========================= */

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      loadAttendance(selectedEmployee.id);
    }
  }, [page]);

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="page">
      <EmployeeForm onSuccess={loadEmployees} />

      {loading && <p>Loading employees...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <EmployeeTable
          employees={employees}
          onDelete={handleDelete}
          onViewAttendance={handleViewAttendance}
        />
      )}

      {/* ===== ATTENDANCE MODAL ===== */}
      {selectedEmployee && (
        <Modal
          title={`Attendance – ${selectedEmployee.full_name} (${selectedEmployee.employee_id})`}
          onClose={closeAttendanceModal}
        >
          <p style={{ marginBottom: "12px", fontWeight: 600 }}>
            Total Present Days: {presentDays}
          </p>

          <AttendanceForm
            employeeId={selectedEmployee.id}
            onSuccess={() => loadAttendance(selectedEmployee.id)}
            onFilter={(filters) =>
              loadAttendance(selectedEmployee.id, filters)
            }
          />
          <AttendanceTable records={attendance} />

          {/* ===== PAGINATION ===== */}
          {totalRecords > pageSize && (
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              <span>
                Page {page} of {Math.ceil(totalRecords / pageSize)}
              </span>

              <button
                disabled={page * pageSize >= totalRecords}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
