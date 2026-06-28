import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  return (
    <header className="student-navbar">

      <div className="student-navbar-container">

        {/* Logo */}

        <div
          className="student-logo"
          onClick={() => navigate("/student/dashboard")}
        >

          <div className="student-logo-icon">
            <Building2 size={24} />
          </div>

          <div className="student-logo-text">
            <h2>Smart Hostel</h2>
            <span>Student Portal</span>
          </div>

        </div>

        {/* Right Side */}

        <button
          className="student-logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
};

export default Navbar;