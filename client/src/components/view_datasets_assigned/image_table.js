import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import Comment from "../../containers/comments";
import unsecuredCopyToClipboard from "../../containers/copytoclipboard/copyTextClick";
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
export default function Image_table_datasets_assigned({ copiedTimeoutId, copiedIndex, showCopied, setCopiedIndex, setShowCopied, setCopiedTimeoutId }) {
    const [loading, setLoading] = useState(false);
    const [datasetData, setDatasetData] = useState([]);
    const [showComment, setShowComment] = useState(false);

    const handleOnClose = () => setShowComment(false)

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
        <Comment visible={showComment} onClose={handleOnClose} />
        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '80vh', paddingBottom: '2px' }}>
            {datasetData.length > 0 ? <table className="min-w-full leading-normal table-bordered">
                <thead>
                    <tr>
                        <th
                            className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Image Id
                        </th>
                        <th
                            className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                        </th>
                        <th
                            className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Last Edit
                        </th>
                        <th
                            className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                        <th
                            className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Comments
                        </th>
                        <th
                            className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            <span className="text-gray-900 whitespace-no-wrap">{"Mt-32"}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            <span className="text-gray-900 whitespace-no-wrap">{"Moutain"}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            <span className="text-gray-900 whitespace-no-wrap">{"17:43:27"}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            <span className="text-gray-900 whitespace-no-wrap">{"Done"}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            {/* <Link to={'/comments'}> */}
                            <span className="text-gray-900 whitespace-no-wrap flex ">
                                <span className="text-gray-900 whitespace-no-wrap gap-2">{""}</span>
                                {/* <svg onClick={() => setShowComment(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-slate-200 hover:cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg> */}
                                {0}
                            </span>
                            {/* </Link> */}
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm flex">
                            <Link to={'/dataset-versions/'}>
                                <button className="btn btn-outline-info">
                                    View
                                </button>
                            </Link>
                            <Link to={'/dataset-versions/' }>
                                <button className="btn btn-outline-danger">
                                    Download
                                </button>
                            </Link>
                            <Link to={'/'}>
                                <button className="btn btn-outline-warning">
                                    Annotate
                                </button>
                            </Link>
                            <Link to={'/'}>
                                <button className="btn btn-outline-success">
                                    Submit
                                </button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table> : <p>Image Information will appear here !</p>}
        </div>
    </>)
};