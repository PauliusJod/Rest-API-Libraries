import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Constants from "../utilities/Constants";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react';
import LibBooks from './LibBooks';
import LibCreate from './LibCreate';
import axios from 'axios';

import backend from "./backend/backend.js";
import AuthService from '../services/authservice';


function CitLibraries() {

    const location = useLocation();
    const navigate = useNavigate();
    const [cid, getID] = useState(null);
    const [error, setError] = useState("");
    const [libraries, setLibraries] = useState([]);
    let history = useNavigate();
   
    const handleLink = (libid) => {
        //localStorage.setItem("Citid", id),
        localStorage.setItem("Libid", libid)
        navigate("/allCities/citLibraries/libBooks");

    }
    useEffect(() => {
        getID(localStorage.getItem("Id"));
    }, []);


    function getLibraries() {
        const url = `https://localhost:7011/api/cities/${cid}` + "/libraries";
        console.log("id metode citlibraries-getlib: " + cid) /* CITY ID */
        fetch(url, {
            method: "GET",
        })
            .then((response) => response.json())

            .then((librariesFromServer) => {
                console.log(librariesFromServer);
                setLibraries(librariesFromServer);
            })
            .catch((error) => {
                console.log('eroras?')
                console.log(error);
                alert(error);
            });
    }


    return (
        <div className="CitLibraries">
            <div className="container">
                <div className="row min-vh-100">
                    <div className="marginClass">
                        <div className="col d-flex flex-column align-items-center">
                            <div>
                                <button
                                    onClick={getLibraries}
                                    className="btn btn-dark btn-lg w-100"
                                >
                                    Get Libraries
                                </button>
                            </div>

                            {libraries.length > 0 && renderLibraryTable()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderLibraryTable() {
        console.log('renderLibraryTable');
        return (
            <div className="table-resposive mt-5">
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Library booked books</th>
                            <th scope="col">Options</th>

                        </tr>
                    </thead>
                    <tbody>
                        {libraries.map((library) => (
                            <tr key={library.id}>
                                <th scope="row">{library.id}</th>
                                <td>{library.libraryName}</td>
                                <td>{library.libraryBookedBooks}</td>
                                <td>
                                 {/*   <Link to={`/allCities/citLibraries/libBooks`}>*/}
                                        <button onClick={() => handleLink(library.id)}>Show all library books</button>
                                    {/*</Link>*/}
                                    {/*<button onClick={() => handleLibraries(city.id)}>Show all libraries</button>*/}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <Link to={`/allLibraries/LibCreate`} params={{ testvalue: cid }}>
                    <button onClick={() => LibCreate(
                        localStorage.setItem("Cid", cid)
                    )}>Create</button>
                </Link>
                {error ? <p>Negalite to padaryti!</p> : <span></span>}
            </div>
        );
    }
}

export default CitLibraries;
    //const putData = (e) => {
    //    console.log(id);
    //    axios.fetch(`https://localhost:7011/api/cities/${id}` + "/libraries", { /*cityName: CitName, UserId: CitId */ }, { /*headers*/ });
    //}
    //const handleDelete = async (id) => {
    //    const a = AuthService.getCurrentUser();
    //    //if (!a) {
    //    //    return (<div>
    //    //        { error?<p>Negalite to padaryti!</p> : <span></span>}
    //    //        </div>
    //    //    )
    //    //}
    //    const headers = {
    //        'Authorization': `Bearer ${a.accessToken}`
    //    };
    //    console.log(id);
    //    backend.delete(`https://localhost:7119/api/cities/1/libraries/${id}`, {}, { headers })
    //        .then((response) => {
    //            window.location.reload();
    //        })

    //        .catch((error) => {
    //            setError(error);
    //        });
    //};