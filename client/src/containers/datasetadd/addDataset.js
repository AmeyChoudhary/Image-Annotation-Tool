import axios from "axios";
import React, { useState, useContext } from "react"
import { ToastContext } from "../../App";
import { TOAST_VARIANTS } from "../../packages/toasts/constants";
import creds from "../../creds";
import { config } from "../imagepage/config";
import GetFiles from "../imagepage/components/GetFiles";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const url = creds.mysqlUrl;

const form_class = "w-2/3 align-end px-4 py-4 mx-4 my-4 border border-solid border-current rounded-lg bg-white shadow-2xl"


export default function AddDataset() {
  const authorId = JSON.parse(localStorage.getItem('dfs-user'))['user']['user_email'];
  const [datasetName, setDatasetName] = useState('');
  const [datasetDescription, setDatasetDescription] = useState('');
  const { addToast } = useContext(ToastContext);
  const [isadded, setIsAdded] = useState(false);
  const [datasetId, setDatasetId] = useState('');

  const [currentFile, setCurrentFile] = useState({
    count: 0,
    name: ""
  });
  const [isUploaded, setIsUploaded] = useState(false);




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
    let bucketURL = config.BASE_URL + "/objects/" + datasetId;
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

    } catch (error) {
      console.log(error);
    }

  }

  const navigate = useNavigate();

  const submitHandler = (e) => {
    navigate('/datasets')
  }

  const submitHandler1 = (e) => {
    e.preventDefault();
    axios.post(url + 'add_dataset', {
      "user_id": authorId,
      "image_ids": [],
      "labels": [],
      "description": datasetDescription,
      "dataset_name": datasetName
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.data.error) {
          addToast({
            message: res.data.error,
            variant: TOAST_VARIANTS.ERROR
          })
        } else {

          addToast({
            message: "Added successfully",
            variant: TOAST_VARIANTS.SUCCESS
          })
          setIsAdded(true);
          setDatasetId(res.data);
          console.log(res.data);
        }
      })
      .catch(err => {
        addToast({
          message: "Server Error " + JSON.stringify(err),
          variant: TOAST_VARIANTS.ERROR
        })
        console.log(err)
      })
  };


  return (
    <div className={form_class} >
      <form onSubmit={submitHandler}>

        <div className="form-outline mb-6">
          <label className="form-label text-base" for="form2Example2">Name: </label>
          <input
            value={datasetName}
            disabled={isadded}
            className={datasetName === "" ? "form-control" : "form-control bg-slate-50"}
            onChange={e => setDatasetName(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-6 w-full px-0">
          <label className="form-label text-base mb-0" for="form2Example2">Description: </label>
          <div className="form-outline mt-2">
            <textarea
              disabled={isadded}
              onChange={e => setDatasetDescription(e.target.value)}
              rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
          </div>




        </div>
        <div className="text-right">
          <button disabled={isadded} className=" btn btn-warning mb-4 justify-center text-btn" onClick={submitHandler1}>Add Project</button>
        </div>
        <div className="form-container">
          <form>
            <input type="file" id="fileInput" onChange={handleChange} className="input-file" />
          </form>
        </div>
        <button disabled={!isadded} onClick={uploadFile} className="btn btn-info mb-4 text-btn justify-center">Upload</button>
        <div className="text-right">
          <button type="submit" className=" btn btn-danger mb-4 justify-center text-btn">Close</button>
        </div>


      </form>
    </div>
  )
};
