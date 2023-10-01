import React, { Component, createContext, useContext, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import useStore from '../../library/store';
import "./style.css"
function SetUserId(props) {
    const currUser = useStore((state) => state.currUser);
    const setCurrUser = useStore((state) => state.setCurrUser);
    const adminMode = useStore((state) => state.adminMode);
    const setAdminMode = useStore((state) => state.setAdminMode);
    const handleChangeAdmin = (e) => {
        console.log(e.target.checked)
        setAdminMode(e.target.checked)

        // setCurrUser(e.target.userId.value)
    }
    const handleChangeUserID = (e) => {

        setCurrUser(e.target.value)
        console.log(currUser)
        console.log("changed in setUserID")

    }
    return (
        <React.Fragment>
            <form >
                <Row>
                    {/* <Col xs={2}><label>User:</label></Col>
                    <Col xs={1}>
                        <input style={{ margin: 9 }} onChange={handleChangeAdmin} type="checkbox" name="isAdmin" data-tool-tip="isAdmin"></input>
                    </Col>
                    <Col xs={8}>
                        <input style={{ width: 80, margin: 4 }} onChange={handleChangeUserID} type="text" id="userId" name="userId" />
                    </Col> */}
                </Row>
            </form>
        </React.Fragment>
    );
}

export default SetUserId;