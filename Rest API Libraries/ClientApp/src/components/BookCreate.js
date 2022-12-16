import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/authservice';

export default function BookCreate() {

    const [bookAuthor, setAuthor] = useState('');
    const [bookName, setName] = useState('');
    const [bookDesc, setDescription] = useState('');
    const [cid, getCid] = useState('');
    const [libid, getLibid] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        getCid(localStorage.getItem("Cid"));
        getLibid(localStorage.getItem("Libid"));
    }, []);

    const a = AuthService.getCurrentUser();
    const headers = {
        'Authorization': `Bearer ${a.accessToken}`
    };


    const postData = () => {
        axios.post('https://restapilibraries.azurewebsites.net/api/cities/' + cid + '/libraries/' + libid + '/books', {
            BookAuthor: bookAuthor,
            BookName: bookName,
            BookDesc: bookDesc
        }, { headers })

        navigate("/allCities/citLibraries/libBooks");
        console.log(bookAuthor);
        console.log(bookName);
        console.log(bookDesc);
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    {/*<label>Book Author</label>*/}
                    <input placeholder='Book Author' onChange={(e) => setAuthor(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    {/*<label>Book Name</label>*/}
                    <input placeholder='Book Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    {/*<label>Book Description</label>*/}
                    <input placeholder='Book Description' onChange={(e) => setDescription(e.target.value)} />
                </Form.Field>
                <br></br>
                <Button className="btn btn-success" onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
