import React, { Component, createContext, useContext, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import useStore from '../../library/store';
import "./style.css"
//function ToolBox({ onSelect }) {


import StageContext from '../../ContextProvider'
import {limitAttributes} from '../../library/utils'


function TopBar(props) {
  let [zoomOut,setZoomOut] = useState(true)
  const currUser = useStore(s => s.currUser);
  const imageList = useStore(s => s.imageList);
  const server = useStore(s => s.server);
  const selectedId = useStore(s => s.selectedRigionId);
  const regions = useStore((state) => state.regions);
  const setRegions = useStore((state) => state.setRegions);
  const selectedRegions = useStore((s) => s.selectedRegions);
  const setSelectedRegions = useStore((s) => s.setSelectedRegions);
  let imageIndex = useStore((state) => state.imageIndex);
  const setImageIndex = useStore((state) => state.setRegions);
  const {stageRef,count_images} = useContext(StageContext);  
  const stageScale = useStore((state) => state.stageScale);
  const setStageScale = useStore((state) => state.setStageScale);
  const imageWidth = useStore((state) => state.imageWidth);
  const orignalScale = useStore((state) => state.orignalScale);
  const adminMode = useStore((state) => state.adminMode);
  const [nextDisable,setNextDisable] = useState(false);
  const [prevDisable,setPrevDisable] = useState(false);
  const setCurrImage = useStore((state) => state.setCurrImage);
  const navigate = useNavigate();
  let user = adminMode?'mod':'user'
  console.log(props)
  const saveRegions = () => {
    //let regs = {"id": 23, "points": {"x": 0, "y": 0}}
    let rq_body = {
      'user_id' : currUser,
      'image_id' : imageList[props.image_indx],
      'regions' : regions
    }
    let url = server + "/posts/add_"+user+"_annotation"
    console.log(url)
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': currUser
      },
      body: JSON.stringify(rq_body)
    }).then(data => data.json()).then(json => alert(JSON.stringify(json)))
  }

  async function loadRegions(){
    let id = imageList[props.image_indx]
    let url = server + "/posts/get_"+user+"_annotation/" + id
    console.log(url)
    let res = await fetch(url, {
      method: 'GET',
      headers: { 'auth-token': currUser }
    })

    let obj = await res.json();
    let reg = obj.data[0].regions;
    console.log(obj)
    setRegions(reg)
  }

  // async function prev(){
  //   console.log(imageIndex)
  //   if(imageIndex>0 ){
  //     //imageIndex += x;

  //     if(imageIndex-1==0){
  //       setPrevDisable(true);
  //     }else{
  //       setPrevDisable(false);
  //     }
  //     //loadRegions();
  //     console.log(imageList[imageIndex-1])
  //     //setCurrImage(imageList[imageIndex])
  //     //setImageIndex(imageIndex+x)
  //     //
  //   }
  // }
  // async function next(){
  //   console.log(imageIndex)
  //   if(imageIndex < count_images-1){
  //     //imageIndex += x;
  //     if(imageIndex+1==count_images){
  //       setNextDisable(true);
  //     }else{
  //       setNextDisable(false);
  //     }
      
  //     //loadRegions();
  //     console.log(imageList[imageIndex+1])
  //     // setCurrImage(imageList[imageIndex+1])
  //     setImageIndex(imageIndex+1)
  //     //
  //   }
  // }

  async function prev(){
    let ser = "http://localhost:3000"
    let indx = Number(props.image_indx )
    if(indx>0 ){
      indx-=1
      if(indx==0){
        setPrevDisable(true);
      }else{
        setPrevDisable(false);
      }
      window.location.replace(ser+'/'+props.user_type+'/'+indx);
    }
  }
  async function next(){
    let ser = "http://localhost:3000"
    let indx = Number(props.image_indx)
    if(indx < count_images-1){
      indx+=1
      if(indx==count_images-1){
        setNextDisable(true);
      }else{
        setNextDisable(false);
      }
      console.log('/'+props.user_type+'/'+indx)
      window.location.replace(ser + '/'+props.user_type+'/'+indx);
      
    }
  }
  function zoomStage(stage, scaleBy) {
    if(scaleBy > 1 || zoomOut){
      
      const oldScale = stage.scaleX();
      
      const pos = {
        x: stage.width() / 2,
        y: stage.height() / 2,
      };
      const mousePointTo = {
        x: pos.x / oldScale - stage.x() / oldScale,
        y: pos.y / oldScale - stage.y() / oldScale,
      };
      
      const newScale = Math.max(stage.width()/imageWidth, oldScale * scaleBy);
    
      const newPos = {
        x: -(mousePointTo.x - pos.x / newScale) * newScale,
        y: -(mousePointTo.y - pos.y / newScale) * newScale,
      };
      const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });
      if(newAttrs.scale <= orignalScale){
        stage.to(orignalScale);
        setStageScale(orignalScale)
        setZoomOut(false)

      }else{
        setZoomOut(true)
      
        stage.to({
          x: newAttrs.x,
          y: newAttrs.y,
          scaleX: newAttrs.scale,
          scaleY: newAttrs.scale,
          duration: 0.1,
        });
        setStageScale({
          x: newAttrs.x,
          y: newAttrs.y,
          scaleX: newAttrs.scale,
          scaleY: newAttrs.scale,
        })
      }
    }
  }
  
  return (
    <div className="zoom-container" style ={{ fontFamily:"Roboto" , fontSize:'1em'}}> 
        <div className="toolbar-horizontal">
          <div className="container-fluid">
              <div className="btn-toolbar">
                <button className="btn btn-default" 
                          data-toggle="tooltip" 
                          data-placement="bottom" 
                          data-container="body" 
                          title="Zoom In"
                          onClick={() => {
                                    zoomStage(stageRef.current, 1.2);
                }}
                > <img
                className  = "icon-toolbar"
                src="icons\zoom_in.svg"
                alt="+"
                /> </button>
                <button className="btn btn-default" 
                          data-toggle="tooltip" 
                          data-placement="bottom" 
                          data-container="body" 
                          title="Zoom Out"
                          disabled = {!zoomOut}
                          onClick={() => {
                                    zoomStage(stageRef.current, 0.8);
                }}
                > <img
                  className  = "icon-toolbar"
                  src="icons\zoom_out.svg"
                  alt="-"
                /> </button>
                <button className = "button-toolbar" onClick={()=>{loadRegions()}}> Load </button>
                <button className = "button-toolbar" onClick={()=>{saveRegions()}}> Save </button>
                <button className="btn btn-default" 
                          data-toggle="tooltip" 
                          data-placement="bottom" 
                          data-container="body" 
                          title="Prev"
                          disabled = {prevDisable}
                          onClick={() => {prev()}}
                > <img
                  className  = "icon-toolbar"
                  src="icons\prev.png"
                  alt="-"
                /> </button>  
                <button className="btn btn-default" 
                          data-toggle="tooltip" 
                          data-placement="bottom" 
                          data-container="body" 
                          title="Next"
                          disabled = {nextDisable}
                          onClick={() => {next()}}
                > <img
                  className  = "icon-toolbar"
                  src="icons\next.png"
                  alt="-"
                /> </button>  
               
            </div>
          </div>
        </div>
    </div>
  );
  };

export default TopBar;