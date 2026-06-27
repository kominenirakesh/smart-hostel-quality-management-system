import React, { useState } from "react";

const EvidenceViewerCard = ({ imageUrl }) => {
  const [open, setOpen] = useState(false);

  return (
    <section className="evidence-card">
      <div className="card-header">
        <h2>📷 Uploaded Evidence</h2>
      </div>

      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Complaint Evidence"
            className="evidence-image"
            onClick={() => setOpen(true)}
          />

          <button
            className="view-full-btn"
            onClick={() => setOpen(true)}
          >
            View Full Image
          </button>

          {open && (
            <div className="image-modal" onClick={() => setOpen(false)}>
              <img src={imageUrl} alt="Full Evidence" className="fullscreen-image" />
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <p>No evidence image uploaded.</p>
        </div>
      )}
    </section>
  );
};

export default EvidenceViewerCard;
