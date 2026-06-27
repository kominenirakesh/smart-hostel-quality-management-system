import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";

function ComplaintCard({ complaint }) {
  return (
    <Link
      to={`/student/complaints/${complaint._id}`}
      className="complaint-card text-decoration-none"
    >
      <div className="complaint-card-top">
        <div>
          <h4>{complaint.title}</h4>
          <p>{complaint.category}</p>
        </div>

        <StatusBadge status={complaint.status} />
      </div>

      <div className="complaint-card-bottom">
        <span>
          {new Date(complaint.createdAt).toLocaleDateString()}
        </span>

        <span className="view-link">
          View →
        </span>
      </div>
    </Link>
  );
}

export default ComplaintCard;
