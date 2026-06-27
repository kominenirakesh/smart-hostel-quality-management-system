import StatCard from "./StatCard";
import "../../pages/student/StudentDashboard.css"
const DashboardStats = ({
  stats = {
    pending: 0,
    review: 0,
    resolved: 0,
    total: 0,
  },
}) => {
  const cards = [
    {
      title: "Pending",
      value: stats.pending,
      icon: "bi-hourglass-split",
      color: "warning",
      change: "Open",
    },
    {
      title: "In Review",
      value: stats.review,
      icon: "bi-search",
      color: "info",
      change: "Active",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: "bi-check-circle-fill",
      color: "success",
      change: "Done",
    },
    {
      title: "Total",
      value: stats.total,
      icon: "bi-card-list",
      color: "primary",
      change: "All",
    },
  ];

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Your complaint status at a glance</h2>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        {cards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;
