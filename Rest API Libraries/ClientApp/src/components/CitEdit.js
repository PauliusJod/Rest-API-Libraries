import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import backend from "./backend/backend.js";
import AuthService from '../services/authservice';

export default function CitEdit() {
    const [id, getID] = useState(null);
    const [CitName, setName] = useState('');
    const [CitId, setId] = useState('');
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
        backend.put(`https://localhost:7119/api/cities/${id}`, { cityName: CitName, UserId: CitId }, { headers });
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='City Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='User ID' onChange={(e) => setId(e.target.value)} />
                </Form.Field>
                <Button onClick={putData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
