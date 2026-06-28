import React from "react";

const Card=({label,value,type})=>(
<div className={`severity-card ${type}`}>
  <h4>{label}</h4>
  <h2>{value ?? 0}</h2>
</div>
);

const AISeverityCards=({severity})=>(
<section className="severity-section">
<h2>AI Severity Overview</h2>
<div className="severity-grid">
<Card label="High Severity" value={severity?.high} type="high"/>
<Card label="Medium Severity" value={severity?.medium} type="medium"/>
<Card label="Low Severity" value={severity?.low} type="low"/>
</div>
</section>
);

export default AISeverityCards;
