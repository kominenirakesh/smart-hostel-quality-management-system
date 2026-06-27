import React from "react";
import { format } from "date-fns";

const TimelineCard = ({ complaint }) => {
  if (!complaint) return null;

  const f = (d) =>
    d ? format(new Date(d), "dd MMM yyyy • hh:mm a") : "--";

  return (
    <section className="timeline-card">
      <h2>🕒 Complaint Timeline</h2>

      <div className="timeline-item">
        <strong>Created</strong>
        <span>{f(complaint.createdAt)}</span>
      </div>

      <div className="timeline-item">
        <strong>Last Updated</strong>
        <span>{f(complaint.updatedAt)}</span>
      </div>

      <div className="timeline-item">
        <strong>Resolved</strong>
        <span>{f(complaint.resolvedAt)}</span>
      </div>

      <div className="timeline-item">
        <strong>Current Status</strong>
        <span>{complaint.status}</span>
      </div>
    </section>
  );
};

export default TimelineCard;
