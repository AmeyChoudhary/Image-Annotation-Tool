import React from 'react';
import Konva from 'konva';
import { Stage } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Regions from '../Regions';
import BaseImage from '../BaseImage';
import { useContext } from "react";
import StageContext from '../../../ContextProvider'
import useStore from '../../../library/store';
import {limitAttributes,getRelativePointerPosition} from '../../../library/utils'
let id = 1;



export default (props) => {
  const imageURL = props.imageURL;
  const { width, height } = useStore((s) => ({
    width: s.width,
    height: s.height,
  }));
  const setSize = useStore((s) => s.setSize);
  const scale = useStore((state) => state.scale);
  const isDrawing = useStore((state) => state.isDrawing);
  const toggleDrawing = useStore((state) => state.toggleIsDrawing);

  const regions = useStore((state) => state.regions);
  const setRegions = useStore((state) => state.setRegions);

  // var currStart = null;
  // let isMouseOverStartPoint = 0;
  const isMouseOverStartPoint = useStore((state) => state.isMouseOverStartPoint);
  const setIsMouseOverStartPoint = useStore((state) => state.setIsMouseOverStartPoint);


  const currStart = useStore((state) => state.currStart);
  const setCurrStart = useStore((state) => state.setCurrStart);

  const region_color = useStore((state) => state.color);
  
  const setScale = useStore((state) => state.setScale);
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
          //to select a bounded label
            const clickedNotOnRegion = e.target.name() !== 'region';
            if (clickedNotOnRegion  || isDrawing) {
              // selectRegion(null);
              const point = getRelativePointerPosition(e.target.getStage()); 
              if (!isDrawing || currStart==null) {
                toggleDrawing(true);
                setCurrStart(point);
                setIsMouseOverStartPoint(0);
                const region = {
                    id: uuid(),
                    isComplete : false,
                    isEditable : true,
                    color: region_color,
                    points: [point],
                };
                setRegions(regions.concat([region]));
              }else{
                const lastRegion = { ...regions[regions.length - 1] };                              
                lastRegion.points = lastRegion.points.concat([point]);

                regions.splice(regions.length - 1, 1);
                if(isMouseOverStartPoint){
                  lastRegion.isComplete = true;
                  //console.log("shape complitied")
                  toggleDrawing(false);
                  //setIsMouseOverStartPoint(0);
                  setCurrStart(null);
                }
                setRegions(regions.concat([lastRegion]));
              
              }
            }
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

      >
        <BaseImage imageURL = { imageURL} stageRef = {stageRef}/>
        <Regions stageRef = {stageRef}/>
      </Stage>
    </React.Fragment>
  );

};
