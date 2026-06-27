import DashboardLayout from "../../../src/layouts/DashboardLayout.jsx";
import WelcomeBanner from "../../components/student/WelcomeBanner.jsx";
import DashboardStats from "../../components/student/DashboardStats.jsx";
import RecentComplaints from "../../components/student/RecentComplaints.jsx";
import HostelInfo from "../../components/student/HostelInfo.jsx";
import "./StudentDashboard.css"
const StudentDashboard = () => {
  const dashboardStats = {
    pending: 5,
    review: 2,
    resolved: 8,
    total: 15,
  };

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <WelcomeBanner />

        <DashboardStats stats={dashboardStats} />


        <RecentComplaints />

        <HostelInfo />
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
