import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/GobalApi";

// Supervisor Components
import SupervisorHeader from "../../components/supervisor/SupervisorHeader.jsx";
import ComplaintInformationCard from "../../components/supervisor/ComplaintInformationCard.jsx";
import SupervisorAIAssessmentCard from "../../components/supervisor/SupervisorAIAssessmentCard.jsx";
import EvidenceViewerCard from "../../components/supervisor/EvidenceViewerCard.jsx";
import TimelineCard from "../../components/supervisor/TimelineCard.jsx";
import SupervisorRemarksCard from "../../components/supervisor/SupervisorRemarksCard.jsx";
import SupervisorActionPanel from"../../components/supervisor/SupervisorActionPanel.jsx";

import "../../styles/supervisor-complaint-details.css";

const SupervisorComplaintDetails = () => {
  const { complaintId } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [status, setStatus] = useState("pending");
  const [remark, setRemark] = useState("");

  useEffect(() => {
    fetchComplaint();
  }, [complaintId]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const { data } = await api.get(
        `/complaints/${complaintId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const complaintData = data.data;

      setComplaint(complaintData);
      setStatus(complaintData.status || "pending");
      setRemark(complaintData.supervisorRemark || "");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load complaint.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const token = sessionStorage.getItem("token");

      await api.patch(
        `/complaints/${complaintId}/update`,
        {
          status,
          supervisorRemark: remark,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      await fetchComplaint();

      alert("Complaint updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update complaint.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        Loading complaint details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-state">
        {error}
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="loading-state">
        Complaint not found.
      </div>
    );
  }

  return (
    <div className="supervisor-complaint-page">

      {/* Header */}
      <SupervisorHeader
        complaint={complaint}
        onBack={() => navigate("/supervisor/complaints")}
      />

      {/* Complaint Information */}
      <ComplaintInformationCard
        complaint={complaint}
      />

      {/* AI Assessment */}
      <SupervisorAIAssessmentCard
        aiAnalysis={complaint.aiAnalysis}
      />

      {/* Uploaded Evidence */}
      <EvidenceViewerCard
        imageUrl={complaint.imageUrl}
      />

      {/* Timeline + Supervisor Remarks */}
      <div className="bottom-grid">

        <TimelineCard
          complaint={complaint}
        />

        <SupervisorRemarksCard
          remark={complaint.supervisorRemark}
        />

      </div>

      {/* Supervisor Action */}
      <SupervisorActionPanel
        status={status}
        setStatus={setStatus}
        remark={remark}
        setRemark={setRemark}
        onUpdate={handleUpdate}
        saving={saving}
      />

    </div>
  );
};

export default SupervisorComplaintDetails;