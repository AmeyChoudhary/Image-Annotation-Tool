import React from "react";
import { useState } from "react";
import Desc_datasets_assigned from "../../components/view_datasets_assigned/desc"
import Image_table_datasets_assigned from "../../components/view_datasets_assigned/image_table";
import { withAuth } from "../../withAuth";

function ViewPage_my_dataset() {
    const [copiedTimeoutId, setCopiedTimeoutId] = useState(-1);
    const [copiedIndex, setCopiedIndex] = useState(-1);
    const [showCopied, setShowCopied] = useState(false);
    return (
        <>
            <div className="flex flex-col gap-y-4 w-full px-10">
                <div className="w-full bg-white rounded-xl p-6">
                    <Desc_datasets_assigned
                        copiedTimeoutId={copiedTimeoutId}
                        copiedIndex={copiedIndex}
                        showCopied={showCopied}
                        setCopiedIndex={setCopiedIndex}
                        setShowCopied={setShowCopied}
                        setCopiedTimeoutId={setCopiedTimeoutId}
                    />
                </div>
                {/* <div className="w-full bg-white rounded-xl p-6">
                    <Image_table_datasets_assigned
                        copiedTimeoutId={copiedTimeoutId}
                        copiedIndex={copiedIndex}
                        showCopied={showCopied}
                        setCopiedIndex={setCopiedIndex}
                        setShowCopied={setShowCopied}
                        setCopiedTimeoutId={setCopiedTimeoutId}
                    />
                </div> */}
            </div>
        </>
    );
}

export default withAuth(ViewPage_my_dataset);
