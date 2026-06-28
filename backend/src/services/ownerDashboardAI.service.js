import ai from "../config/gemini.config.js";

const generateOwnerDashboardInsights = async ({
  overallStats,
  hostelAnalytics,
}) => {
  try {
    const prompt = `
You are an AI Operations Analyst for a Smart Hostel Quality Management System.

Analyze the provided dashboard statistics and hostel analytics.

Your responsibility is to help the hostel owner understand the overall health of their hostel business.

Use the statistics to identify:

• Complaint trends
• Operational risks
• Hostels requiring immediate attention
• AI severity distribution
• Resolution performance
• Overall hostel management quality

IMPORTANT

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT return explanations.

Do NOT include \`\`\`json.

Return exactly in this format:

{
  "overallHealth": "",
  "riskLevel": "",
  "summary": "",
  "keyFindings": [
    "",
    "",
    "",
    ""
  ],
  "recommendations": [
    "",
    "",
    "",
    ""
  ]
}

Rules

overallHealth must be ONLY one of:

Excellent
Good
Needs Attention
Critical

riskLevel must be ONLY one of:

Low
Medium
High

summary

• Maximum 80 words.
• Professional executive summary.

keyFindings

• Maximum 4 points.
• Keep every point short.

recommendations

• Maximum 4 points.
• Actionable recommendations.
• Professional language.

====================================================

OVERALL DASHBOARD STATISTICS

${JSON.stringify(overallStats, null, 2)}

====================================================

HOSTEL ANALYTICS

${JSON.stringify(hostelAnalytics, null, 2)}

====================================================

Generate meaningful insights based ONLY on the provided data.

`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",

          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {

  console.error(error);

  return {

    overallHealth:
      overallStats.pendingComplaints > 20
        ? "Critical"
        : "Good",

    riskLevel:
      overallStats.highPriorityComplaints > 10
        ? "High"
        : "Low",

    summary:
      "AI quota has been reached. Showing rule-based analysis generated from current hostel statistics.",

    keyFindings: [

      `${overallStats.pendingComplaints} complaints are currently pending.`,

      `${overallStats.highPriorityComplaints} complaints are marked as high priority.`,

      `${overallStats.totalHostels} hostels are being monitored.`

    ],

    recommendations: [

      "Review pending complaints.",

      "Assign supervisors to hostels without supervision.",

      "Improve complaint resolution rate."

    ]

  };

}
};

export default generateOwnerDashboardInsights;