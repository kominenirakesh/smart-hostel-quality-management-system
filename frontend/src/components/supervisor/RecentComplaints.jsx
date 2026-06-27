import { Link } from "react-router-dom";

const RecentComplaints = ({ complaints = [], loading }) => {

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const date = d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const time = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { date, time };
  };

  if (loading) {
    return (
      <section className="recent-complaints-card">
        <div className="section-title">
          <h3>Recent Complaints</h3>
        </div>
        <div className="loading-state">Loading recent complaints...</div>
      </section>
    );
  }

  return (
    <section className="recent-complaints-card">

      <div className="section-title">
        <h3>Recent Complaints</h3>
        <Link to="/supervisor/complaints" className="view-all-link">
          View All Complaints <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      {complaints.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-inbox"></i>
          No complaints assigned yet.
        </div>
      ) : (
        <>
          <table className="complaints-table">
            <thead>
              <tr>
                <th className="col-num">#</th>
                <th className="col-id">Complaint ID</th>
                <th>Title</th>
                <th>Student</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => {
                const { date, time } = formatDate(complaint.createdAt);
                const status = complaint.status || "pending";
                const priority = complaint.priority || "medium";

                return (
                  <tr key={complaint._id}>
                    <td className="col-num">{index + 1}</td>
                    <td className="col-id">
                      <span className="complaint-id">
                        {complaint.complaintId || `CMP-${complaint._id?.slice(-4)}`}
                      </span>
                    </td>
                    <td>
                      <span className="complaint-title-1 complaint-title  ">{complaint.title}</span>
                    </td>
                    <td>
                      <span className="student-name">
                        {complaint.studentId?.name || "Unknown"}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-priority ${priority}`}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-status ${status}`}>
                        {status === "review"
                          ? "Under Review"
                          : status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                    <td className="col-date">
                      {date}
                      <span>{time}</span>
                    </td>
                    <td>
                      <Link
                        to={`/supervisor/complaints/${complaint._id}`}
                        className="view-btn"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="table-footer">
            <span className="table-footer-count">
              Showing 1 to {complaints.length} of {complaints.length} complaints
            </span>
          </div>
        </>
      )}

    </section>
  );
};

export default RecentComplaints;
