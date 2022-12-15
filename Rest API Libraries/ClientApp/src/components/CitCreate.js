import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import Constants from "../utilities/Constants";
import axios from 'axios';
import AllCities from './AllCities';
import AuthService from '../services/authservice';



export default function CitCreate() {

    const [CitName, setName] = useState('');
    const [CitDesc, setDescription] = useState('');

    const a = AuthService.getCurrentUser();
    const headers = {
        'Authorization': `Bearer ${a.accessToken}`
    };


    const postData = () => {
        axios.post(`https://localhost:7011/api/cities`, {
            Name: CitName,
            Description: CitDesc
        }, { headers })
        console.log(CitName);
        console.log(CitDesc);
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='City Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
