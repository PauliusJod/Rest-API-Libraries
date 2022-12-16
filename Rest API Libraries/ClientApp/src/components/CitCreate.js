import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/authservice';



export default function CitCreate() {

    const [CitName, setName] = useState('');
    const [CitDesc, setDescription] = useState('');

    const navigate = useNavigate();


    const a = AuthService.getCurrentUser();
    const headers = {
        'Authorization': `Bearer ${a.accessToken}`
    };


    const postData = () => {
        axios.post('https://localhost:7011/api/cities', {
            Name: CitName,
            Description: CitDesc
        }, { headers })
        navigate("/allCities");
        console.log(CitName);
        console.log(CitDesc);
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    {/*<label>First Name</label>*/}
                    <input placeholder='City Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    {/*<label>Last Name</label>*/}
                    <input placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                </Form.Field>
                <br></br>
                <Button className="btn btn-success" onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
