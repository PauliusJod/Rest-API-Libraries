//import React, { useEffect, useState } from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
//import Constants from "../utilities/Constants";
//import { Link, useNavigate, Navigate } from 'react-router-dom';
//import { Button, Form } from 'semantic-ui-react';
//import LibEdit from './LibEdit';
//import LibCreate from './LibCreate';
//import axios from 'axios';

//import backend from "./backend/backend.js";
//import AuthService from '../services/authservice';


//function Library() {

//    const [isOpen, setIsOpen] = useState(false);
//    const [id, getID] = useState(null);
//    const [error, setError] = useState("");
//    const [libraries, setLibraries] = useState([]);
//    let history = useNavigate();

//    useEffect(() => {

//        getID(localStorage.getItem("Id"));
//    }, []);

//    const putData = (e) => {
//        console.log(id);
//        axios.fetch(`https://localhost:7011/api/cities/${id}` + "/libraries", { /*cityName: CitName, UserId: CitId */}, { /*headers*/ });
//    }
//    const a = AuthService.getCurrentUser();
//    //if (!a) {
//    //    return (<div>
//    //        { error?<p>Negalite to padaryti!</p> : <span></span>}
//    //        </div>
//    //    )
//    //}
//    console.log(a);
//    const headers = {
//        'Authorization': `Bearer ${a.accessToken}`
//    };
//    const handleDelete = (libid) => {
//        console.log(libid);
//        console.log(headers);
//        axios.delete(`https://localhost:7011/api/cities/2/libraries/${libid}`, { headers });    // NEGALIMA PALIKTI {} TUSCIO!
//            //.then((response) => {
//            //    window.location.reload();
//            //})

//            //.catch((error) => {
//            //    setError(error);
//            //});
//    };

//    function getLibraries() {
//        const url = Constants.API_URL_GET_ALL_LIBRARIES;

//        fetch(url, {
//            method: "GET",
//        })
//            .then((response) => response.json())

//            .then((librariesFromServer) => {
//                console.log(librariesFromServer);
//                setLibraries(librariesFromServer);
//            })
//            .catch((error) => {
//                console.log('eroras?')
//                console.log(error);
//                alert(error);
//            });
//    }
//    return (
        
//        <div className="Library">
//            <div className="container">
//                <div className="row min-vh-100">
//                    <div className="marginClass">
//                        <div className="col d-flex flex-column align-items-center">
//                            <div>
//                                <button
//                                    onClick={getLibraries}
//                                    className="btn btn-dark btn-lg w-100"
//                                >
//                                    Get Libraries
//                                </button>
//                            </div>

//                            {libraries.length > 0 && renderLibraryTable()}
//                        </div>
//                    </div>
//                </div>
//            </div>
//        </div>
//    );

//    function renderLibraryTable() {
//        console.log('renderLibraryTable');
//        return (
//            <div className="table-resposive mt-5">
//                <table className="table table-bordered border-dark">
//                    <thead>
//                        <tr>
//                            <th scope="col">ID</th>
//                            <th scope="col">Name</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        {libraries.map((library) => (
//                            <tr key={library.libraryId}>
//                                <th scope="row">{library.id}</th>
//                                <td>{library.libraryName}</td>
//                                <td>
//                                    <Link to={`/allLibraries/LibEdit`} params={{ testvalue: library.libraryId }}>
//                                        <button onClick={() => LibEdit(
//                                            localStorage.setItem("Id", library.libraryId)
//                                        )}>Edit</button>
//                                    </Link>
//                                    <button onClick={() => handleDelete(library.id)}>Delete</button>
//                                </td>
//                            </tr>
//                        ))}
//                    </tbody>
//                </table>
//                <br></br>
//                {/*<Link to={`/allLibraries/LibCreate`} params={{ testvalue: library.libraryId }}>*/}
//                {/*    <button onClick={() => LibCreate(*/}
//                {/*        localStorage.setItem("Id", library.libraryId)*/}
//                {/*    )}>Edit</button>*/}
//                {/*</Link>*/}
//                {error ? <p>Negalite to padaryti!</p> : <span></span>}
//            </div>
//        );
//    }
//}

//export default Library;
