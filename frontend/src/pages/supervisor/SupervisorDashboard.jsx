import { useEffect, useState } from "react";
import Navbar from "../../layouts/Navbar.jsx";
import DashboardStats from "../../components/supervisor/DashboardStats.jsx";
import RecentComplaints from "../../components/supervisor/RecentComplaints.jsx";
import QuickActions from "../../components/supervisor/QuickActions.jsx";
import api from "../../services/GobalApi.js";
import "../../styles/supervisor-dashboard.css";

function SupervisorDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await api.get(
        "/complaints/supervisor?limit=100",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setComplaints(response.data.data.complaints || []);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === "pending").length,
    review: complaints.filter(c => c.status === "review").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
    reopened: complaints.filter(c => c.status === "reopened").length,
  };

  // Current date for the header
  const now = new Date();
  const dateMain = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateDay = now.toLocaleDateString("en-GB", { weekday: "long" });

  return (
    <>
      
       <Navbar/>
      <div className="supervisor-dashboard">

        {/* Hero Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <h2>Good Morning, Supervisor 👋</h2>
            <p>Monitor complaints, review AI analysis and resolve issues efficiently.</p>
          </div>
          <div className="dashboard-header-date">
            <i className="bi bi-calendar3"></i>
            <div className="date-text">
              <span className="date-main">{dateMain}</span>
              <span className="date-day">{dateDay}</span>
            </div>
          </div>
        </div>

        {/* KPI Stats */}
        <DashboardStats stats={stats} loading={loading} />

        {/* Recent Complaints — full width */}
        <div className="dashboard-grid">
          <RecentComplaints
            complaints={complaints.slice(0, 10)}
            loading={loading}
          />

          {/* QuickActions kept in tree but hidden via CSS per spec */}
          <QuickActions />
        </div>

      </div>
    </>
  );
}

export default SupervisorDashboard;
