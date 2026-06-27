import StatsCard from "./StatsCard.jsx";

const DashboardStats = ({ stats, loading }) => {
  const cards = [
    {
      title: "Total Complaints",
      value: stats.total,
      icon: "bi-clipboard-data",
      color: "primary",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: "bi-hourglass-split",
      color: "warning",
    },
    {
      title: "Under Review",
      value: stats.review,
      icon: "bi-search",
      color: "info",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: "bi-check-circle",
      color: "success",
    },
    {
      title: "Reopened",
      value: stats.reopened,
      icon: "bi-arrow-clockwise",
      color: "danger",
    },
  ];

  if (loading) {
    return (
      <div className="stats-grid">
        {cards.map((card) => (
          <div className="stat-card skeleton-card" key={card.title}>
            Loading...
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <StatsCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </section>
  );
};

export default DashboardStats;
