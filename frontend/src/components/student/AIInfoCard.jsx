import "../../styles/complaint-details.css"
function AIInfoCard(){
 return(
  <div className="ai-card">
    <h3>🤖 AI Image Analysis</h3>
    <p>
      Upload a food image and our AI will automatically analyse it
      after complaint submission.
    </p>

    <ul>
      <li>Food Quality Detection</li>
      <li>Hygiene Analysis</li>
      <li>Severity Prediction</li>
      <li>AI Generated Summary</li>
    </ul>
  </div>
 );
}
export default AIInfoCard;
