function ImageUploader({image,setImage}){

 const handleChange=(e)=>{
   const file=e.target.files[0];
   if(file) setImage(file);
 };

 return(
  <div className="upload-card">
    <h3>Upload Evidence</h3>

    <label className="upload-btn">
      📷 Upload Food Image
      <input
        hidden
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </label>

    {image && (
      <div className="image-preview">
        <p><strong>{image.name}</strong></p>
        <small>{(image.size/1024/1024).toFixed(2)} MB</small>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger mt-2"
          onClick={()=>setImage(null)}
        >
          Remove
        </button>
      </div>
    )}
  </div>
 );
}
export default ImageUploader;
