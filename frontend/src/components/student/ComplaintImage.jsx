import React from "react";

const ComplaintImage = ({ complaint }) => {
  return (
    <section className="details-card image-card">
      <div className="section-header">
        <h3>📷 Uploaded Evidence</h3>
      </div>

      {complaint?.imageUrl ? (
        <>
          <div className="complaint-image-wrapper">
            <img
              src={complaint.imageUrl}
              alt="Complaint Evidence"
              className="complaint-image"
            />
          </div>

          <div className="image-footer">
            <span>Evidence uploaded by the student.</span>

            <a
              href={complaint.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-full-image"
            >
              View Full Image ↗
            </a>
          </div>
        </>
      ) : (
        <div className="no-image-state">
          <div className="no-image-icon">🖼️</div>

          <h4>No Evidence Uploaded</h4>

          <p>
            This complaint was submitted without an image.
            AI analysis may be limited.
          </p>
        </div>
      )}
    </section>
  );
};

export default ComplaintImage;
