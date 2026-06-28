import React from "react";
import  "../../styles/owner-management.css"
const StudentManagement=()=>{
return(
<div className="management-card">
<h2>Student Management</h2>

<div className="empty-management-state">
<h3>Coming Soon</h3>

<p>
The current backend does not expose an API for fetching hostel students.
Once that endpoint is available, this page will display:
</p>

<ul>
<li>Student Name</li>
<li>Email</li>
<li>Joined Hostel</li>
<li>Complaint Count</li>
<li>Current Status</li>
</ul>

<p>
The <strong>/hostels/join</strong> API belongs to the Student module,
so students join hostels from their own dashboard.
</p>
</div>
</div>
);
};

export default StudentManagement;
