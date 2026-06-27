import React from "react";

const SupervisorRemarks = ({ complaint }) => {
  const remark = complaint?.supervisorRemark?.trim();

  return (
    <section className="details-card remarks-card">
      <div className="section-header">
        <h3>📝 Supervisor Remarks</h3>
      </div>

      {remark ? (
        <div className="remarks-container">
          <div className="remarks-badge">Official Response</div>

          <p className="remarks-text">
            {remark}
          </p>

          <div className="remarks-footer">
            <span>
              Last Updated
            </span>

            <strong>
              {new Date(complaint.updatedAt).toLocaleString()}
            </strong>
          </div>
        </div>
      ) : (
        <div className="empty-remarks">
          <div className="empty-icon">💬</div>

          <h4>Waiting for Supervisor Review</h4>

          <p>
            Your complaint has been submitted successfully.
           
          </p>
        </div>
      )}
    </section>
  );
};

export default SupervisorRemarks;
