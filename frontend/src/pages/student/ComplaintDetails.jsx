import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import ComplaintHeader from "../../components/student/ComplaintHeader.jsx";
import AIAnalysisCard from "../../components/student/AIAnalysisCard.jsx";
import ComplaintImage from "../../components/student/ComplaintImage.jsx";
import ComplaintTimeline from "../../components/student/ComplaintTimeline.jsx";
import SupervisorRemarks from "../../components/student/SupervisorRemarks.jsx";
import api from "../../services/GobalApi.js";
import "../../styles/complaint-details.css";

function ComplaintDetails() {
  const { complaintId } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaint();
  }, [complaintId]);

  const fetchComplaint = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await api.get(
        `/complaints/${complaintId}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      setComplaint(response.data.data);
    } catch (err) {
      console.error(err);
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading-state">Loading complaint...</div>
      </DashboardLayout>
    );
  }

  if (!complaint) {
    return (
      <DashboardLayout>
        <div className="empty-state">
          <h3>Complaint Not Found</h3>
          <button className="back-button" onClick={()=>navigate(-1)}>
            Go Back
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="complaint-details-page">

        <ComplaintHeader complaint={complaint} />

        <AIAnalysisCard complaint={complaint} />

        <div className="details-grid">

          <div className="left-section">
            <ComplaintImage complaint={complaint} />
          </div>

          <div className="right-section">
            {/* <ComplaintTimeline complaint={complaint} /> */}
            <SupervisorRemarks complaint={complaint} />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default ComplaintDetails;
