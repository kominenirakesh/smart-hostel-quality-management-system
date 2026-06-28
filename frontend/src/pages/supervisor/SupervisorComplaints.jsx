import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/GobalApi.js";
import "../../styles/supervisor-complaints.css";

const SupervisorComplaints = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      // Same token storage used throughout the project
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await api.get(
        "/complaints/supervisor?page=1&limit=100",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const result = response.data;

      setComplaints(result.data.complaints);
      setPagination(result.data.pagination);
    } catch (err) {
      console.error("Supervisor Complaints Error:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to load complaints.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="supervisor-complaints-page">

      <div className="page-header">

        <button
          className="back-btn"
          onClick={() => navigate("/supervisor/dashboard")}
        >
          ← Back
        </button>

        <div>
          <h1>All Complaints</h1>

          <p>
            Manage and review every complaint assigned to you.
          </p>
        </div>

      </div>

      <div className="complaints-table-card">

        <div className="table-top">

          <h2>
            Complaints ({complaints.length})
          </h2>

        </div>

        {loading ? (

          <div className="table-message">
            Loading complaints...
          </div>

        ) : error ? (

          <div className="table-message">
            {error}
          </div>

        ) : complaints.length === 0 ? (

          <div className="table-message">
            No complaints found.
          </div>

        ) : (

          <table className="complaints-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Complaint ID</th>
                <th>Title</th>
                <th>Student</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date Submitted</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {complaints.map((complaint, index) => (

                <tr key={complaint._id}>

                  <td>{index + 1}</td>

                  <td>{complaint._id.slice(-8)}</td>

                  <td>{complaint.title}</td>

                  <td>
                    {complaint.studentId?.name || "-"}
                  </td>

                  <td>
                    <span className={`priority ${complaint.priority}`}>
                      {complaint.priority}
                    </span>
                  </td>

                  <td>
                    <span className={`status ${complaint.status}`}>
                      {complaint.status}
                    </span>
                  </td>

                  <td>
                    {formatDate(complaint.createdAt)}
                  </td>

                  <td>

                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(
                          `/supervisor/complaints/${complaint._id}`
                        )
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

        {/* {pagination && (
          <div className="pagination-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
        )} */}

      </div>

    </div>
  );
};

export default SupervisorComplaints;