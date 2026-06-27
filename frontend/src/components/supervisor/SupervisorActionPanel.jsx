import React from "react";

const SupervisorActionPanel = ({
  status,
  setStatus,
  remark,
  setRemark,
  onUpdate,
  saving
}) => {
  return (
    <section className="action-card">
      <h2>Supervisor Action</h2>

      <label>Complaint Status</label>
      <select
        value={status}
        onChange={(e)=>setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="review">Review</option>
        <option value="resolved">Resolved</option>
        <option value="reopened">Reopened</option>
      </select>

      <label>Supervisor Remarks</label>

      <textarea
        rows="7"
        value={remark}
        onChange={(e)=>setRemark(e.target.value)}
        placeholder="Enter inspection notes, corrective actions and resolution details..."
      />

      <button
        className="update-btn"
        onClick={onUpdate}
        disabled={saving}
      >
        {saving ? "Updating..." : "Update Complaint"}
      </button>
    </section>
  );
};

export default SupervisorActionPanel;
