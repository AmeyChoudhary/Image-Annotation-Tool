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
    const setLabels = useStore((state) => state.setLabels);

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
            <SetUserId />
        </React.Fragment>
    );
}

export default LabelBox;
