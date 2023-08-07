import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import creds from "../../creds";
import { useParams } from "react-router-dom";
import { ToastContext } from "../../App";
import { TOAST_VARIANTS } from "../../packages/toasts/constants";
import { config } from "../../containers/imagepage/config";


export default function Desc_my_datasets({ dataset_id }) {
    const [loading, setLoading] = useState(false);
    const [imageCount, setImageCount] = useState([]);
    const [datasetData, setDatasetData] = useState([]);
    const { addToast } = useContext(ToastContext);
    const url = creds.mysqlUrl;

    useEffect(() => {
        axios.get(url + 'get_dataset_id/' + dataset_id)
            .then(res => {
                console.log(res.data);
                if (res.data.error) {
                    addToast({
                        message: res.data.error,
                        variant: TOAST_VARIANTS.ERROR
                    })
                } else {
                    setDatasetData(res.data);
                    addToast({
                        message: "Synced successfully",
                        variant: TOAST_VARIANTS.SUCCESS
                    })
                }
            })
            .catch(err => {
                addToast({
                    message: "Server Error " + JSON.stringify(err),
                    variant: TOAST_VARIANTS.ERROR
                })
                console.log(err)
            })
    }, []);

    useEffect(() => {
        axios.get(`${config.BASE_URL}/count/${dataset_id}`)
            .then(response => {
                console.log(response.data.count)
                setImageCount(response.data.count)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (<>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
            <h1>Project Description</h1>
        </div>
        <br />
        {datasetData.length > 0 ?
            <div class="grid grid-cols-2 gap-1 ">


                <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer hover:bg-slate-400">ID</div>
                {datasetData.map((data) => (<div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{data.dataset_id}</div>))}
                <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer   hover:bg-slate-400">Name</div>
                {datasetData.map((data) => (<div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{data.dataset_name}</div>))}
                <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Description</div>
                {datasetData.map((data) => (<div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{data.dataset_desc}</div>))}
                <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Created At</div>
                {datasetData.map((data) => (<div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{data.dataset_created_at}</div>))}
                <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Tot_Img</div>
                <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{imageCount}</div>
                <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Images needing review</div>
                <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{imageCount}</div>
                <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Under Review</div>
                <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{imageCount - imageCount}</div>
                <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Image Accepted</div>
                <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{imageCount - imageCount}</div>
                <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Image Unassigned</div>
                <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{imageCount}</div>

            </div> : <p> The Dataset Description will appear here !</p>}
    </>)
};