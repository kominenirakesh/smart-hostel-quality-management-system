import React from "react";
import StatCard from "../supervisor/StatsCard.jsx";
import { Building2, Users, FileText, Clock3, CheckCircle2, AlertTriangle } from "lucide-react";

const StatsGrid = ({ stats }) => (
  <section className="stats-grid">
    <StatCard icon={<Building2 size={22}/>} title="Total Hostels" value={stats?.totalHostels} />
    <StatCard icon={<Users size={22}/>} title="Students" value={stats?.totalStudents} />
    <StatCard icon={<FileText size={22}/>} title="Complaints" value={stats?.totalComplaints} />
    <StatCard icon={<Clock3 size={22}/>} title="Pending" value={stats?.pendingComplaints} color="warning"/>
    <StatCard icon={<CheckCircle2 size={22}/>} title="Resolved" value={stats?.resolvedComplaints} color="success"/>
    <StatCard icon={<AlertTriangle size={22}/>} title="High Priority" value={stats?.highPriorityComplaints} color="danger"/>
  </section>
);

export default StatsGrid;
