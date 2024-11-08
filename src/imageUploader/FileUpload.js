import React from "react";
import "./img.css";
const FileUpload = ({ onFileSelect, display, imageLink }) => {
  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="image-uploader" onClick={handleClick}>
        <div className="icon">
          <img
            src={
              imageLink
                ? imageLink
                : "https://i.pinimg.com/564x/48/0a/9d/480a9d8db1c0e9043deb777c398a65dc.jpg"
            }
            alt="profile "
            style={
              display === "none" ? { width: "150px" } : { height: "110px" }
            }
            id="prof-pic"
          />
        </div>
        <div className="text" style={{ display: display }}>
          <span>Click to upload image</span>
        </div>
      </label>

      <input
        id="file"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default FileUpload;
