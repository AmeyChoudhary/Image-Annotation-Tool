import React from "react";
import { useState } from "react";
import MyModels from "../../components/homepage/my_datasets";
import MyModels2 from "../../components/homepage/datasets_assigned";
import { withAuth } from "../../withAuth";

function HomePage() {
  const [copiedTimeoutId, setCopiedTimeoutId] = useState(-1);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [showCopied, setShowCopied] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-y-4 w-full px-10">
        <div className="w-full bg-white rounded-xl p-6">
          <MyModels
            copiedTimeoutId={copiedTimeoutId}
            copiedIndex={copiedIndex}
            showCopied={showCopied}
            setCopiedIndex={setCopiedIndex}
            setShowCopied={setShowCopied}
            setCopiedTimeoutId={setCopiedTimeoutId}
          />
        </div>
        <div className="w-full bg-white rounded-xl p-6">
          <MyModels2
            copiedTimeoutId={copiedTimeoutId}
            copiedIndex={copiedIndex}
            showCopied={showCopied}
            setCopiedIndex={setCopiedIndex}
            setShowCopied={setShowCopied}
            setCopiedTimeoutId={setCopiedTimeoutId}
          />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomePage);
