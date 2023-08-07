
function limitAttributes(stage, newAttrs) {
    const padding = 0;
    const box = stage.findOne('Image').getClientRect();
    const minX = -box.width + stage.width() -padding ;
    const maxX =  padding;
  
    const x = Math.max(minX, Math.min(newAttrs.x, maxX));
  
    const minY = -box.height + stage.height() -padding;
    const maxY =  padding;
  
    const y = Math.max(minY, Math.min(newAttrs.y, maxY));
  
    const scale = Math.max(0.05, newAttrs.scale);
  
    return { x, y, scale };
}

function getRelativePointerPosition(node) {
    // the function will return pointer position relative to the passed node
    const transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();
  
    // get pointer (say mouse or touch) position
    const pos = node.getStage().getPointerPosition();
  
    // now we find relative point
    return transform.point(pos);
}

export {limitAttributes,getRelativePointerPosition}