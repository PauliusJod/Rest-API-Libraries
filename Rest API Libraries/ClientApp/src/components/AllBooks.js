import React, { useState } from 'react';
import Constants from "../utilities/Constants";

//export class Library extends Component {
function Book() {

    console.log('Book() pradzia');
    const [books, setBooks] = useState([]);
    //   state = {};

    function getBooks() {
        const url = Constants.API_URL_GET_ALL_BOOKS;

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
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Knygos ID</th>
                            <th scope="col">Pavadinimas</th>
                            <th scope="col">Knygyno ID</th>
                            {/*<th scope="col">Description</th>*/}
                            {/*<th scope="col">Amount</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookId}>
                                <th scope="row">{book.bookId}</th>
                                <td>{book.bookName}</td>
                                <td>{book.bookDesc}</td>
                                <td>{book.libraryId}</td>
                                {/*<td>{library.libraryDescription}</td>*/}
                                {/*<td>{library.libraryBookedBooks}</td>*/}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/*<button*/}
                {/*    onClick={() => setLibraries([])}*/}
                {/*    className="btn btn-dark btn-lg w-100"*/}
                {/*>*/}
                {/*    Empty react library array*/}
                {/*</button>*/}
            </div>
        );
    }
}

export default Book;
//export class AllLibraries extends Component {
//    //static testasName = Testas.name;
//    //const { update } = useFieldArray({ name: 'array' });
//  render() {
//      let aaaa = "Printinsim visas bibliotekas...";
//    return (
//      <div>
//            <h1>Sveiki, atvykę čia rasite visas bibliotekas!</h1>
//            <p>{aaaa }</p>
//            {/*<p>{this.update}</p>*/}
//        {/*<p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>*/}
//      </div>
//    );
//  }
//}