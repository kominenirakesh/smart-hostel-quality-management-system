const categories=[
        "food-quality",
        "food-hygiene",
        "meal-timing",
        "water-issue",
        "quantity-issue",
        "other"
];

function CategorySelect({value,onChange}){
 return(
 <>
  <label>Category</label>
  <select
    className="form-select"
    value={value}
    onChange={(e)=>onChange(e.target.value)}
  >
    <option value="">Select Category</option>
    {categories.map(c=>(
      <option key={c} value={c}>{c}</option>
    ))}
  </select>
 </>
 );
}
export default CategorySelect;
