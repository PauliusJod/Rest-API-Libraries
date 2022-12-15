import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import AuthService from '../services/authservice';
import React, { useEffect, useState } from 'react';

export default function BookEdit() {
    const [cid, getCitID] = useState(null);
    const [libid, getLibID] = useState(null);
    const [bookid, getBookID] = useState(null);
    const [bookDesc, setName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        getCitID(localStorage.getItem("Cid"));
        getLibID(localStorage.getItem("Libid"));
        getBookID(localStorage.getItem("Bookid"));
    }, []);

    const a = AuthService.getCurrentUser();
    if (!a) {
        return (
            <Navigate to="/allCities/citLibraries/libBooks">
            </Navigate>
        )
    }
    const headers = {
        'Authorization': `Bearer ${a.accessToken}`
    };

    const putData = (e) => {
        console.log(cid);
        axios.put(`https://localhost:7011/api/cities/${cid}` + "/libraries/" + `${libid}` + "/books/" + `${bookid}`, { BookDesc: bookDesc }, { headers });

        navigate("/allCities/citLibraries/libBooks");
    }
    return (
        <div>
            <label>Book Description</label>
            <Form className="create-form">
                <Form.Field>
                    <input placeholder='New Book ...' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <br></br>
                <Button className="btn btn-success" onClick={putData} type='submit'>Change description</Button>
            </Form>
        </div>
    )
}
