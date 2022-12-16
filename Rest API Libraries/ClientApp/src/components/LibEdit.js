import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import AuthService from '../services/authservice';


export default function LibEdit() {
    const [cid, getCitID] = useState(null);
    const [libid, getLibID] = useState(null);
    const [LibName, setName] = useState('');
    useEffect(() => {

        getCitID(localStorage.getItem("Cid"));
        getLibID(localStorage.getItem("Libid"));
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
        console.log(cid);
        axios.put('https://restapilibraries.azurewebsites.net/api/cities/' + cid + '/libraries/' + libid, { LibraryName: LibName }, { headers });
    }
    return (
        <div>
            <label>Type new library name</label>
            <Form className="form-group">
                <Form.Field>
                    <input placeholder='New Lib...' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <br></br>
                <Button className="btn btn-success" onClick={putData} type='submit'>Change name</Button>
            </Form>
        </div>
    )
}
