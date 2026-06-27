import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm px-4 py-3">
      <div className="container-fluid">

        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: 44,
              height: 44,
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "#fff",
              fontSize: 22
            }}
          >
            <i className="bi bi-building"></i>
          </div>

          <div>
            <div style={{fontSize:"18px"}}>Smart Hostel</div>
            <small className="text-muted">Quality Management</small>
          </div>
        </Link>

        <div className="d-flex align-items-center ms-auto gap-3">

          <div className="position-relative d-none d-md-block">
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
            <input
              type="text"
              placeholder="Search..."
              className="form-control ps-5"
              style={{width:"260px"}}
            />
          </div>

          <button className="btn btn-light position-relative rounded-circle">
            <i className="bi bi-bell fs-5"></i>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button>

          <div className="dropdown">

            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width:40,
                  height:40,
                  background:"#2563eb",
                  color:"#fff",
                  fontWeight:700
                }}
              >
                {(user?.email?.[0] || "U").toUpperCase()}
              </div>

              <div className="text-start d-none d-lg-block">
                <div className="fw-semibold">
                  {user?.email || "User"}
                </div>

                <small className="text-muted text-capitalize">
                  {user?.role}
                </small>
              </div>

            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow border-0">

              <li>
                <button className="dropdown-item">
                  <i className="bi bi-person me-2"></i>
                  Profile
                </button>
              </li>

              <li>
                <button className="dropdown-item">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </button>
              </li>

              <li><hr className="dropdown-divider"/></li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>

            </ul>

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
