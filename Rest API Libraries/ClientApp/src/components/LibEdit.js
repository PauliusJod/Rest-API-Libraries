import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import backend from "./backend/backend.js";
import AuthService from '../services/authservice';

export default function LibEdit() {
    const [id, getID] = useState(null);
    const [LibName, setName] = useState('');
    useEffect(() => {

        getID(localStorage.getItem("Id"));
    }, []);

    const a = AuthService.getCurrentUser();
    if (!a) {
        return (
            <Navigate to="/allLibraries">
            </Navigate>
        )
    }
    const headers = {
        'Authorization': `Bearer ${a.accessToken}`
    };

    const putData = (e) => {
        console.log(id);
        backend.put(`https://localhost:7119/api/libraries/${id}`, { LibraryName: LibName }, { headers });
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Button onClick={putData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
