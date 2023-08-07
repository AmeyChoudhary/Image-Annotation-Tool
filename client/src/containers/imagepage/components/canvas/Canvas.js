import PointerMode from "./modes/PointerMode"
import PolygonTool from "./modes/PolygonTool"
import FreeHand from "./modes/FreeHand"
import Rectangle from "./modes/Rectangle"
import DragTool from "./modes/DragTool"
import React from 'react';
import { useState, useContext } from 'react'
// import {MDCTabBar} from '@material/tab-bar';
import useStore from '../../library/store';
import ModerationTool from "./modes/ModerationTool"

export default (props) => {
    const imageURL = props.imageURL;
    const tool = useStore((state) => state.tool)
    const setCanvasMode = (id) => {
      switch(id) {
          case 0:  return <PointerMode imageURL={imageURL}/>;
          case 1:  return <PolygonTool imageURL = {imageURL}/>;
            case 2:  return <FreeHand imageURL = {imageURL}/>;
            case 3:  return <Rectangle imageURL = {imageURL}/>;
            case 4:  return <DragTool imageURL = {imageURL}/>;
            case 5:  return <ModerationTool imageURL = {imageURL}/>;
            default: return <PointerMode imageURL={imageURL}/>;
            
      }
    }
    return (
        <React.Fragment>
            {setCanvasMode(tool.id)}
        </React.Fragment>
    )
    
}