import React, { Component, createContext, useContext, useState } from 'react';
import useStore from '../../library/store';
import AddLabelDialog from './AddLabelDialog'
import SetUserId from './SetUserId'
import { Container, Row, Col, Button, Form  } from 'react-bootstrap';
import "./style.css"
import {getRequest} from '../../library/requests';
let clabels = [
    { name: 'Cancer cell', color: 'Red' },
    { name: 'Normal cell', color: 'Blue' }
];
let selected = null
function LabelBox( ) {
    const dataset = useStore((state) => state.dataset);
    const labels = useStore((state) => state.labels);
    const setLables = useStore((state) => state.setLables);
    
    const color = useStore((state) => state.color);
    const setColor = useStore((state) => state.setColor);
    
    const handleLoad = async (event) => {
        const url = '\ads\sda\ad'
        const response = await getRequest(url)
        console.log(response.json()['list']);
        setLables(response.json()['list'])
    };
    const addLabel = (label) => {
        
    }
    return (
        <React.Fragment>
            <div className="labelbox" style ={{ fontFamily:"Roboto" , fontSize:'0.9em'}}>
                <legend style ={{ fontFamily:"Roboto"}}>Labels</legend>
                <div className="radio-item-container">
                        {(labels.length)?labels.map((option) => (
                            <div
                            key = {option.color}
                            className={`labels ${ option.type + ' '} ${
                                option.color === selected ? 'active ' : ' '
                                } `
                                }
                            onClick = {()=>{
                                setColor(option.color)
                                
                                selected = option.color
                           
                            }}
                            >
                            <span style={{backgroundColor:option.color, color:option.color}}>&emsp; </span> &nbsp; {option.name}
                            </div>
                        )):null}
                </div>
            </div>
            <AddLabelDialog addLabel={addLabel} dataset = {dataset} />
            <SetUserId />
        </React.Fragment>
    );
}

export default LabelBox;
