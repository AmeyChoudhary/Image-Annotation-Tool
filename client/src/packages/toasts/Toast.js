import { CustomToast } from "./toastComponent"

export const ToastComponent = ({toastData, deleteToast}) => {
  return (
    <div className="sticky top-10 z-50">
      <div className="fixed bottom-5 right-5">
        <CustomToast toastData={toastData} deleteToast={deleteToast}/>
      </div>
    </div>
  )
}