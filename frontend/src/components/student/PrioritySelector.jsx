function PrioritySelector({value,onChange}){
 const options=["low","medium","high"];
 return(
 <>
  <label>Priority</label>
  <div className="priority-group">
    {options.map(item=>(
      <button
        key={item}
        type="button"
        className={value===item?"priority active":"priority"}
        onClick={()=>onChange(item)}
      >
        {item.charAt(0).toUpperCase()+item.slice(1)}
      </button>
    ))}
  </div>
 </>
 );
}
export default PrioritySelector;
