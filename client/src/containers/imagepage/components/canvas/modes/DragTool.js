import React from 'react';
import Konva from 'konva';
import { Stage } from 'react-konva';

import Regions from '../Regions';
import BaseImage from '../BaseImage';
import { useContext } from "react";
import StageContext from '../../../ContextProvider'
import useStore from '../../../library/store';
import {limitAttributes} from '../../../library/utils'

let id = 1;
var isDragging = false;
var startX, startY, endX, endY;

export default (props) => {
  const imageURL = props.imageURL;
  const { width, height } = useStore((s) => ({
    width: s.width,
    height: s.height,
  }));
  const setSize = useStore((s) => s.setSize);
  const scale = useStore((state) => state.scale);
  const setScale = useStore((state) => state.setScale);
  const isDrawing = useStore((state) => state.isDrawing);
  const toggleDrawing = useStore((state) => state.toggleIsDrawing);
  const setStageScale = useStore((state) => state.setStageScale);
  const regions = useStore((state) => state.regions);
  const setRegions = useStore((state) => state.setRegions);

  // var currStart = null;
  let isMouseOverStartPoint = 0;
  // const isMouseOverStartPoint = useStore((state) => state.isDrawing);
  // const setIsMouseOverStartPoint = useStore((state) => state.setIsMouseOverStartPoint);

  const handleMouseDown = (e) => {
    isDragging = true;
      startX = e.evt.clientX;
      startY = e.evt.clientY;
      //console.log(e.evt)
  }
  const handleMouseUp = (e) => {
    isDragging =false
    const stage = stageRef.current;
    endX = e.evt.clientX;
    endY = e.evt.clientY;
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    const pos = limitAttributes(stage, {
      x:   stage.x() + deltaX,
      y:   stage.y() + deltaY,
      scale: stage.scaleX(),
    });
    
    //console.log(pos)

    stageRef.current.position(pos);
    console.log()
    setStageScale({ x:pos.x,y:pos.y,scaleX:pos.scale,scaleY:pos.scale})
  }
  const handleMouseMove = (e) => {
    if (isDragging){
      const stage = stageRef.current;
      endX = e.evt.clientX;
      endY = e.evt.clientY;
      var deltaX = endX - startX;
      var deltaY = endY - startY;
      const pos = limitAttributes(stage, {
        x:   stage.x() + deltaX,
        y:   stage.y() + deltaY,
        scale: stage.scaleX(),
      });
      startX = e.evt.clientX;
    startY = e.evt.clientY;
      //console.log(pos)
      stageRef.current.position(pos);
    }
  }
  const currStart = useStore((state) => state.currStart);
  const setCurrStart = useStore((state) => state.setCurrStart);

  const region_color = useStore((state) => state.color);

  const selectRegion = useStore((s) => s.selectRegion);
  const stageScale = useStore((state) => state.stageScale);
  const load_scale = (stageRef,stageScale) =>{
    stageRef.current.x(stageScale.x)
    stageRef.current.y(stageScale.y)
    stageRef.current.scaleX(stageScale.scaleX)
    stageRef.current.scaleY(stageScale.scaleY)
  }
  React.useEffect(() => {
    function checkSize() {
      const container = document.querySelector('.right-panel');
      setSize({
        width: container.offsetWidth*0.92,
        height,
      });
    }
    checkSize();
    window.addEventListener('resize', checkSize);
    load_scale(stageRef,stageScale);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  const {stageRef,_} = useContext(StageContext);
    return (
      <React.Fragment>
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          scaleX={scale}
          scaleY={scale}
          className="canvas"
          onClick={(e) => {
            e.evt.preventDefault();
          }}
          onWheel={(e) => {
            e.evt.preventDefault();
            const stage = stageRef.current;
  
            const dx = -e.evt.deltaX;
            const dy = -e.evt.deltaY;
            const pos = limitAttributes(stage, {
              x: stage.x() + dx,
              y: stage.y() + dy,
              scale: stage.scaleX(),
            });
            stageRef.current.position(pos);
          }}

          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <BaseImage imageURL = { imageURL} stageRef = {stageRef} style={{ maxheight: '80vh' }}/>
          <Regions stageRef = {stageRef}/>
        </Stage>
        
      </React.Fragment>
    );  
};
