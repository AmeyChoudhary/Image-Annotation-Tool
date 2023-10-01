import React, { useEffect, useState } from 'react';
import './ImagePage.css';
import axios from 'axios';
import GetFiles from './components/GetFiles';
import { config } from './config';
import { useParams } from 'react-router-dom';


function ImagePage() {
  const [currentFile, setCurrentFile] = useState({
    count: 0,
    name: ""
  });
  const [isUploaded, setIsUploaded] = useState(false);
  let d_id = useParams();
  let shortEmail = d_id.dataset_id;



  function handleChange(e) {
    const file = e.target.files[0];
    setCurrentFile((prevValue) => ({
      ...prevValue,
      name: file
    }))
  };


  async function uploadFile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', currentFile.name);
    let bucketURL = config.BASE_URL + "/objects/" + shortEmail;
    try {
      console.log("Initiating upload", bucketURL, formData)
      const response = await axios.post(bucketURL, formData);
      console.log("Upload complete");
      setIsUploaded(true);
      setCurrentFile((prevValue) => ({
        ...prevValue,
        count: prevValue.count + 1
      }))

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className="App">
      <div className='main-btn'>
        <div className="form-container">
          <form className='ml-4'>
            <input type="file" id="fileInput" onChange={handleChange} className="input-file" />
            <button type="submit" onClick={uploadFile} className="upload-button">Upload</button>
          </form>
        </div>
      </div>
      <div className='get-files'>
        <GetFiles fileObj={currentFile} uploadStatus={isUploaded} email={shortEmail} />
      </div>
    </div>
  );
}

export default ImagePage;

