import React, { useEffect, useState } from "react";
import api from "../../services/GobalApi";
import {
  Copy,
  CheckCircle2,
  Building2,
  MapPin,
  User,
  Users,
  Star,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

import "../../styles/HostelJoinCodesWorkspace.css";

const HostelJoinCodesWorkspace = () => {

  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState("");

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {

    try {

      setLoading(true);

      const token = sessionStorage.getItem("token");

      const { data } = await api.get(
        "/dashboard/owner",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setHostels(data.data.hostelAnalytics);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleCopy = async (code) => {

    try {

      await navigator.clipboard.writeText(code);

      setCopiedCode(code);

      setTimeout(() => {

        setCopiedCode("");

      }, 2000);

    } catch (error) {

      console.error(error);

    }

  };

  if (loading) {

    return (
      <div className="workspace-card">

        <div className="workspace-header">

          <h2>🔑 Hostel Join Codes</h2>

          <p>Loading hostel information...</p>

        </div>

      </div>
    );

  }

  return (

    <div className="workspace-card">

      <div className="workspace-header">

        <h2>🔑 Hostel Join Codes</h2>

        <p>
          Share these join codes with students so they can
          securely join their hostel.
        </p>

      </div>

      {hostels.length === 0 ? (

        <div className="empty-state">

          <Building2 size={60} />

          <h3>No Hostels Found</h3>

          <p>Create your first hostel to generate a join code.</p>

        </div>

      ) : (

        <div className="join-code-grid">

          {hostels.map((hostel) => (

            <div
              className="join-card"
              key={hostel.hostelId}
            >

              <div className="join-card-header">

                <div>

                  <h3>{hostel.hostelName}</h3>

                  <p>

                    <MapPin size={15} />

                    {hostel.address ? `${hostel.address}, ${hostel.city}` : hostel.city}

                  </p>

                </div>

                <span
                  className={
                    hostel.isActive
                      ? "status active"
                      : "status inactive"
                  }
                >

                  <ShieldCheck size={16} />

                  {hostel.isActive ? "Active" : "Inactive"}

                </span>

              </div>

              <div className="join-code-box">

                <div>

                  <span>Join Code</span>

                  <strong>{hostel.joinCode}</strong>

                </div>

                <button
                  onClick={() => handleCopy(hostel.joinCode)}
                >

                  {copiedCode === hostel.joinCode ? (

                    <>

                      <CheckCircle2 size={18} />

                      Copied

                    </>

                  ) : (

                    <>

                      <Copy size={18} />

                      Copy

                    </>

                  )}

                </button>

              </div>

              <div className="join-info-grid">

                <div>

                  <Users size={18} />

                  <span>Students</span>

                  <strong>{hostel.totalStudents}</strong>

                </div>

                <div>

                  <Star size={18} />

                  <span>Rating</span>

                  <strong>

                    {hostel.averageRating}

                  </strong>

                </div>

              </div>

              <div className="supervisor-box">

                <User size={18} />

                <div>

                  <span>Supervisor</span>

                  <strong>

                    {hostel.supervisor
                      ? hostel.supervisor.name
                      : "Not Assigned"}

                  </strong>

                  <small>

                    {hostel.supervisor
                      ? hostel.supervisor.email
                      : "Assign a supervisor"}

                  </small>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default HostelJoinCodesWorkspace;