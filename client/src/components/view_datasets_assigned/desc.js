import React, { useEffect, useState } from "react";
import axios from "axios";
import creds from "../../creds";
const url = creds.backendUrl;


const shortenDesc = desc => {
    if (desc.length > 40) {
        return desc.slice(37) + '...';
    } return desc;
}

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
export default function Desc_datasets_assigned({ copiedTimeoutId, copiedIndex, showCopied, setCopiedIndex, setShowCopied, setCopiedTimeoutId }) {
    const [loading, setLoading] = useState(false);
    const [datasetData, setDatasetData] = useState([]);

    useEffect(() => {
        axios.get(url + 'datasets-my?toVerify=1', {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('dfs-user'))['token']
            }
        }).then(res => {
            console.log("DATASETS_ASSIGNED", res);
            setDatasetData(res.data.data);
        }).catch(err => {
            console.log("ERROR", err);
        })
    }, []);

    return (<>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
            <h1>Project Description</h1>
        </div>
        <br />
        <div class="grid grid-cols-2 gap-1 ">
            <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer hover:bg-slate-400">Name</div>
            <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{"Hiking Data"}</div>
            <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer   hover:bg-slate-400">ID</div>
            <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{"123fg-hjyli90-jhyu89"}</div>
            <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Description</div>
            <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{"Conatins Hitchhikers data"}</div>
            <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Created At</div>
            <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{"21:48:06"}</div>
            <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Images Assigned To Me</div>
            <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{0}</div>
            <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">Created By</div>
            <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{"Harsh"}</div>
        </div>
    </>)
};