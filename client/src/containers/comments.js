import React, { useContext, useState, useEffect } from "react";
import creds from "../creds";
import { ToastContext } from "../App";
import { TOAST_VARIANTS } from "../packages/toasts/constants";
import axios from "axios";

export default function Comment({ visible, onClose, imageid, commentdata }) {
    const url = creds.mysqlUrl;
    const { addToast } = useContext(ToastContext);
    const [content, setcontent] = useState("");
    const [datasetData, setDatasetData] = useState([]);
    const authorId = JSON.parse(localStorage.getItem('dfs-user'))['user']['user_email'];

    console.log(commentdata);

    const submit = () => {
        axios.post(url + 'add_comment', {
            "image_id": imageid,
            "content": content,
            "commented_by": authorId,
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
                }
            })
            .catch(err => {
                addToast({
                    message: "Server Error " + JSON.stringify(err),
                    variant: TOAST_VARIANTS.ERROR
                })
                console.log(err)
            })
    }
    if (!visible) return null;
    return (

        < div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center" >
            <div className="bg-slate-100 p-2 rounded h-50 w-50">
                <h1 className="font-semibold text-center text-xl text-gray-700">
                    Comments
                </h1>
                {/* <p className="text-center text-gray-700 mb-5">Sign in</p> */}

                <div className="flex flex-col">
                    <input
                        type="text"
                        className="border border-gray-700 p-2 rounded mb-3"
                        placeholder="Type Here ..."
                        onChange={e => setcontent(e.target.value)}
                    />
                    <div className="text-center">
                        <button className=" rounded-full btn btn-outline-warning mb-2 " onClick={() => submit()}>
                            Add
                        </button>
                    </div>
                </div>
                <hr />

                <div className="text-center mb-100">
                    
                    {commentdata.map((data) => (
                        <>
                            <div class="place-self-stretch bg-slate-200 text-center hover:cursor-pointer  hover:bg-slate-400">{data.comment_time}</div>
                            <div class="place-self-stretch bg-slate-50 text-center hover:cursor-pointer hover:bg-slate-100">{data.comment_content}</div></>))}
                </div>
                <hr />
                <div className="text-center">
                    <button className="rounded-full btn btn-outline-danger" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div >
    );
}