import React, { useEffect, useState } from "react";
import api from "../../services/GobalApi";
import OwnerNavbar from "../../components/owner/OwnerNavbar.jsx";
import DashboardHero from "../../components/owner/DashboardHero_component.jsx";
import StatsGrid from "../../components/owner/StatsGrid";
import AISeverityCards from "../../components/owner/AISeverityCards";
import HostelAnalyticsTable from "../../components/owner/HostelAnalyticsTable";
import AIExecutiveSummary from "../../components/owner/AIExecutiveSummary";

import "../../styles/owner-dashboard.css";
import "../../styles/owner-navbar.css";



const OwnerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const { data } = await api.get("/dashboard/owner", {
        headers: {
          Authorization: token,
        },
      });

      setDashboard(data.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Failed to load owner dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="owner-loading-state">Loading Owner Dashboard...</div>;
  }

  if (error) {
    return <div className="owner-loading-state">{error}</div>;
  }

  if (!dashboard) {
    return <div className="owner-loading-state">No dashboard data available.</div>;
  }

  const { overallStats, hostelAnalytics, aiInsights } = dashboard;

  return (
    <>
      <OwnerNavbar />

      <div className="owner-dashboard-page">
        <DashboardHero />

        <StatsGrid stats={overallStats} />

        <AISeverityCards severity={overallStats.aiSeverity} />

        <HostelAnalyticsTable hostels={hostelAnalytics} />

        <AIExecutiveSummary insights={aiInsights} />
      </div>
    </>
  );
};

export default OwnerDashboard;
