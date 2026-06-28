import React from "react";

const HostelAnalyticsTable=({hostels=[]})=>(
<section className="analytics-card">
<h2>Hostel Analytics</h2>
<div className="table-wrapper">
<table className="analytics-table">
<thead>
<tr>
<th>Hostel</th><th>City</th><th>Supervisor</th><th>Students</th><th>Complaints</th><th>Pending</th><th>Resolved</th><th>Resolution %</th>
</tr>
</thead>
<tbody>
{hostels.map(h=>(
<tr key={h.hostelId}>
<td>{h.hostelName}</td>
<td>{h.city}</td>
<td>{h.supervisor?.name || "Not Assigned"}</td>
<td>{h.totalStudents}</td>
<td>{h.totalComplaints}</td>
<td>{h.pendingComplaints}</td>
<td>{h.resolvedComplaints}</td>
<td>{h.resolutionRate}</td>
</tr>
))}
</tbody>
</table>
</div>
</section>
);

export default HostelAnalyticsTable;
