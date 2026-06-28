import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import WelcomeBanner from "../../components/student/WelcomeBanner.jsx";
import DashboardStats from "../../components/student/DashboardStats.jsx";
import RecentComplaints from "../../components/student/RecentComplaints.jsx";
import HostelInfo from "../../components/student/HostelInfo.jsx";
import api from "../../services/GobalApi.js";

import "./StudentDashboard.css";

const StudentDashboard = () => {

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const token = sessionStorage.getItem("token");

      const { data } = await api.get(
        "/dashboard/student",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setDashboardData(data.data);

    } catch (error) {

      console.error("Student Dashboard Error:", error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <DashboardLayout>
        <div className="dashboard-page">

          <div className="dashboard-loading">

            <h2>Loading Dashboard...</h2>

          </div>

        </div>
      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <div className="dashboard-page">

        <WelcomeBanner />

        <DashboardStats
          stats={dashboardData?.stats}
        />

        <RecentComplaints
          complaints={dashboardData?.recentComplaints}
        />

        <HostelInfo
          hostel={dashboardData?.hostel}
        />

      </div>

    </DashboardLayout>

  );

};

export default StudentDashboard;