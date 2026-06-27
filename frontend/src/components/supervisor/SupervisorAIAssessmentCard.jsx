import React from "react";
import { format } from "date-fns";

const SupervisorAIAssessmentCard = ({ aiAnalysis }) => {
  if (!aiAnalysis) {
    return (
      <section className="ai-card">
        <h2>🤖 AI Assessment</h2>
        <div className="empty-ai">
          <p>No AI analysis available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="ai-card">
      <h2>🤖 AI Assessment</h2>

      <div className="ai-metrics">
        <div className="metric">
          <span>Confidence</span>
          <strong>{aiAnalysis.confidence}%</strong>
        </div>

        <div className="metric">
          <span>Severity</span>
          <strong>{aiAnalysis.severity}</strong>
        </div>

        <div className="metric">
          <span>Category</span>
          <strong>{aiAnalysis.predictedCategory}</strong>
        </div>

        <div className="metric">
          <span>Analyzed</span>
          <strong>
            {aiAnalysis.analyzedAt
              ? format(new Date(aiAnalysis.analyzedAt), "dd MMM yyyy")
              : "--"}
          </strong>
        </div>
      </div>

      <div className="ai-section">
        <h3>AI Summary</h3>
        <p>{aiAnalysis.summary}</p>
      </div>

      <div className="ai-section">
        <h3>Detected Issues</h3>
        <ul>
          {(aiAnalysis.issues || []).map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      </div>

      <div className="ai-section">
        <h3>Recommendation</h3>
        <p>
          {aiAnalysis.severity === "high"
            ? "Immediate supervisor attention is recommended."
            : "Review the complaint and take appropriate action."}
        </p>
      </div>
    </section>
  );
};

export default SupervisorAIAssessmentCard;
