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
  let isMouseOverStartPoint = 0;
  // const isMouseOverStartPoint = useStore((state) => state.isDrawing);
  // const setIsMouseOverStartPoint = useStore((state) => state.setIsMouseOverStartPoint);


  const currStart = useStore((state) => state.currStart);
  const setCurrStart = useStore((state) => state.setCurrStart);

  const region_color = useStore((state) => state.color);
  

  const selectRegion = useStore((s) => s.selectRegion);
  const setScale = useStore((state) => state.setScale);
  const selectedRegions = useStore((s) => s.selectedRegions);
  const setSelectedRegions = useStore((s) => s.setSelectedRegions);
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
            const clickedNotOnRegion = e.target.name() !== 'region';
            //console.log(e.target)
            if(clickedNotOnRegion){
              selectedRegions.clear() 
            }else{
              
              if(e.target.closed()){
                if(selectedRegions.has(e.target.id())){
                  selectedRegions.delete(e.target.id());
                }else{
                  selectedRegions.add(e.target.id());
                }
              }
            }
            setSelectedRegions(selectedRegions)
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
          onMouseDown={(e) => {
            e.evt.preventDefault();
          }}
          onMouseMove={(e) => {
            e.evt.preventDefault();
          }}
          onMouseUp={(e) => {
            e.evt.preventDefault();
          }}
        > 
          <BaseImage imageURL = { imageURL} stageRef = {stageRef}/>
          <Regions stageRef = {stageRef} />
        </Stage>
        
      </React.Fragment>
    );  
};
