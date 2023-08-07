import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import Comment from "../../containers/comments";
import creds from "../../creds";
import { ToastContext } from "../../App";
import { TOAST_VARIANTS } from "../../packages/toasts/constants";
const url = creds.mysqlUrl;

export default function Image_table_my_datasets({ copiedTimeoutId, copiedIndex, showCopied, setCopiedIndex, setShowCopied, setCopiedTimeoutId, dataset_id }) {
    const [loading, setLoading] = useState(false);
    const [datasetData, setDatasetData] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const [Currentimageid, setCurrentimageid] = useState("");
    const { addToast } = useContext(ToastContext);
    const handleOnClose = () => setShowComment(false)
    const [commentdata, setCommentdata] = useState([]);
    useEffect(() => {
        axios.get(url + 'get_image_id/' + dataset_id)
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
                        message: "Image Data Synced successfully",
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
        console.log(url + "get_comment/" + Currentimageid);
        axios.get(url + 'get_comment/' + Currentimageid)
            .then(res => {
                console.log(res.data);
                if (res.data.error) {
                    addToast({
                        message: res.data.error,
                        variant: TOAST_VARIANTS.ERROR
                    })
                } else {
                    setCommentdata(res.data);
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
    }, [showComment]);

    return (<>
        <Comment visible={showComment} onClose={handleOnClose} imageid={Currentimageid} commentdata={commentdata} />
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
                            Assigned To
                        </th>
                        <th
                            className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Comments
                        </th>
                        <th
                            className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {datasetData.map((data, index) => (<tr>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            <span className="text-gray-900 whitespace-no-wrap">{data.dataset_image_id}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            <span className="text-gray-900 whitespace-no-wrap">{data.dataset_image_name}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            <span className="text-gray-900 whitespace-no-wrap">{data.dataset_image_last_updated}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            <span className="text-gray-900 whitespace-no-wrap">{data.dataset_image_status}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            <span className="text-gray-900 whitespace-no-wrap">{"None"}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                            {/* <Link to={'/comments'}> */}
                            <span className="text-gray-900 whitespace-no-wrap flex ">
                                <span className="text-gray-900 whitespace-no-wrap gap-2">{""}</span>
                                <svg onClick={() => { setShowComment(true); setCurrentimageid(data.dataset_image_id); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-slate-200 hover:cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                            </span>
                            {/* </Link> */}
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm flex">
                            <Link to={'/dataset-versions/' + data.dataset_id}>
                                <button className="btn btn-outline-info">
                                    View
                                </button>
                            </Link>
                            <Link to={'/dataset-versions/' + data.dataset_id}>
                                <button className="btn btn-outline-primary">
                                    Download
                                </button>
                            </Link>
                            <Link to={'/dataset-versions/' + data.dataset_id}>
                                <button className="btn btn-outline-warning">
                                    Assign
                                </button>
                            </Link>
                            <Link to={'/dataset-versions/' + data.dataset_id}>
                                <button className="btn btn-outline-success">
                                    Accept
                                </button>
                            </Link>
                        </td>
                    </tr>))}
                </tbody>
            </table> : <p>Image Information will appear here !</p>}
        </div>
    </>)
};