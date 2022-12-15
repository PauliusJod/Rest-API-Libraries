import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import AuthService from '../services/authservice';

export default function CitEdit() {
    const [id, getID] = useState(null);
    const [CitDesc, setDesc] = useState('');
    //const [CitId, setId] = useState('');
    useEffect(() => {

        getID(localStorage.getItem("Id"));
    }, []);

    const a = AuthService.getCurrentUser();
    if (!a) {
        return (
            <Navigate to="/allCities">
            </Navigate>
        )
    }
    const headers = {
        'Authorization': `Bearer ${a.accessToken}`
    };

    const putData = (e) => {
        console.log(id);
        axios.put(`https://localhost:7011/api/cities/${id}`, { Description: CitDesc }, { headers });
    }
    return (
        <div>
            <label>City Description</label>
            <Form className="create-form">
                <Form.Field>
                    <input placeholder='...' onChange={(e) => setDesc(e.target.value)} />
                </Form.Field>
                <br></br>
                <Button className="btn btn-success" onClick={putData} type='submit'>Change description</Button>
            </Form>
        </div>
    )
}
