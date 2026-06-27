import React from "react";
import { format } from "date-fns";

const ComplaintHeader = ({ complaint }) => {
  if (!complaint) return null;

  return (
    <section className="complaint-header-card">
      <div className="header-top">
        <button
          type="button"
          className="back-button"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>

        <span className={`status-badge status-${complaint.status}`}>
          {complaint.status}
        </span>
      </div>

      <div className="header-content">
        <div className="header-left">
          <p className="section-label">Complaint Report</p>

          <h2>{complaint.title}</h2>

          <div className="meta-chips">
            <span className="chip">{complaint.category}</span>
            <span className="chip">{complaint.hostelId?.hostelName}</span>
            <span className="chip">{complaint.hostelId?.city}</span>
          </div>

          <p className="complaint-date">
            Submitted on{" "}
            {format(new Date(complaint.createdAt), "dd MMM yyyy")}
          </p>
        </div>

        <div className="header-right">
          <div className="info-box">
            <span className="label">Priority</span>
            <span className="value">{complaint.priority}</span>
          </div>

          <div className="info-box">
            <span className="label">Complaint ID</span>
            <span className="value">{complaint._id}</span>
          </div>
        </div>
      </div>

      <div className="description-card">
        <h4>Description</h4>
        <p>{complaint.description}</p>
      </div>
    </section>
  );
};

export default ComplaintHeader;
