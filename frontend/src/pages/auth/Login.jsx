import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/GobalApi.js"; 

const Login = () => {
     const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Email and Password are required.");
      return;
    }

    setLoading(true);

    try {
  const response = await api.post("/users/login", formData);
  
      const { token, user } = response.data.data;

      // Store JWT
      sessionStorage.setItem("token", token);

      // Store logged in user
      login(user);

      // Redirect based on role
      switch (user.role) {

        case "owner":
          navigate("/owner/dashboard");
          break;

        case "supervisor":
          navigate("/supervisor/dashboard");
          break;

        case "student":

          if (user.hostelId) {
            navigate("/student/dashboard");
          } else {
            navigate("/student/join-hostel");
          }

          break;

        default:
          navigate("/");
      }

          } catch (err) {
            console.error(err);
            alert("Login failed.");
          } finally {
            setLoading(false);
          }
        };

  return (
    <section className="auth-page">
      <div className="auth-container">

        <div className="auth-left">
          <div className="brand">
            <div className="brand-logo">
              <i className="bi bi-building"></i>
            </div>

            <h1>Smart Hostel</h1>

            <p>
              AI-powered hostel complaint management system helping students,
              supervisors and owners manage complaints efficiently.
            </p>
          </div>

          <div className="features">

            <div className="feature">
              <div className="feature-icon">
                <i className="bi bi-camera-fill"></i>
              </div>

              <div className="feature-content">
                <h4>AI Food Analysis</h4>
                <p>Analyze food quality using Gemini Vision.</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="bi bi-chat-dots-fill"></i>
              </div>

              <div className="feature-content">
                <h4>Complaint Tracking</h4>
                <p>Track complaint status from submission to resolution.</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="bi bi-bar-chart-fill"></i>
              </div>

              <div className="feature-content">
                <h4>Analytics Dashboard</h4>
                <p>Powerful insights for hostel owners and supervisors.</p>
              </div>
            </div>

          </div>

          <div className="brand-footer">
            © 2026 Smart Hostel Quality Management System
          </div>
        </div>

        <div className="auth-right">

          <div className="login-wrapper">

            <div className="login-header">
              <h2>Welcome Back 👋</h2>
              <p>Sign in to continue.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>

              <div className="form-group">
                <label className="form-label-custom">Email Address</label>

                <div className="input-wrapper">
                  <i className="bi bi-envelope input-icon"></i>

                  <input
                    className="auth-input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label-custom">Password</label>

                <div className="input-wrapper">
                  <i className="bi bi-lock input-icon"></i>

                  <input
                    className="auth-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>

                </div>
              </div>

              <div className="auth-options">
                <div className="remember-me">
                  <input id="remember" type="checkbox" />
                  <label htmlFor="remember">Remember Me</label>
                </div>

                <Link className="forgot-password" to="#">
                  Forgot Password?
                </Link>
              </div>

              <button
                className="login-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <p className="register-text">
                Don't have an account?{" "}
                <Link to="/register">Create Account</Link>
              </p>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Login;
