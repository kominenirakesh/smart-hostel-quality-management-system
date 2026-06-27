import React from "react";

const AIAnalysisCard = ({ complaint }) => {
  const ai = complaint?.aiAnalysis;

  if (!ai) {
    return (
      <section className="details-card ai-card">
        <div className="section-header"><h3>🤖 AI Complaint Assessment</h3></div>
        <div className="empty-state"><p>No AI analysis available.</p></div>
      </section>
    );
  }

  const recommendation = {
    high: "Immediate supervisor attention is recommended.",
    medium: "Supervisor review is recommended.",
    low: "Monitor similar complaints."
  };

  return (
    <section className="details-card ai-card">
      <div className="section-header"><h3>🤖 AI Complaint Assessment</h3></div>

      <div className="ai-grid">
        <div className="ai-item"><span>Confidence</span><strong>{ai.confidence}%</strong></div>
        <div className="ai-item"><span>Severity</span><strong>{ai.severity.toUpperCase()}</strong></div>
        <div className="ai-item"><span>Predicted Category</span><strong>{ai.predictedCategory}</strong></div>
        <div className="ai-item"><span>Analyzed At</span><strong>{new Date(ai.analyzedAt).toLocaleString()}</strong></div>

        <div className="ai-item full">
          <span>AI Summary</span>
          <p>{ai.summary}</p>
        </div>

        <div className="ai-item full">
          <span>Issues Detected</span>
          <ul className="issues-list">
            {ai.issues?.length ? ai.issues.map((issue,index)=><li key={index}>✔ {issue}</li>) : <li>No issues detected.</li>}
          </ul>
        </div>

        <div className="ai-item full recommendation">
          <span>Recommendation</span>
          <p>{recommendation[ai.severity] || "No recommendation available."}</p>
        </div>
      </div>
    </section>
  );
};

export default AIAnalysisCard;
