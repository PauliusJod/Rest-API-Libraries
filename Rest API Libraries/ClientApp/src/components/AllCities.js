import React, { useState } from 'react';
import Constants from "../utilities/Constants";
import { Link, useNavigate } from 'react-router-dom';
import CitEdit from './CitEdit';
import CitCreate from './CitCreate';
import axios from 'axios';
import Modal from './Modal';
import AuthService from '../services/authservice';


const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    textAlign: 'center',
    zIndex: 1
}
const button_styles = {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid rgba(0,0,0,1)',
    fontSize: '24px'
}

function City() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);

    const a = AuthService.getCurrentUser();
    console.log(a);
    const headers = {
        'Authorization': `Bearer ${a.accessToken}`
    };

    const handleLink = (id) => {
        localStorage.setItem("Id", id)

        navigate("/allCities/citLibraries");

    }

    const handleDelete = (cityid) => {
        console.log('delete' + cityid);
        console.log(headers);
        axios.delete(`https://restapilibraries.azurewebsites.net/api/cities/${cityid}`, { headers });    // NEGALIMA PALIKTI {} TUSCIO!

    };


    function getCities() {
        const url = Constants.API_URL_GET_ALL_CITIES;

        fetch(url, {
            method: "GET",
        })
            .then((response) => response.json())

            .then((citiesFromServer) => {
                console.log(citiesFromServer);
                setCities(citiesFromServer);
            })
            .catch((error) => {
                console.log('eroras?')
                console.log(error);
                alert(error);
            });
    }
    return (
        <div className="City">
            <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
                <button style={button_styles} onClick={() => setIsOpen(true)}>More information<br></br>
                    <svg width="50px" height="50px" viewBox="0 -32 576 576" xmlns="http://www.w3.org/2000/svg"><path d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z" /></svg></button>

                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    
                </Modal>
            </div>
            <div className="container">
                <div className="row min-vh-100">
                    <div className="marginClass">
                        <div className="col d-flex flex-column align-items-center">
                            <div>
                                <br></br>
                                <br></br>
                                <button
                                    onClick={getCities}
                                    className="btn btn-dark btn-lg w-100"
                                >
                                    Get Cities
                                </button>
                            </div>

                            {cities.length > 0 && renderCityTable()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderCityTable() {
        console.log('renderCityTable');
        return (
            <div className="table-resposive mt-5">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount Of Libraries</th>
                            <th scope="col">City libraries</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city) => (
                            <tr className="tableExtra" key={city.id}>
                                <th scope="row">{city.id}</th>
                                <td>{city.name}</td>
                                <td>{city.description}</td>
                                <td>{city.amountOfLibraries}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleLink(city.id)}>Show all libraries</button>
                                </td>
                                <td>
                                    <Link to={`/allCities/CitEdit`} params={{ testvalue: city.id }}>
                                        <button className="btn btn-dark" onClick={() => CitEdit(
                                            localStorage.setItem("Id", city.id)
                                        )}>Edit</button>
                                    </Link>
                                    <button className="btn btn-dark" onClick={() => handleDelete(city.id)}>Delete</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
                <br></br>
                <Link to={`/allCities/CitCreate`}>
                    <button className="btn btn-secondary" onClick={() => CitCreate()}>Create new city</button>
                </Link>
            </div>
        );
    }
}

export default City;