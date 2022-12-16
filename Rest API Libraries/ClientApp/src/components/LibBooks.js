import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookEdit from './BookEdit';
import BookCreate from './BookCreate';
import axios from 'axios';
import AuthService from '../services/authservice';


function LibBook() {
    const [id, getID] = useState(null);
    const [Libid, getLibID] = useState(null);
    //eslint-disable-next-line
    const [error, setError] = useState("");
    console.log('Book() pradzia');
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        getID(localStorage.getItem("Id"));
        getLibID(localStorage.getItem("Libid"));
    }, []);
    const a = AuthService.getCurrentUser();
    console.log(a);
    const headers = {
        'Authorization': `Bearer ${a.accessToken}`
    };


    const handleDelete = (bookid) => {
        console.log('delete book : ' + bookid);
        console.log(headers);
        //eslint-disable-next-line
        axios.delete('https://localhost:7011/api/cities/' + id + '/libraries/' + Libid + '/books/' + bookid, { headers });    // NEGALIMA PALIKTI {} TUSCIO!

        navigate("/allCities/citLibraries/libBooks");

    };
    function getBooks() {
        //eslint-disable-next-line
        const url = 'https://localhost:7011/api/cities/' + id + '/libraries/' + Libid + '/books';

        fetch(url, {
            method: "GET",
        })
            .then((response) => response.json())

            .then((booksFromServer) => {
                console.log(booksFromServer);
                setBooks(booksFromServer);
            })
            .catch((error) => {
                console.log('eroras?')
                console.log(error);
                alert(error);
            });
    }
    console.log('return pradzia');
    return (
        <div className="Book">
            <div className="container">
                <div className="row min-vh-100">
                    <div className="marginClass">
                        <div className="col d-flex flex-column align-items-center">
                            <div>
                                <button
                                    onClick={getBooks}
                                    className="btn btn-dark btn-lg w-100"
                                >
                                    Get Books
                                </button>
                            </div>

                            {books.length > 0 && renderBookTable()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderBookTable() {
        console.log('renderBookTable');
        return (
            <div className="table-resposive mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Book ID</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Book Description</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookId}>
                                <th scope="row">{book.bookId}</th>
                                <td>{book.bookName}</td>
                                <td>{book.bookDesc}</td>
                                <td>
                                    <Link to={`/allCities/citLibraries/libBooks/bookEdit`} params={{ testvalue: book.bookId }}>
                                        <button className="btn btn-dark" onClick={() => BookEdit(
                                            localStorage.setItem("Cid", id),
                                            localStorage.setItem("Libid", Libid),
                                            localStorage.setItem("Bookid", book.bookId)
                                        )}>Edit</button>
                                    </Link>
                                    <button className="btn btn-dark" onClick={() => handleDelete(book.bookId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <Link to={`/allCities/citLibraries/libBooks/bookCreate`} params={{ testvalue: id, testvalue2: Libid }}>
                    <button className="btn btn-secondary" onClick={() => BookCreate(
                        localStorage.setItem("Cid", id),
                        localStorage.setItem("Libid", Libid)
                    )}>Create</button>
                </Link>
            </div>
        );
    }
}

export default LibBook;