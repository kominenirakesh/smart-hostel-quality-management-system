import "../../pages/student/StudentDashboard.css"
const ActionCard = ({
  title,
  description,
  icon,
  to = "#",
  onClick,
  variant = "primary",
}) => {
  const content = (
    <>
      <div className={`action-icon action-${variant}`}>
        <i className={`bi ${icon}`}></i>
      </div>

      <div className="action-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <i className="bi bi-arrow-right-short action-arrow"></i>
    </>
  );

  if (onClick) {
    return (
      <button type="button" className="action-card" onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <a className="action-card" href={to}>
      {content}
    </a>
  );
};

export default ActionCard;
