import "../../pages/student/StudentDashboard.css"
const statusClassMap = {
  pending: "status-pending",
  "in-progress": "status-review",
  review: "status-review",
  resolved: "status-resolved",
  reopened: "status-reopened",
};

const RecentComplaints = ({ complaints = [] }) => {
  const fallbackComplaints = [
    {
      title: "Food Quality",
      category: "food-quality",
      status: "pending",
      date: "Today",
    },
    {
      title: "Water Leakage",
      category: "water-issue",
      status: "resolved",
      date: "Yesterday",
    },
    {
      title: "Mess Hygiene",
      category: "food-hygiene",
      status: "in-progress",
      date: "2 days ago",
    },
  ];

  const items = complaints.length > 0 ? complaints : fallbackComplaints;

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
        
          <h2 className="section-title">Latest complaints from your hostel</h2>
        </div>
      </div>

      <div className="card soft-card">
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
              {items.map((item, index) => (
                <tr key={`${item.title}-${index}`}>
                  <td>
                    <div className="fw-semibold text-dark">{item.title}</div>
                  </td>

                  <td className="text-muted text-capitalize">
                    {item.category.replaceAll("-", " ")}
                  </td>

                  <td>
                    <span
                      className={`status-pill ${
                        statusClassMap[item.status] || "status-review"
                      }`}
                    >
                      {item.status.replaceAll("-", " ")}
                    </span>
                  </td>

                  <td className="text-muted">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default RecentComplaints;
