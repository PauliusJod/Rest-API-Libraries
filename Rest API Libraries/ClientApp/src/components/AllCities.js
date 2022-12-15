import React, { useState } from 'react';
import Constants from "../utilities/Constants";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import CitEdit from './CitEdit';
import CitCreate from './CitCreate';
import axios from 'axios';
import Modal from './Modal';

const BUTTON_WRAPPER_STYLES = {
    //backgroundColor: 'red',
    position: 'relative',
    textAlign: 'center',
    zIndex: 1
}
const button_styles = {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid rgba(0,0,0,1)'
}




function City() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    const handleDelete = async (id) => {
        console.log('delete' + id);
        axios.delete(`https://localhost:7011/api/cities/${id}`);
        window.location.reload();
    }

    const handleLink = (id) => {
        localStorage.setItem("Id", id)

        navigate("/allCities/citLibraries");

    }



    const handleLibraries = async (id) => {
        console.log('GO TO -libraries: ' + id);
        const url = `https://localhost:7011/api/cities/${id}` + "/libraries";

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
        axios.delete(`https://localhost:7119/api/cities/${id}`);

    }
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
                <button style={button_styles} onClick={() => setIsOpen(true)}>Daugiau informacijos</button>

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
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount Of Libraries</th>
                            {/*<th scope="col">Amount Of Books</th>*/}
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city) => (
                            <tr key={city.id}>
                                <th scope="row">{city.id}</th>
                                <td>{city.name}</td>
                                <td>{city.description}</td>
                                <td>{city.amountOfLibraries}</td>
                                {/*<td>{city.amountOfBooks}</td>*/}
                                <td>
                                    {/*<Link to={`/allCities/citLibraries`}>*/}
                                        <button onClick={() => handleLink(city.id)}>Show all libraries</button>
                                    {/*</Link>*/}
                                    {/*<button onClick={() => handleLibraries(city.id)}>Show all libraries</button>*/}
                                </td>
                                <td>
                                    <Link to={`/allCities/CitEdit`} params={{ testvalue: city.id }}>
                                        <button onClick={() => CitEdit(
                                            localStorage.setItem("Id", city.id)
                                        )}>Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(city.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                {/*<Link className='d-grid gap-2' to={`/allCities/CitCreate`}>*/}
                {/*    <button size="lg">Add new city</button>*/}
                {/*</Link>*/}
                <Link to={`/allCities/CitCreate`}>
                    <button onClick={() => CitCreate()}>Create new city</button>
                </Link>
            </div>
        );
    }
}

export default City;
