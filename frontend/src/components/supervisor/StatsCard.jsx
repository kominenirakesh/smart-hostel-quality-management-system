const StatsCard = ({ title, value, icon, color }) => {
  const subtitleMap = {
    primary: "All time complaints",
    warning: "Awaiting action",
    info: "Being reviewed",
    success: "Successfully resolved",
    danger: "Reopened complaints",
  };

  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-card-icon">
        <i className={`bi ${icon}`}></i>
      </div>

      <div className="stats-card-content">
        <p className="stats-card-title">{title}</p>
        <h2 className="stats-card-value">{value}</h2>
      </div>

      <div className="stats-card-footer">
        <span>{subtitleMap[color] || "Live Overview"}</span>
      </div>
    </div>
  );
};

export default StatsCard;
