import React from "react";
import { Image, Layer } from "react-konva";
import useImage from "use-image";
import { useContext } from "react";
import useStore from "../../library/store";
import StageContext from '../../ContextProvider'
const IMAGE_NUMBER = 1 + Math.round(Math.random() * 1);
const IMAGE_URL = `image-${IMAGE_NUMBER}.jpg`;

export default (props) => {
  const currImage = props.imageURL;
  const imageList = useStore(state => state.imageList);
  const imageIndex = useStore((state) => state.imageIndex);
  const setImageIndex = useStore((state) => state.setRegions);
  const [image] = useImage(currImage, "Anonymous");
  // const [image] = useImage("https://upload.wikimedia.org/wikipedia/commons/archive/f/f5/20081216020702%21Poster-sized_portrait_of_Barack_Obama.jpg", "Anonymous");

  const setImageSize = useStore(state => state.setImageSize);
  const scale = useStore(state => state.scale);
  const setScale = useStore(state => state.setScale);
  const setSize = useStore(state => state.setSize);
  const width = useStore(state => state.width);
  const height = useStore(state => state.height);
  const stageScale = useStore((state) => state.stageScale);
  const { brightness } = useStore();
  const setStageScale = useStore((state) => state.setStageScale);
  const setOrignalScale = useStore((state) => state.setOrignalScale);
  const handleLoad = (image, width, height, setScale, setImageSize, setSize) => {
      // if (!image) {
      //   return;
      // }
      // let temp_scale = 1;
      // let ratio = 1;
      // console.log(image.width, image.height)
      // console.log(width, height)

      // if( image.width > image.height){
      //   ratio = image.width / image.height;
      //   temp_scale = width / image.width;
      //   setSize({
      //     width: width  ,
      //     height: width / ratio
      //   });
      // }else{
      //   ratio =  image.height/image.width;
      //   temp_scale = height / image.height;
      //   setSize({
      //     width: height  / ratio,
      //     height: height
      //   });

      // }
      // if(scale == 0){
      //     stageScale.scaleX = temp_scale
      //     stageScale.scaleY = temp_scale
      //     setStageScale(stageScale)
      //     setOrignalScale(stageScale)
      // }
      // setImageSize({ width: image.width, height: image.height });
      // setScale(temp_scale);

      if (!image) {
        return;
      }

      let temp_scale = 1;
      let ratio = 1;
      let scaledWidth = 0;
      let scaledHeight = 0;

      console.log("Before")
      console.log(image.width, image.height)
      console.log(width, height)
      console.log(scaledWidth, scaledHeight)

      if(width/image.width < height/image.height){
        console.log("width/image.width < height/image.height")
        ratio = width / image.width;
        temp_scale = width / image.width;
        scaledWidth = width;
        scaledHeight = image.height * ratio;
      }
      else{
        console.log("width/image.width > height/image.height")
        ratio = height / image.height;
        temp_scale = height / image.height;
        scaledWidth = image.width * ratio;
        scaledHeight = height;
      }

      console.log("After")
      console.log(image.width, image.height)
      console.log(width, height)
      console.log(scaledWidth, scaledHeight)

      // setSize({
      //   width: scaledWidth,
      //   height: scaledHeight
      // });

      console.log("After2")
      console.log(image.width, image.height)
      console.log(width, height)
      console.log(scaledWidth, scaledHeight)

      if(scale == 0){
          stageScale.scaleX = temp_scale
          stageScale.scaleY = temp_scale
          setStageScale(stageScale)
          setOrignalScale(stageScale)
      }

      setImageSize({ width: scaledWidth, height: scaledHeight });
      setScale(temp_scale);

      console.log("end")
      console.log(image.width, image.height)
      console.log(width, height)
      console.log(scaledWidth, scaledHeight)
    }

  React.useEffect(() => {
    handleLoad(image, width, height, setScale, setImageSize, setSize)
  }, [image, width, height, setScale, setImageSize, setSize]);
  // const setScale = useStore((state) => state.setScale);
  const layerRef = React.useRef(null);
  const image_width = '70px'
  const image_height = '70px'
  return (
    <Layer ref={layerRef}>
      <Image image={image} style={{width:"10vw", height:"10vh"}} />
    </Layer>
  );
};

