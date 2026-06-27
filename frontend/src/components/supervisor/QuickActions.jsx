import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "View All Complaints",
      description: "Manage and review every assigned complaint.",
      icon: "bi-card-list",
      to: "/supervisor/complaints",
      color: "primary",
    },
    {
      title: "Complaint Analytics",
      description: "View trends and performance insights.",
      icon: "bi-graph-up-arrow",
      to: "/supervisor/analytics",
      color: "success",
    },
    {
      title: "Assigned Hostel",
      description: "View hostel information and details.",
      icon: "bi-buildings",
      to: "/supervisor/hostel",
      color: "warning",
    },
    {
      title: "Refresh Dashboard",
      description: "Reload the latest complaint information.",
      icon: "bi-arrow-clockwise",
      to: "/supervisor/dashboard",
      color: "info",
    },
  ];

  return (
    <section className="quick-actions-card">
      <div className="section-title">
        <h3>Quick Actions</h3>
        <span>Supervisor Tools</span>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className={`quick-action ${action.color}`}
          >
            <div className="quick-action-icon">
              <i className={`bi ${action.icon}`}></i>
            </div>

            <div className="quick-action-content">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>

            <div className="quick-action-arrow">
              <i className="bi bi-arrow-right"></i>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
