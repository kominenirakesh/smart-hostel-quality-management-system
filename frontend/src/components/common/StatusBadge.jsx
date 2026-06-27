function StatusBadge({ status }) {
  const cls = {
    pending: "badge-pending",
    review: "badge-review",
    resolved: "badge-resolved",
    rejected: "badge-rejected",
  };

  return (
    <span className={`status-badge ${cls[(status || "").toLowerCase()] || "badge-pending"}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
