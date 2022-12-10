import React, { useState } from 'react';
import Constants from "../utilities/Constants";
import { Link, useNavigate } from 'react-router-dom'
import CitEdit from './CitEdit';
import axios from 'axios';



function City() {

    const [cities, setCities] = useState([]);
    const handleDelete = async (id) => {
        console.log('delete' + id);
        axios.delete(`https://localhost:7119/api/cities/${id}`);
        window.location.reload();

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
            <div className="container">
                <div className="row min-vh-100">
                    <div className="marginClass">
                        <div className="col d-flex flex-column align-items-center">
                            <div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city) => (
                            <tr key={city.cityId}>
                                <th scope="row">{city.cityId}</th>
                                <td>{city.cityName}</td>
                                <td>
                                    <Link to={`/allCities/CitEdit`} params={{ testvalue: city.cityId }}>
                                        <button onClick={() => CitEdit(
                                            localStorage.setItem("Id", city.cityId)
                                        )}>Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(city.cityId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <Link className='d-grid gap-2' to={`/allCities/CitCreate`}>
                    <button size="lg">Add new city</button>
                </Link>
            </div>
        );
    }
}

export default City;
