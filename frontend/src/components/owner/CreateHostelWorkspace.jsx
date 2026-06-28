import React, { useState } from "react";
import api from "../../services/GobalApi";
import "./CreateHostelWorkspace.css";

const initialForm = {
  hostelName: "",
  address: "",
  city: "",
};

const CreateHostelWorkspace = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [createdHostel, setCreatedHostel] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const { data } = await api.post(
        "/hostels/create",
        form,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setCreatedHostel(data.data);
      setForm(initialForm);

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create hostel.");
    } finally {
      setLoading(false);
    }
  };

  const copyJoinCode = async () => {
    if (!createdHostel?.joinCode) return;
    await navigator.clipboard.writeText(createdHostel.joinCode);
  };

  return (
    <div className="workspace-card">

      <div className="workspace-header">
        <h2>🏨 Create Hostel</h2>
        <p  style={{ color: "black" }}> Create a new hostel for your organization and instantly generate a unique join code.</p>
      </div>

      <form className="workspace-form" onSubmit={handleSubmit}>

        <label>Hostel Name</label>
        <input
          name="hostelName"
          value={form.hostelName}
          onChange={handleChange}
          placeholder="Amma Mens PG"
          required
        />

        <label>Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="KPHB, Hyderabad"
          required
        />

        <label>City</label>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Hyderabad"
          required
        />

        <button
          type="submit"
          className="primary-btn"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Hostel"}
        </button>

      </form>

      {createdHostel && (
        <section className="hostel-success-card">

          <div className="success-banner">
            ✅ Hostel Created Successfully
          </div>

          <div className="hostel-details-grid">

            <div className="detail-box">
              <span>Hostel Name</span>
              <strong>{createdHostel.hostelName}</strong>
            </div>

            <div className="detail-box">
              <span>Join Code</span>

              <div className="join-code-row">
                <strong>{createdHostel.joinCode}</strong>

                <button
                  type="button"
                  className="copy-btn"
                  onClick={copyJoinCode}
                >
                  📋 Copy
                </button>
              </div>

            </div>

            <div className="detail-box">
              <span>Status</span>
              <strong>
                {createdHostel.isActive ? "Active" : "Inactive"}
              </strong>
            </div>

            <div className="detail-box">
              <span>Total Students</span>
              <strong>{createdHostel.totalStudents}</strong>
            </div>

          </div>

        </section>
      )}

    </div>
  );
};

export default CreateHostelWorkspace;
