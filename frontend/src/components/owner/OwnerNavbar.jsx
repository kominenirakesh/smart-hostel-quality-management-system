import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BriefcaseBusiness, UserCircle, LogOut, Building2 } from "lucide-react";

const OwnerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="owner-navbar">
      <div className="owner-navbar-container">

        <div className="owner-logo" onClick={() => navigate("/owner/dashboard")}>
          <div className="owner-logo-icon">
            <Building2 size={24}/>
          </div>
          <div>
            <h2>Smart Hostel</h2>
            <span>Owner Portal</span>
          </div>
        </div>

        <nav className="owner-nav-links">
          <NavLink to="/owner/dashboard" className={({isActive})=>isActive?"owner-link active":"owner-link"}>
            <LayoutDashboard size={18}/>
            Dashboard
          </NavLink>

          <NavLink to="/owner/management" className={({isActive})=>isActive?"owner-link active":"owner-link"}>
            <BriefcaseBusiness size={18}/>
            Management
          </NavLink>
        </nav>

        <button className="owner-logout-btn" onClick={handleLogout}>
          <LogOut size={18}/>
          Logout
        </button>

      </div>
    </header>
  );
};

export default OwnerNavbar;
