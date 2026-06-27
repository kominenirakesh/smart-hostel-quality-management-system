import { useAuth } from "../../context/AuthContext";
import "../../pages/student/StudentDashboard.css"
const WelcomeBanner = () => {
  const { user } = useAuth();
  console.log(user);
  
 let username = (user.email);
let idx = username.lastIndexOf('@');
const name = username.slice(0, idx); 

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <section className="welcome-banner">
      <div className="welcome-content">
        <span className="welcome-badge">Student Portal</span>

        <h1>
          {greeting}, <span>{name || user?.email || "Student"}</span> 👋
        </h1>

        <p>
          Welcome to the Smart Hostel Quality Management System. Manage
          complaints, track progress and stay updated from one place.
        </p>

        <div className="welcome-meta">
          <div className="meta-card">
            <small>Role</small>
            <strong className="text-capitalize">
              {user?.role || "student"}
            </strong>
          </div>

          <div className="meta-card">
            <small>Status</small>
            <strong className="status-active">Connected</strong>
          </div>
        </div>
      </div>

      <div className="welcome-illustration">
        <div className="hostel-card">
          <div className="hostel-icon">🏨</div>
          <h3>Smart Hostel</h3>
          <p>Quality Management System</p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
