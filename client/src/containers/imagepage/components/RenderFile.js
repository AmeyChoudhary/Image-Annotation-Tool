import React, { useEffect, useState } from "react";
import axios, { all } from 'axios';
import OpenSeadragonViewer from "./OpenSeadragonViewer";
import './RenderFile.css'
import BarLoader from "react-spinners/BarLoader";
import { config } from "../config";
import Canvas from "./canvas/Canvas";
import { StageContextProvider } from "../ContextProvider";
import { Stage } from "react-konva";
import { createRef } from "react";
import ToolBox from "./toolbox/ToolBox";
import LabelBox from "./labelbox/LabelBox";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import TopBar from "./topBar/TopBar";
import MainBanner from './mainbanner/MainBanner';
import SetupPipeline from './pipeline/SetupPipeline';
import Toolbar from './pipelinetool/Toolbar';
import Dropdown from 'react-dropdown'
import { Button } from "react-bootstrap";


function RenderFile(props) {
    const [viewerImage, setViewerImage] = useState();
    const [imageName, setImageName] = useState();
    const [allImages, setAllImages] = useState([]);
    const [allImageName, setAllImageName] = useState([]);
    const isFirstRender = React.useRef(true);
    const [selected, setSelected] = useState([false, false, false, false, false]);
    const [mouseDowntime, setMouseDowntime] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [selectedOption, setSelectedOption] = useState('Annotate');

    const options = ['Annotate', 'Download(with annotation)', 'Download(without annotation)', 'Comments', 'Pipeline', 'Image Details']
    const onOptionChangeHandler = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
    }


    const handleMouseDown = (e) => {
        setMouseDowntime(e.timeStamp);
    };
    const handleMouseUp = (e) => {
        // if (e.timeStamp - mouseDowntime > 500) {
        //     setSelected([...selected, selected[i] = true]);
        // }
    }


    // useEffect(() => {
    //     if (selected)
    //         setOpacity(0.5);
    //     else {
    //         setOpacity(1)
    //     }
    // }, [selected]);

    useEffect(() => {
        setAllImageName(props.info);
        console.log(props);
        if (isFirstRender.current) {
            console.log("Getting image links");
            getAllImageLinks();
            if (props.info.length > 0) {
                isFirstRender.current = false;
            }
            return;
        }
        if (props.currFile != null) {
            if (isFirstRender.current) {
                console.log("Getting image links");
                getAllImageLinks();
                if (props.info.length > 0) {
                    isFirstRender.current = false;
                }
                return;
            } else {
                let imageObj = { imageName: props.currFile };
                axios.get(config.BASE_URL + "/getURL/" + props.email, { params: imageObj })
                    .then((response) => response.data.image)
                    .then((image) => {
                        setAllImages((prevValue) => [...prevValue, image]);
                    })
                    .catch((error) => {
                        console.log(error);
                        return null;
                    });
            }
        } else {
            setAllImages((prevFilesLink) => {
                return prevFilesLink.filter((link, index) => {
                    return index !== allImageName.indexOf(props.deletedFileName);
                });
            });
        }
    }, [props.info]);

    async function getAllImageLinks() {
        try {
            const response = await Promise.all(
                props.info.map((image) => {
                    let imageObj = { imageName: image };
                    return axios.get(config.BASE_URL + "/getURL/" + props.email, { params: imageObj })
                        .then((response) => response.data.image)
                        .catch((error) => {
                            console.log(error);
                            return null;
                        });
                })
            );
            setAllImages(response);
        } catch (error) {
            console.log(error);
        }
    }

    function handleClick(e) {
        let num = e.target.id;
        setViewerImage(allImages[num]);
        setImageName(props.info[num]);
    }

    function handleDelete(event, file) {
        props.onDelete(event, file);
        setViewerImage();
    }

    function updateStateArr(idx) {
        console.log(selected)
        const newArray = [...selected];
        newArray[idx] = !newArray[idx];
        setSelected(newArray);
    };

    const stageRef = createRef();
    return (
        <div className="render-file-container">

            <div className="grid grid-cols-1">
                <div className="button-container">
                    {allImageName.map((file, i) => {
                        const buttonStyles_nonselected = {
                            margin: '10px',
                            backgroundImage: allImages[i] ? `url(${allImages[i]})` : 'none',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            color: '#333',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            height: '100px',
                            width: '100px',
                            opacity: 1,
                        };
                        const buttonStyles_selected = {
                            margin: '10px',
                            backgroundImage: allImages[i] ? `url(${allImages[i]})` : 'none',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            color: '#333',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            height: '100px',
                            width: '100px',
                            opacity: 0.5,
                        };
                        return (
                            <div>
                                <img onClick={handleClick} style={selected[i] ? buttonStyles_selected : buttonStyles_nonselected} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} key={i} id={i} />
                                <div className="name-del">
                                    <p id="image-name">{file.split("/")[2]}</p>
                                    <input type="checkbox" checked={selected[i]} onClick={() => updateStateArr(i)} />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="col-span-1 p-4">
                    <div className="flex">
                        <select onChange={onOptionChangeHandler} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {options.map((option, i) => {
                                return <option value={option}>{option}</option>
                            })}
                        </select>
                        <button class="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-2">
                            Go
                        </button>
                    </div>
                </div>
                {/* </div> */}
            </div>


            {/* <div className="viewer-container" style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(218,235,250)', textAlign: 'center', overflow: 'hidden', flex: '100%' }}>
                <div className="viewer" style={{ width: '100%', height: '100%' }}>
                    {selectedOption === 'Annotate' && viewerImage ?
                        <StageContextProvider stageRef={stageRef}>
                            <div style={{ width: '113%' }}>
                                <TopBar />
                            </div>
                            <Row >
                                <span style={{ width: "50vw", height: '80vh', overflow: 'hidden', position: 'absolute' }}>
                                    <ToolBox />
                                </span>
                                <Col xs={10}>
                                    <div style={{ width: '100%', overflow: 'hidden' }}>
                                        <Row>
                                            <span style={{ width: "50vw", height: '100vh', overflow: 'hidden', position: 'absolute' }}>
                                                <ToolBox />
                                            </span>
                                            <span style={{ overflow: 'hidden', marginTop: '5px', marginLeft: '55px', width: '100vw', height: '100vh', maxHeight: '100vh' }} className="right-panel">
                                                <Canvas imageURL={viewerImage} />
                                            </span>
                                        </Row>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Row>
                                            <LabelBox />
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </StageContextProvider>
                        :
                        (selectedOption === 'Pipeline' ?
                            <>
                                <MainBanner />
                                <SetupPipeline />
                                <Toolbar />
                            </> :
                            <p>Select an image to view</p>)}
                </div>
            </div> */}

            <div>
                {selectedOption === 'Annotate' && <div className="viewer-container" style={{ width: '75vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(218,235,250)', textAlign: 'center', overflow: 'hidden', flex: '100%' }}>
                    <div className="viewer" style={{ width: '100%', height: '100%' }}>
                        {viewerImage ?
                            <StageContextProvider stageRef={stageRef}>
                                <div style={{ width: '113%' }}>
                                    <TopBar />
                                </div>
                                <Row >
                                    <span style={{ width: "50vw", height: '80vh', overflow: 'hidden', position: 'absolute' }}>
                                        <ToolBox />
                                    </span>
                                    <Col xs={10}>
                                        <div style={{ width: '100%', overflow: 'hidden' }}>
                                            <Row>
                                                <span style={{ width: "50vw", height: '100vh', overflow: 'hidden', position: 'absolute' }}>
                                                    <ToolBox />
                                                </span>
                                                <span style={{ overflow: 'hidden', marginTop: '5px', marginLeft: '55px', width: '100vw', height: '100vh', maxHeight: '100vh' }} className="right-panel">
                                                    <Canvas imageURL={viewerImage} />
                                                </span>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col xs={2}>
                                        <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
                                            <Row>
                                                <LabelBox />
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </StageContextProvider>
                            : <p>Select an image to view</p>}
                    </div>
                </div>}
                {selectedOption === 'Pipeline' &&
                    <div style={{ width: '80vw' }}>
                        <MainBanner />
                        <SetupPipeline />
                        <Toolbar />
                    </div>
                }
            </div>

        </div >



    )
}

export default RenderFile;


