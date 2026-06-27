import React from "react";
import { format } from "date-fns";

const SupervisorHeader = ({
  complaint,
  onBack,
}) => {
  if (!complaint) return null;

  const getStatusClass = (status = "") => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "resolved";
      case "reopened":
        return "reopened";
      case "review":
      case "under-review":
        return "review";
      default:
        return "pending";
    }
  };

  return (
    <section className="supervisor-header-card">

      <div className="header-top">

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <span className={`status-badge ${getStatusClass(complaint.status)}`}>
          {complaint.status}
        </span>

      </div>

      <h1 className="complaint-title">
        {complaint.title}
      </h1>

      <div className="header-meta">

        <span className="meta-pill">
          {complaint.category}
        </span>

        <span className="meta-pill">
          {complaint.priority}
        </span>

        <span className="meta-pill">
          {complaint.hostelId?.hostelName || "Hostel"}
        </span>

        <span className="meta-date">
          Submitted{" "}
          {complaint.createdAt
            ? format(new Date(complaint.createdAt), "dd MMM yyyy")
            : "--"}
        </span>

      </div>

    </section>
  );
};

export default SupervisorHeader;
