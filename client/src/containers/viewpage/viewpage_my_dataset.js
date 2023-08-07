import React from "react";
import { useState } from "react";
import Desc_my_datasets from "../../components/view_my_datasets/desc";
import Image_table_my_datasets from "../../components/view_my_datasets/image_table";
import { withAuth } from "../../withAuth";
import { useParams } from "react-router-dom";

function ViewPage_my_dataset() {
    const [copiedTimeoutId, setCopiedTimeoutId] = useState(-1);
    const [copiedIndex, setCopiedIndex] = useState(-1);
    const [showCopied, setShowCopied] = useState(false);
    const { dataset_id } = useParams();
    return (
        <>
            <div className="flex flex-col gap-y-4 w-full px-10">
                <div className="w-full bg-white rounded-xl p-6">
                    <Desc_my_datasets
                        copiedTimeoutId={copiedTimeoutId}
                        copiedIndex={copiedIndex}
                        showCopied={showCopied}
                        setCopiedIndex={setCopiedIndex}
                        setShowCopied={setShowCopied}
                        setCopiedTimeoutId={setCopiedTimeoutId}
                        dataset_id={dataset_id}
                    />
                </div>
                {/* <div className="w-full bg-white rounded-xl p-6">
                    <Image_table_my_datasets
                        copiedTimeoutId={copiedTimeoutId}
                        copiedIndex={copiedIndex}
                        showCopied={showCopied}
                        setCopiedIndex={setCopiedIndex}
                        setShowCopied={setShowCopied}
                        setCopiedTimeoutId={setCopiedTimeoutId}
                        dataset_id={dataset_id}
                    />
                </div> */}
            </div>
        </>
    );
}

export default withAuth(ViewPage_my_dataset);
