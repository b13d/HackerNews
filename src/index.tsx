import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./Main";
import CurrentPage from "./pages/CurrentPage";
import ErrorPage from "./ErrorPage";
import ClearPage from "./ClearPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "pages/*",
                element: <CurrentPage/>,
                errorElement: <ErrorPage/>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router}/>);
