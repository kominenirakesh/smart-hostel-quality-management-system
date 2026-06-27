import CategorySelect from "./CategorySelect";
import PrioritySelector from "./PrioritySelector";

function ComplaintForm({ formData, updateField }) {
  return (
    <div className="complaint-card">
      <h3>Complaint Information</h3>

      <label>Complaint Title</label>
      <input
        type="text"
        className="form-control"
        value={formData.title}
        onChange={(e)=>updateField("title",e.target.value)}
        placeholder="e.g. Undercooked Rice"
      />

      <CategorySelect
        value={formData.category}
        onChange={(v)=>updateField("category",v)}
      />

      <PrioritySelector
        value={formData.priority}
        onChange={(v)=>updateField("priority",v)}
      />

      <label>Description</label>
      <textarea
        rows={7}
        className="form-control"
        value={formData.description}
        onChange={(e)=>updateField("description",e.target.value)}
        placeholder="Describe the issue..."
      />
      <small>{formData.description.length}/1000</small>
    </div>
  );
}
export default ComplaintForm;
