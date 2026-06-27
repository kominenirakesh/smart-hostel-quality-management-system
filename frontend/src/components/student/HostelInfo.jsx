import { useAuth } from "../../context/AuthContext";
import "../../pages/student/StudentDashboard.css"
const HostelInfo = ({ hostel }) => {
  const { user } = useAuth();

  const hostelName = hostel?.name || user?.hostel?.name || "GRIET Boys Hostel";
  const hostelCode = hostel?.code || user?.hostel?.code || "HOST-1024";
  const status = hostel?.status || "Connected";

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Your hostel connection details</h2>
        </div>
      </div>

      <div className="hostel-info-grid">
        <div className="card soft-card hostel-info-card">
          <small>Hostel Name</small>
          <h3>{hostelName}</h3>
          <p>Connected to your current student account.</p>
        </div>

        <div className="card soft-card hostel-info-card">
          <small>Join Code</small>
          <h3>{hostelCode}</h3>
          <p>Share this code only when joining a new hostel.</p>
        </div>

        <div className="card soft-card hostel-info-card">
          <small>Status</small>
          <h3 className="status-active">{status}</h3>
          <p>Your hostel is active and complaint tracking is enabled.</p>
        </div>
      </div>
    </section>
  );
};

export default HostelInfo;
