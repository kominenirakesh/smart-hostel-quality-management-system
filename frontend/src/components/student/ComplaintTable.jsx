import ComplaintCard from "./ComplaintCard";
import "../../styles/complaint-details.css"
function ComplaintTable({ complaints }) {
  return (
    <div className="complaints-list">
      {complaints.map((complaint) => (
        <ComplaintCard
          key={complaint._id}
          complaint={complaint}
        />
      ))}
    </div>
  );
}

export default ComplaintTable;
