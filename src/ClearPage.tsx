import {Outlet} from "react-router";


export default function Text() {
    console.log(<Outlet />)
    return (
        <>
            <h1>text</h1>
            <Outlet/>
        </>
    )
}