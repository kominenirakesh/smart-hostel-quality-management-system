import React, { useEffect, useState } from "react";
import api from "../../services/GobalApi";
import "./AssignSupervisorWorkspace.css";

const AssignSupervisor = () => {
  const [hostels, setHostels] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState({});
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [assigningId, setAssigningId] = useState(null);
  // Per-hostel inline feedback: { [hostelId]: { type: "success"|"error", msg: "" } }
  const [feedback, setFeedback] = useState({});

  const token = sessionStorage.getItem("token");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setFetchError("");
      const [dashboardRes, supervisorRes] = await Promise.all([
        api.get("/dashboard/owner", { headers: { Authorization: token } }),
        api.get("/users/supervisors", { headers: { Authorization: token } }),
      ]);
      setHostels(dashboardRes.data.data.hostelAnalytics);
      setSupervisors(supervisorRes.data.data);
    } catch (err) {
      console.error(err);
      setFetchError(err.response?.data?.message || "Failed to load data. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (hostelId) => {
    const supervisorId = selectedSupervisor[hostelId];
    if (!supervisorId) {
      setFeedback((prev) => ({
        ...prev,
        [hostelId]: { type: "error", msg: "Please select a supervisor first." },
      }));
      return;
    }

    try {
      setAssigningId(hostelId);
      setFeedback((prev) => ({ ...prev, [hostelId]: null }));

      await api.patch(
        `/hostels/${hostelId}/assign-supervisor`,
        { supervisorId },
        { headers: { Authorization: token } }
      );

      setFeedback((prev) => ({
        ...prev,
        [hostelId]: { type: "success", msg: "Supervisor assigned successfully." },
      }));

      // Refresh hostel list to reflect the new supervisor
      await fetchData();

      // Clear the dropdown selection for this hostel
      setSelectedSupervisor((prev) => {
        const next = { ...prev };
        delete next[hostelId];
        return next;
      });
    } catch (err) {
      console.error(err);
      setFeedback((prev) => ({
        ...prev,
        [hostelId]: {
          type: "error",
          msg: err.response?.data?.message || "Assignment failed. Please try again.",
        },
      }));
    } finally {
      setAssigningId(null);
    }
  };

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="workspace-card">
        <div className="workspace-header">
          <h2>👨‍💼 Assign Supervisor</h2>
          <p>Loading hostels and supervisors…</p>
        </div>
        <div className="as-loading-body">
          <div className="as-spinner" />
          <p>Fetching data…</p>
        </div>
      </div>
    );
  }

  /* ── Fetch error state ── */
  if (fetchError) {
    return (
      <div className="workspace-card">
        <div className="workspace-header">
          <h2>👨‍💼 Assign Supervisor</h2>
          <p>Something went wrong.</p>
        </div>
        <div className="as-error-body">
          <p className="as-error-msg">{fetchError}</p>
          <button className="primary-btn" onClick={fetchData}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-card">
      <div className="workspace-header">
        <h2>👨‍💼 Assign Supervisor</h2>
        <p>Manage supervisor assignments across all your hostels.</p>
      </div>

      <div className="workspace-form">

        {/* ── No supervisors available ── */}
        {supervisors.length === 0 && (
          <div className="as-notice">
            ⚠️ No supervisors are currently available. Please add supervisor accounts first.
          </div>
        )}

        {hostels.map((hostel) => {
          const fb = feedback[hostel.hostelId];
          const isAssigning = assigningId === hostel.hostelId;
          const alreadyAssigned = !!hostel.supervisor;

          return (
            <div key={hostel.hostelId} className="hostel-success-card">

              {/* ── Card header ── */}
              <div className="success-banner">
                <span className="banner-name">{hostel.hostelName}</span>
                <span className="banner-city">{hostel.city}</span>
              </div>

              {/* ── Stats grid ── */}
              <div className="hostel-details-grid">
                <div className="detail-box">
                  <span>Students</span>
                  <strong>{hostel.totalStudents}</strong>
                </div>
                <div className="detail-box">
                  <span>Complaints</span>
                  <strong>{hostel.totalComplaints}</strong>
                </div>
                <div className="detail-box">
                  <span>Pending</span>
                  <strong>{hostel.pendingComplaints}</strong>
                </div>
                <div className="detail-box">
                  <span>Resolution</span>
                  <strong>{hostel.resolutionRate ?? 0}%</strong>
                </div>
              </div>

              {/* ── Supervisor section ── */}
              <div className="management-note">
                <p className="as-section-label">Supervisor</p>

                {alreadyAssigned ? (
                  /* Already assigned */
                  <div className="as-assigned-block">
                    <div className="as-assigned-info">
                      <strong>{hostel.supervisor.name}</strong>
                      <span>{hostel.supervisor.email}</span>
                    </div>
                    <span className="as-badge-assigned">✔ Already Assigned</span>
                  </div>
                ) : (
                  /* Assign form */
                  <div className="as-assign-row">
                    <select
                      value={selectedSupervisor[hostel.hostelId] || ""}
                      onChange={(e) =>
                        setSelectedSupervisor((prev) => ({
                          ...prev,
                          [hostel.hostelId]: e.target.value,
                        }))
                      }
                      disabled={isAssigning || supervisors.length === 0}
                    >
                      <option value="">▼ Select Supervisor</option>
                      {supervisors.map((sup) => (
                        <option key={sup._id} value={sup._id}>
                          {sup.name} — {sup.email}
                        </option>
                      ))}
                    </select>

                    <button
                      className="primary-btn"
                      onClick={() => handleAssign(hostel.hostelId)}
                      disabled={isAssigning || supervisors.length === 0}
                    >
                      {isAssigning ? "Assigning…" : "Assign Supervisor"}
                    </button>
                  </div>
                )}

                {/* Inline feedback */}
                {fb && (
                  <p className={`as-feedback ${fb.type === "success" ? "as-feedback--ok" : "as-feedback--err"}`}>
                    {fb.type === "success" ? "✅ " : "⚠️ "}{fb.msg}
                  </p>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignSupervisor;
