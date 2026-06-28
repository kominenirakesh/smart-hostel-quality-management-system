import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/GobalApi";
import { useAuth } from "../../context/AuthContext";
import "../../styles/student-join-hostel.css";

const StudentJoinHostel = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e) => {
    e.preventDefault();

    if (!joinCode.trim()) {
      alert("Please enter the hostel join code.");
      return;
    }

    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const { data } = await api.post(
        "/hostels/join",
        {
          joinCode,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Update logged-in user
      const updatedUser = {
        ...user,
        hostelId: data.data._id,
      };

      login(updatedUser);

      sessionStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      navigate("/student/dashboard");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to join hostel."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-hostel-page">

      <div className="join-card">

        <div className="join-header">

          <h1>🏨 Join Your Hostel</h1>

          <p>
            Enter the hostel join code provided by your hostel owner
            or supervisor.
          </p>

        </div>

        <form onSubmit={handleJoin}>

          <label>Hostel Join Code</label>

          <input
            type="text"
            placeholder="Example: SMP-1826"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Hostel"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default StudentJoinHostel;