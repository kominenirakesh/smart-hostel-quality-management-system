import React from "react";

const ComplaintInformationCard = ({ complaint }) => {
  if (!complaint) return null;

  return (
    <section className="info-card">
      <h2>Complaint Information</h2>

      <div className="info-grid">
        <div className="info-row">
          <span>Complaint ID</span>
          <strong>{complaint._id}</strong>
        </div>

        <div className="info-row">
          <span>Category</span>
          <strong>{complaint.category}</strong>
        </div>

        <div className="info-row">
          <span>Priority</span>
          <strong>{complaint.priority}</strong>
        </div>

        <div className="info-row">
          <span>Status</span>
          <strong>{complaint.status}</strong>
        </div>

        <div className="info-row">
          <span>Student</span>
          <strong>{complaint.studentId?.name || "-"}</strong>
        </div>

        <div className="info-row">
          <span>Email</span>
          <strong>{complaint.studentId?.email || "-"}</strong>
        </div>

        <div className="info-row">
          <span>Hostel</span>
          <strong>{complaint.hostelId?.hostelName || "-"}</strong>
        </div>

        <div className="info-row">
          <span>City</span>
          <strong>{complaint.hostelId?.city || "-"}</strong>
        </div>
      </div>

      <div className="description-card">
        <h3>Description</h3>
        <p>{complaint.description}</p>
      </div>
    </section>
  );
};

export default ComplaintInformationCard;
