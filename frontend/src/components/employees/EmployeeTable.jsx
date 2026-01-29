export default function EmployeeTable({
  employees,
  onDelete,
  onViewAttendance,
}) {
  if (!employees.length)
    return <p className="empty">No employees found.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e) => (
          <tr key={e.id}>
            <td>{e.employee_id}</td>
            <td>{e.full_name}</td>
            <td>{e.email}</td>
            <td>{e.department}</td>
            <td>
              <button onClick={() => onViewAttendance(e)}>
                Attendance
              </button>

              <button
                className="danger"
                onClick={() => onDelete(e.id)}
                style={{ marginLeft: "8px" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
