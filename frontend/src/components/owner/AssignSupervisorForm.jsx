import React,{useState} from "react";
import api from "../../services/GobalApi";
import  "../../styles/owner-management.css"

const AssignSupervisorForm=()=>{
const [hostelId,setHostelId]=useState("");
const [supervisorId,setSupervisorId]=useState("");
const [loading,setLoading]=useState(false);

const handleSubmit=async(e)=>{
e.preventDefault();
try{
setLoading(true);
const token=sessionStorage.getItem("token");
await api.patch(`/hostels/${hostelId}/assign-supervisor`,
{supervisorId},
{headers:{Authorization:token}});

}catch(err){
alert(err.response?.data?.message||"Failed to assign supervisor");
}finally{setLoading(false);}
};

return(
<div className="management-card">
<h2>Assign Supervisor</h2>
<p style={{ color: "black" }} >Connect a supervisor to one of your hostels.</p>

<form className="management-form" onSubmit={handleSubmit}>
<label>Hostel ID</label>
<input value={hostelId} onChange={e=>setHostelId(e.target.value)} placeholder="Enter Hostel ID" required/>

<label>Supervisor ID</label>
<input value={supervisorId} onChange={e=>setSupervisorId(e.target.value)} placeholder="Enter Supervisor ID" required/>

<button className="primary-btn" disabled={loading}>
{loading?"Assigning...":"Assign Supervisor"}
</button>
</form>
</div>
);
};

export default AssignSupervisorForm;
