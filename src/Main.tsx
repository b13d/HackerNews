import React, {useEffect, useState} from "react";
import "./App.css";
import axios from "axios";
import {News} from "./components/News";
import {INewsItem} from "../src/models";
import NewsList from "./components/NewsList";
import {Outlet} from "react-router";
import ClearPage from "./ClearPage"

function Main() {

    return (
        <>
            <Outlet/>
            <NewsList/>
        </>
    );
}

export default Main;
