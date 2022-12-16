import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import LibCreate from './LibCreate';
import LibEdit from './LibEdit';
import axios from 'axios';

import AuthService from '../services/authservice';


function CitLibraries() {

    const navigate = useNavigate();
    const [cid, getID] = useState(null);
    const [error] = useState("");
    const [libraries, setLibraries] = useState([]);
    const a = AuthService.getCurrentUser();
    console.log(a);
    const headers = {
        'Authorization': `Bearer ${a.accessToken}`
    };
    const handleLink = (libid) => {
        localStorage.setItem("Libid", libid)
        navigate("/allCities/citLibraries/libBooks");

    }
    useEffect(() => {
        getID(localStorage.getItem("Id"));
    }, []);


    const handleDelete = (libid) => {
        console.log(libid);
        console.log(headers);
        axios.delete('https://localhost:7011/api/cities/' + cid + '/libraries/' + libid, { headers });
    };

    function getLibraries() {
        const url = 'https://localhost:7011/api/cities/' + cid + '/libraries';
        console.log("id metode citlibraries-getlib: " + cid)
        fetch(url, {
            method: "GET",
        })
            .then((response) => response.json())

            .then((librariesFromServer) => {
                console.log(librariesFromServer);
                setLibraries(librariesFromServer);
            })
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
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Library booked books</th>
                            <th>Available books</th>
                            <th>Library options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libraries.map((library) => (
                            <tr key={library.id}>
                                <th scope="row">{library.id}</th>
                                <td>{library.libraryName}</td>
                                <td>{library.libraryBookedBooks}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleLink(library.id)}>Open books list</button>
                                </td>
                                <td>
                                    <Link to={`/allCities/citLibraries/libEdit`} params={{ testvalue: cid, testvalue2: library.id }}>
                                        <button className="btn btn-dark" onClick={() => LibEdit(
                                            localStorage.setItem("Cid", cid),
                                            localStorage.setItem("Libid", library.id)
                                        )}>Edit</button>
                                    </Link>
                                    <button className="btn btn-dark" nClick={() => handleDelete(library.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <Link to={`/allLibraries/LibCreate`} params={{ testvalue: cid }}>
                    <button className="btn btn-secondary" onClick={() => LibCreate(
                        localStorage.setItem("Cid", cid)
                    )}>Create</button>
                </Link>
                {error ? <p>Negalite to padaryti!</p> : <span></span>}
            </div>
        );
    }
}

export default CitLibraries;