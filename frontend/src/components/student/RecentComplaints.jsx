import "../../pages/student/StudentDashboard.css";

const statusClassMap = {
  pending: "status-pending",
  "in-progress": "status-review",
  review: "status-review",
  resolved: "status-resolved",
  reopened: "status-reopened",
};

const formatDate = (date) => {
  const complaintDate = new Date(date);
  const today = new Date();

  const diffTime = today - complaintDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return complaintDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const RecentComplaints = ({ complaints = [] }) => {
  return (
    <section className="dashboard-section">

      <div className="section-heading">
        <div>
          <h2 className="section-title">
            Your Recent Complaints
          </h2>
        </div>
      </div>

      <div className="card soft-card">

        {complaints.length === 0 ? (

          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <h5>No complaints found.</h5>
            <p>You haven't submitted any complaints yet.</p>
          </div>

        ) : (

          <div className="table-responsive">

            <table className="table dashboard-table align-middle mb-0">

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {complaints.map((item) => (

                  <tr key={item._id}>

                    <td>
                      <div className="fw-semibold text-dark">
                        {item.title}
                      </div>
                    </td>

                    <td className="text-muted text-capitalize">
                      {item.category.replaceAll("-", " ")}
                    </td>

                    <td>

                      <span
                        className={`status-pill ${
                          statusClassMap[item.status] ||
                          "status-review"
                        }`}
                      >
                        {item.status.replaceAll("-", " ")}
                      </span>

                    </td>

                    <td className="text-muted">
                      {formatDate(item.createdAt)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </section>
  );
};

export default RecentComplaints;