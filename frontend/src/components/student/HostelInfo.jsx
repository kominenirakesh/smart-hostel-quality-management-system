import "../../pages/student/StudentDashboard.css";

const HostelInfo = ({ hostel }) => {

  if (!hostel) {
    return null;
  }

  return (
    <section className="dashboard-section">

      <div className="section-heading">
        <div>
          <h2 className="section-title">
            Your Hostel Information
          </h2>
        </div>
      </div>

      <div className="hostel-info-grid">

        {/* Hostel Name */}

        <div className="card soft-card hostel-info-card">

          <small>Hostel Name</small>

          <h3>{hostel.hostelName}</h3>

          <p>
            {hostel.address}, {hostel.city}
          </p>

        </div>

        {/* Join Code */}

        <div className="card soft-card hostel-info-card">

          <small>Join Code</small>

          <h3>{hostel.joinCode}</h3>

          <p>
            Use this code only when joining this hostel.
          </p>

        </div>

        {/* Status */}

        <div className="card soft-card hostel-info-card">

          <small>Status</small>

          <h3
            className={
              hostel.status === "Active"
                ? "status-active"
                : "status-inactive"
            }
          >
            {hostel.status}
          </h3>

          <p>
            Complaint tracking is currently{" "}
            {hostel.status.toLowerCase()}.
          </p>

        </div>

      </div>

    </section>
  );

};

export default HostelInfo;