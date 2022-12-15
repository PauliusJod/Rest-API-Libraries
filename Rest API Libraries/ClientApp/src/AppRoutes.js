import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import AllCities from './components/AllCities';
import AllLibraries from './components/AllLibraries';
import AllBooks from './components/AllBooks';
import Login from './components/Login';
import Register from './components/Register';
import CitLibraries from './components/CitLibraries';
import LibBooks from "./components/LibBooks";
import LibCreate from "./components/LibCreate";
import CitCreate from "./components/CitCreate";
import CitEdit from "./components/CitEdit";
import LibEdit from "./components/LibEdit";
import BookEdit from "./components/BookEdit";
import BookCreate from './components/BookCreate';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/allCities',
        element: <AllCities />
    },
    {
        path: '/allLibraries',
        element: <AllLibraries />
    },
    {
        path: '/allCities/CitCreate',
        element: <CitCreate />
    },
    {
        path: '/allCities/CitEdit',
        element: <CitEdit />
    },
    {
        path: '/allLibraries/LibCreate',
            element: <LibCreate />
    },
    {
        path: '/allCities/citLibraries',
        element: <CitLibraries />
    },
    {
        path: '/allCities/citLibraries/libBooks',
        element: <LibBooks />
    },
    {
        path: '/allCities/citLibraries/libEdit',
        element: <LibEdit />
    },
    {
        path: '/allCities/citLibraries/libBooks/bookEdit',
        element: <BookEdit />
    },
    {
        path: '/allCities/citLibraries/libBooks/bookCreate',
        element: <BookCreate />
    },
    {
        path: '/allBooks',
        element: <AllBooks />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
];

export default AppRoutes;
