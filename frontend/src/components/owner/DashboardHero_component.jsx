import React from "react";

const DashboardHero = () => {
  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="owner-hero-card">
      <div className="owner-hero-content">
        <span className="owner-hero-tag">
          Smart Hostel Quality Management System
        </span>

        <h1>{greeting}, Owner 👋</h1>

        <p>
          Monitor every hostel, track complaint resolution, review AI-powered
          insights, and manage your hostels from one centralized dashboard.
        </p>

        <div className="owner-hero-meta">
          <span>{today}</span>
          <span>Live Dashboard</span>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
