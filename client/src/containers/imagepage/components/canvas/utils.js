import PointerMode from "./modes/PointerMode"
import PolygonTool from "./modes/PolygonTool"
import FreeHand from "./modes/FreeHand"
import Rectangle from "./modes/Rectangle"
import DragTool from "./modes/DragTool"
import React from 'react';
import { useState } from 'react'


function limitAttributes(stage, newAttrs) {
    const box = stage.findOne('Image').getClientRect();
    const minX = -box.width + stage.width() / 2;
    const maxX = stage.width() / 2;
  
    const x = Math.max(minX, Math.min(newAttrs.x, maxX));
  
    const minY = -box.height + stage.height() / 2;
    const maxY = stage.height() / 2;
  
    const y = Math.max(minY, Math.min(newAttrs.y, maxY));
  
    const scale = Math.max(0.05, newAttrs.scale);
  
    return { x, y, scale };
  }
  