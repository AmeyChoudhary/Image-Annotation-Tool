import React, { createContext } from "react";
import { Navbar } from "./components";
import {
  Home,
  HomePage,
  ViewPage_my_dataset,
  ViewPage_dataset_assigned,
  AddDataset,
  Imageupload,
  ImagePage
} from "./containers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./components/login/SignInForm";
import SignUpForm from "./components/login/SignUpForm";
import { ToastComponent } from "./packages/toasts/Toast";
import { useToast } from "./packages/hooks/useToast.js"
import "./App.css";
import { Navigate } from "react-router-dom";

export const ToastContext = createContext();

function App() {

  const { toastData, addToast, deleteToast } = useToast();
  // const navigate = useNavigate();
  return (
    <Router>
      <div className="App">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"></link>
        <div className="navbar__bg" style={{ position: "sticky", top: 0 }}>
          <Navbar />
        </div>
        <ToastContext.Provider value={{ addToast }}>
          <Routes>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<SignInForm />} />
            <Route path="/about" element={<Home />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/datasets" element={<HomePage />} />
            <Route path="/add-dataset" element={<AddDataset />} />
            <Route path="/view-my-dataset/:dataset_id" element={<ViewPage_my_dataset />} />
            <Route path="/view-dataset-assigned" element={<ViewPage_dataset_assigned />} />
            <Route path="/add-image/:dataset_id" element={<Imageupload />} />
            <Route path="/imagepage/:dataset_id" element={<ImagePage />} />
          </Routes>
        </ToastContext.Provider>
        <ToastComponent toastData={toastData} deleteToast={deleteToast} />
      </div>
    </Router>
  );
}

export default App;