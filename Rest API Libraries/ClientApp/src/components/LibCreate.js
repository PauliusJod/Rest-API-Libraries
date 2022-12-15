import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function LibCreate() {

    const [citid, getID] = useState(null);
    const [LibName, setName] = useState('');
    const [LibCity, setCity] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        getID(localStorage.getItem("Cid"));
    }, []);
    const postData = () => {
        axios.post(`https://localhost:7011/api/cities/${citid}` + "/libraries/", { /*+ `${id}`*/
            LibraryName: LibName
        })

        navigate("/allCities/citLibraries");
        console.log(LibName);
        console.log(LibCity);
    }


    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    {/*<label>First Name</label>*/}
                    <input placeholder='First Name' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    {/*<label>Last Name</label>*/}
                    <input placeholder='Last Name' onChange={(e) => setCity(e.target.value)} />
                </Form.Field>
                <br></br>
                <Button className="btn btn-success" onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
