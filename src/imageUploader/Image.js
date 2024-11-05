import React, { useState } from "react";
import axios from "axios";
import FileUpload from "./FileUpload";

const Image = ({ setImgUrlInInfo }) => {
  const [imageUrl, setImageUrl] = useState(""); // State to hold the image URL
  const [isUploaded, setIsUploaded] = useState(false);

  // Handle file selection and upload
  const handleFileSelect = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/4kfellowhship/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("response", response);

      console.log("File uploaded successfully:", response.data.fileUrl);

      setImageUrl(response.data.fileUrl); // Correctly using the setter function
      setIsUploaded(true);
      setImgUrlInInfo(response.data.fileUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div id="image-uploader">
      <p className="boxname">Upload profile pic</p>
      <p
        style={isUploaded ? { display: "flex" } : { display: "none" }}
        className="message"
        id="success"
      >
        ✅Profile picture uploaded successfully
      </p>
      <FileUpload
        imageLink={imageUrl}
        onFileSelect={handleFileSelect}
        display={isUploaded ? "none" : "flex"}
      />
    </div>
  );
};

export default Image;
