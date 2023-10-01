import React, { Component, createContext, useContext, useState } from 'react';
import useStore from '../../library/store';
import AddLabelDialog from './AddLabelDialog'
import SetUserId from './SetUserId'
import { useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import "./style.css"
import { getRequest } from '../../library/requests';
// import { use } from '../../../../../../server/routes/posts';
let clabels = [
    { name: 'Cancer cell', color: 'Red' },
    { name: 'Normal cell', color: 'Blue' }
];
let selected = null

function LabelBox() {
    const dataset = useStore((state) => state.dataset);
    const labels = useStore((state) => state.labels);
    const history = useStore((state) => state.history);
    const fillinside = useStore((state) => state.fillinside);
    const setFillinside = useStore((state) => state.setFillinside);
    const setPointcolor = useStore((state) => state.setPointcolor);
    const setPointwidth = useStore((state) => state.setPointwidth);
    const setLinewidth = useStore((state) => state.setLinewidth);
    const setRegionopacity = useStore((state) => state.setRegionopacity);
    const setLabels = useStore((state) => state.setLabels);
    const setRegions = useStore((state) => state.setRegions);
    const historySelected = useStore((state) => state.historySelected);
    const setHistorySelected = useStore((state) => state.setHistorySelected);


    const color = useStore((state) => state.color);
    const setColor = useStore((state) => state.setColor);
    const server = useStore((state) => state.server);

    const handleLoad = async (event) => {
        let url = server + '/posts/get_images_labels' + '/' + window.location.pathname.split('/')[2]
        // change above to dataset name when doing general
        console.log(url);
        const response = await getRequest(url);
        let response_string = JSON.stringify(response)

        const dataArray = JSON.parse(response_string);
        let labels_array = []

        for (let i = 0; i < dataArray.length; i++) {
            const item = dataArray[i];
            const labelName = item.dataset_label_name;
            const labelColor = item.dataset_label_color;
            labels_array.push({ id: i, name: labelName, color: labelColor });
        }

        console.log(labels_array)
        setLabels(labels_array);
        // const response = await getRequest(url)
        // console.log(response.json()['list']);
        // setLables(response.json()['list'])
    };

    useEffect(() => {
        handleLoad();
    }, []);
    const addLabel = (label) => {

    }
    return (
        <React.Fragment>
            <div className="labelbox" style={{ fontFamily: "Roboto", fontSize: '0.9em' }}>
                <legend style={{ fontFamily: "Roboto" }}>Labels</legend>
                <div className="radio-item-container">
                    {(labels.length) ? labels.map((option) => (
                        <div
                            key={option.color}
                            className={`labels ${option.type + ' '} ${option.color === selected ? 'active ' : ' '
                                } `
                            }
                            onClick={() => {
                                setColor(option.color)

                                selected = option.color

                            }}
                        >
                            <span style={{ backgroundColor: option.color, color: option.color }}>&emsp; </span> &nbsp; {option.name}
                        </div>
                    )) : null}
                </div>
            </div>
            <AddLabelDialog addLabel={addLabel} dataset={dataset} />
            <div className="labelbox" style={{ fontFamily: "Roboto", fontSize: '0.9em' }}>
                <legend style={{ fontFamily: "Roboto" }}>History</legend>
                <div className="radio-item-container">
                    {(history.length) ? history.map((option, index) => (
                        <div
                            key={index}
                            className={`${index === historySelected ? 'bg-white' : ''
                                } `
                            }
                            onClick={() => {
                                setRegions(history[index])
                                setHistorySelected(index);
                            }}
                        >
                            <span>&emsp; </span> &nbsp; {"Version : " + (index + 1)}
                        </div>
                    )) : null}
                </div>
            </div>
            {/* <AddLabelDialog addLabel={addLabel} dataset={dataset} /> */}
            {/* <SetUserId /> */}
            <div className=''>
                <label className='text-black text-sm'>Fill Inside</label>
                <select className='ml-2' onChange={(e) => { setFillinside(e.target.value) }}>
                    <option value={1}>Yes</option>
                    <option value={0} selected>No</option>
                </select>
            </div>
            <div className='mt-2'>
                <label className='text-black text-sm'>Point width</label>
                <select className='ml-2' onChange={(e) => { setPointwidth(e.target.value) }}>
                    <option value={1}>1</option>
                    <option value={2} selected>2</option>
                    <option value={3} >3</option>
                    <option value={4} >4</option>
                    <option value={5}>5</option>
                    <option value={6} >6</option>
                </select>
            </div>
            <div className='mt-2'>
                <label className='text-black text-sm'>Line width</label>
                <select className='ml-2' onChange={(e) => { setLinewidth(e.target.value) }}>
                    <option value={1}>1</option>
                    <option value={2} >2</option>
                    <option value={3} selected>3</option>
                    <option value={4} >4</option>
                    <option value={5} >5</option>
                    <option value={6} >6</option>
                </select>
            </div>
            <div className='mt-2'>
                <label className='text-black text-sm'>Opacity</label>
                <select className='ml-2' onChange={(e) => setRegionopacity(e.target.value)}>
                    <option value='0.1'>0.1</option>
                    <option value='0.2'>0.2</option>
                    <option value='0.3' selected>0.3</option>
                    <option value='0.4'>0.4</option>
                    <option value='0.5'>0.5</option>
                    <option value='0.6'>0.6</option>
                    <option value='0.7'>0.7</option>
                    <option value='0.8'>0.8</option>
                    <option value='0.9'>0.9</option>
                    <option value='1'>1</option>
                </select>
            </div>
        </React.Fragment>
    );
}

export default LabelBox;
