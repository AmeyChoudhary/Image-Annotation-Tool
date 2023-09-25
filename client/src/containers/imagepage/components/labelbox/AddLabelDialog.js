import React, { Component, createContext, useContext, useState } from 'react';
import { Container, Row, Col, Button, Form  } from 'react-bootstrap';
import useStore from '../../library/store';
import "./style.css"
function AddLabelDialog(props) {
    const labels = useStore((state) => state.labels);
    const server = useStore((state) => state.server);
    const setLabels = useStore((state) => state.setLabels);
    const  handleSubmit = async (e) =>  {
        e.preventDefault();
        // use dataset id instead of name from window location
        let url = server + "/posts/add_label/" + window.location.pathname.split('/')[2]
        console.log(url)
        // change above to dataset name when doing general
        let newlabels = [...labels]
        let label = {name:e.target.label.value,color:e.target.color.value};
        newlabels.push(label)
        setLabels(newlabels)
      
        try{
            const response = await fetch(url, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json' , 'auth-token': localStorage.getItem('userId')},

                body: JSON.stringify({dataset_name: props.dataset,labels:[label]})
            })
            
            return await response.json();
        }catch(error) {
            return ['bad luck!'];
        }
    }
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>Add Label</label>
                <Row>
                    <Col xs={3}>
                        <input style={{width:30}} type="color"  name="color" className="colorSelector" data-tool-tip="Select Colour"></input>
                    </Col>
                    <Col xs={6}>
                        <input style={{width:80}} type="text" id="label" name="label"/>
                    </Col>
                    <Col xs={3}>
                        <input style={{margin:3}} type="submit" value="submit" />
                    </Col>
                </Row>
            </form>
        </React.Fragment>
    );
}

export default AddLabelDialog;