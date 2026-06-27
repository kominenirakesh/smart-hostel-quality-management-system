import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/GobalApi.js";
import "../../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev)=>({...prev,[name]:value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(!formData.name || !formData.email || !formData.password){
      return setError("All fields are required.");
    }

    if(formData.password !== formData.confirmPassword){
      return setError("Passwords do not match.");
    }

    try{
      setLoading(true);

      await api.post("/users/register",{
        name:formData.name,
        email:formData.email,
        password:formData.password,
        role:formData.role
      });

      alert("Registration Successful.");
      navigate("/login");

    }catch(err){
      setError(
        err?.response?.data?.message ||
        "Registration failed."
      );
    }finally{
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
Create your account and start managing hostel complaints,
food quality and AI analysis.
</p>

</div>

<div className="features">

<div className="feature">
<div className="feature-icon"><i className="bi bi-person-plus-fill"></i></div>
<div className="feature-content">
<h4>Create Account</h4>
<p>Register as Student, Supervisor or Owner.</p>
</div>
</div>

<div className="feature">
<div className="feature-icon"><i className="bi bi-shield-check"></i></div>
<div className="feature-content">
<h4>Secure Authentication</h4>
<p>JWT based authentication system.</p>
</div>
</div>

<div className="feature">
<div className="feature-icon"><i className="bi bi-stars"></i></div>
<div className="feature-content">
<h4>Modern Experience</h4>
<p>Fast, clean and responsive interface.</p>
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
<h2>Create Account</h2>
<p>Join Smart Hostel today.</p>
</div>

{error && <div className="alert alert-danger">{error}</div>}

<form className="auth-form" onSubmit={handleSubmit}>

<div className="form-group">
<label className="form-label-custom">Full Name</label>
<div className="input-wrapper">
<i className="bi bi-person input-icon"></i>
<input className="auth-input" name="name" value={formData.name} onChange={handleChange}/>
</div>
</div>

<div className="form-group">
<label className="form-label-custom">Email</label>
<div className="input-wrapper">
<i className="bi bi-envelope input-icon"></i>
<input className="auth-input" type="email" name="email" value={formData.email} onChange={handleChange}/>
</div>
</div>

<div className="form-group">
<label className="form-label-custom">Role</label>
<select className="auth-input" name="role" value={formData.role} onChange={handleChange}>
<option value="student">Student</option>
<option value="supervisor">Supervisor</option>
<option value="owner">Owner</option>
</select>
</div>

<div className="form-group">
<label className="form-label-custom">Password</label>
<div className="input-wrapper">
<i className="bi bi-lock input-icon"></i>
<input className="auth-input" type={showPassword?"text":"password"} name="password" value={formData.password} onChange={handleChange}/>
<button type="button" className="password-toggle" onClick={()=>setShowPassword(!showPassword)}>
<i className={showPassword?"bi bi-eye-slash":"bi bi-eye"}></i>
</button>
</div>
</div>

<div className="form-group">
<label className="form-label-custom">Confirm Password</label>
<div className="input-wrapper">
<i className="bi bi-lock-fill input-icon"></i>
<input className="auth-input" type={showConfirmPassword?"text":"password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
<button type="button" className="password-toggle" onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
<i className={showConfirmPassword?"bi bi-eye-slash":"bi bi-eye"}></i>
</button>
</div>
</div>

<button className="login-btn" type="submit" disabled={loading}>
{loading?"Creating Account...":"Create Account"}
</button>

<div className="auth-divider"><span>OR</span></div>

<p className="register-text">
Already have an account? <Link to="/login">Sign In</Link>
</p>

</form>

</div>

</div>

</div>
</section>
  );
};

export default Register;
