import React from "react";

const AIExecutiveSummary=({insights})=>(
<section className="ai-summary-card">
<h2>🤖 AI Executive Summary</h2>

<div className="summary-top">
<div><span>Overall Health</span><strong>{insights?.overallHealth}</strong></div>
<div><span>Risk Level</span><strong>{insights?.riskLevel}</strong></div>
</div>

<div className="summary-block">
<h3>Executive Summary</h3>
<p>{insights?.summary}</p>
</div>

<div className="summary-block">
<h3>Key Findings</h3>
<ul>
{insights?.keyFindings?.map((i,index)=><li key={index}>{i}</li>)}
</ul>
</div>

<div className="summary-block">
<h3>Recommendations</h3>
<ul>
{insights?.recommendations?.map((i,index)=><li key={index}>{i}</li>)}
</ul>
</div>

</section>
);

export default AIExecutiveSummary;
