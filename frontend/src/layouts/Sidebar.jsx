import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const menu = {
  student: [
    { to: "/student/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { to: "/student/create-complaint", icon: "bi-plus-circle", label: "Create Complaint" },
    { to: "/student/my-complaints", icon: "bi-card-list", label: "My Complaints" },
  ],
  supervisor: [
    { to: "/supervisor/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { to: "/supervisor/complaints", icon: "bi-chat-left-text", label: "Complaints" },
  ],
  owner: [
    { to: "/owner/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { to: "/owner/hostels", icon: "bi-buildings", label: "Hostels" },
    { to: "/owner/analytics", icon: "bi-graph-up-arrow", label: "Analytics" },
  ]
};

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role || "student";
  const items = menu[role] || [];

  return (
    <aside
      className="bg-white border-end shadow-sm d-flex flex-column"
      style={{ width: 280, minHeight: "calc(100vh - 76px)", position: "sticky", top: 76 }}
    >
      <div className="p-4 border-bottom">
        <h6 className="text-uppercase text-muted mb-1">Navigation</h6>
        <small className="text-capitalize fw-semibold">{role} Panel</small>
      </div>

      <nav className="p-3 flex-grow-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({isActive}) =>
              `d-flex align-items-center gap-3 text-decoration-none px-3 py-3 rounded-3 mb-2 ${
                isActive ? "bg-primary text-white" : "text-dark"
              }`
            }
          >
            <i className={`bi ${item.icon} fs-5`}></i>
            <span className="fw-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-top p-3">
        <div className="rounded-3 p-3 bg-light">
          <div className="fw-semibold">Smart Hostel</div>
          <small className="text-muted">
            AI Powered Quality Management
          </small>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
