import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import ComplaintTable from "../../components/student/ComplaintTable.jsx";
import api from "../../services/GobalApi.js";
import "../../styles/my-complaints.css";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await api.get("/complaints/my-complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="my-complaints-page">
        <div className="page-header">
          <h2>Complaint History</h2>
          <p>Track every complaint you've submitted and monitor its status.</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="empty-state">
            <h3>No complaints yet</h3>
            <p>Create your first complaint to see it here.</p>
          </div>
        ) : (
          <ComplaintTable complaints={complaints} />
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyComplaints;
