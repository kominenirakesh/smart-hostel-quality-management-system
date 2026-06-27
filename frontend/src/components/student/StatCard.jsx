import "../../pages/student/StudentDashboard.css"
const StatCard = ({
  title,
  value,
  icon,
  color = "primary",
  change,
}) => {
  return (
    <div className={`stat-card border-start border-4 border-${color}`}>
      <div className="stat-card-top">
        <div className={`stat-icon bg-${color}-subtle text-${color}`}>
          <i className={`bi ${icon}`}></i>
        </div>

        {change && (
          <span className="stat-change">
            {change}
          </span>
        )}
      </div>

      <div className="stat-card-body">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
