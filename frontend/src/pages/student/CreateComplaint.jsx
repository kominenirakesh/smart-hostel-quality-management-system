import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/GobalApi.js";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";

import ComplaintForm from "../../components/student/ComplaintForm.jsx";
import ImageUploader from "../../components/student/ImageUploader.jsx";
import AIInfoCard from "../../components/student/AIInfoCard.jsx";

import "../../styles/create-complaint.css";

function CreateComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "medium",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.priority ||
      !formData.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const complaintData = new FormData();

      complaintData.append("title", formData.title);
      complaintData.append("category", formData.category);
      complaintData.append("priority", formData.priority);
      complaintData.append("description", formData.description);

      if (image) {
        complaintData.append("image", image);
      }

      const response = await api.post(
        "/complaints/create",
        complaintData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      navigate("/student/my-complaints");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create complaint."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <form
        className="create-complaint-page"
        onSubmit={handleSubmit}
      >
        {/* ================= HEADER ================= */}

        <div className="page-header">
          <div>
            <h2>Create New Complaint</h2>

            <p>
              Report hostel food, hygiene or facility issues.
              Uploading an image enables AI analysis after
              submission.
            </p>
          </div>
        </div>

        {/* ================= BODY ================= */}

        <div className="complaint-grid">
          <ComplaintForm
            formData={formData}
            updateField={updateField}
          />

          <div className="right-panel">
            <ImageUploader
              image={image}
              setImage={setImage}
            />

            <AIInfoCard />
          </div>
        </div>

        {/* ================= SUBMIT ================= */}

        <div className="submit-section">
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Complaint"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default CreateComplaint;