import axios from "axios";
import React, { useEffect, useState, useContext, useCallback } from "react"
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../imagepage/config";
import creds from "../../creds";
import { ToastContext } from "../../App";
import { TOAST_VARIANTS } from "../../packages/toasts/constants";
// import { useNavigate } from "react-router-dom";

function Uploadfiles() {
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();
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
      addToast({
        message: "Uploaded successfully",
        variant: TOAST_VARIANTS.SUCCESS
      })
      setIsUploaded(true);
      setCurrentFile((prevValue) => ({
        ...prevValue,
        count: prevValue.count + 1
      }))
      // hi

    } catch (error) {
      addToast({
        message: "Error",
        variant: TOAST_VARIANTS.SUCCESS
      })
      console.log(error);
    }

  }


  return (
    <Container>
      <form >
        <div className="form-outline mb-6">
          <label className="form-label text-base" for="form2Example2">Dataset Id: </label>
          <input
            value={shortEmail}
            className={shortEmail === "" ? "form-control" : "form-control bg-slate-50"}
            disabled
          />
        </div>
        <div className="form-container">
          <form>
            <input type="file" id="fileInput" onChange={handleChange} className="input-file" />
            <button type="submit" onClick={uploadFile} className="upload-button">Upload</button>
          </form>
        </div>
        <div className="text-right">
          <button type="submit" onClick={() => { navigate("/datasets") }} className=" btn btn-primary mb-4 justify-center text-btn">Close</button>
        </div>
      </form>
    </Container >
  );
}

export default Uploadfiles;