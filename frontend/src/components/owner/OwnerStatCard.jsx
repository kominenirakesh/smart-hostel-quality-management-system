import React from "react";

const StatCard = ({ icon, title, value, color = "primary" }) => {
  return (
    <div className={`owner-stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>

      <div className="stat-content">
        <h4>{title}</h4>
        <h2>{value ?? 0}</h2>
      </div>
    </div>
  );
};

export default StatCard;
