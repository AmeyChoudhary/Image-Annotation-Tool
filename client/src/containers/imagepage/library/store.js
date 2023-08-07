import create from "zustand";

const [useStore] = create(set => ({
  width: window.innerWidth,
  height: window.innerHeight,
  setSize: ({ width, height }) => set({ width, height }),

  imageWidth: 100,
  imageHeight: 100,

  setImageSize: size =>
    set(() => ({ imageWidth: size.width, imageHeight: size.height })),
  scale: 0,
  setScale: scale => set({ scale }),

  isDrawing: false,
  toggleIsDrawing: isDrawing => set(state => ({ isDrawing })),

  regions: [],
  setRegions: regions => set(state => ({ regions })),

  isMouseOverStartPoint: 0,
  setIsMouseOverStartPoint: isMouseOverStartPoint => set(state => ({ isMouseOverStartPoint })),

  currStart: null,
  setCurrStart: currStart => set(state => ({ currStart })),

  prevStart: null,
  setPrevStart: prevStart => set(state => ({ prevStart })),

  selectedRigionId: null,
  selectRegion: selectedRigionId => set({ selectedRigionId }),

  tool : {id:0},
  setTool : tool => set({tool}),
  
  checkList: [],
  setCheckList: checkList => set(state => ({ checkList })),
  
  color : "black",
  setColor : color => set({color}),

  dataset : "cancer",
  setDataset : dataset => set({dataset}),

  server : "http://localhost:3031",
  setServer : server => set({server}),

  labels : [
    { id: 1, name: 'Cancer cell', color: 'Red' },
    { id: 2, name: 'Normal cell', color: 'Blue' }
  ],
  setLabels : labels => set(state => ({ labels })),

  imageList: [],
  setImageList: imageList => set(state => ({ imageList })),
  
  userList: [],
  setUserList: userList => set(state => ({ userList })),

  currUser : "",
  setCurrUser : currUser => set({currUser}),

  currImage : "black",
  setCurrImage : currImage => set({currImage}),

  adminMode : false,
  setAdminMode : adminMode => set({adminMode}),

  annotaionsList: [],
  setAnnotaionsList: annotaionsList => set(state => ({ annotaionsList })),

  imageIndex : 0,
  setImageIndex : index => set( state => ({index})),

  selectedRegions : new Set(),
  setSelectedRegions : selectedRegions => set(state => (new Set(selectedRegions))),


  stageScale : {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1
  },
  setStageScale : stageScale => set({stageScale}),

  orignalScale : {},
  setOrignalScale : orignalScale => set({orignalScale}),

  brightness: 0,
  setBrightness: brightness => set({ brightness })
}));

export default useStore;
