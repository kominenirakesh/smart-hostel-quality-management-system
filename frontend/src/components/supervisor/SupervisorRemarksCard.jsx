import React from "react";

const SupervisorRemarksCard = ({ remark }) => {
  return (
    <section className="remarks-card">
      <h2>📝 Supervisor Remarks</h2>

      {remark ? (
        <div className="remarks-content">
          {remark}
        </div>
      ) : (
        <div className="empty-state">
          <p>No remarks added yet.</p>
        </div>
      )}
    </section>
  );
};

export default SupervisorRemarksCard;
