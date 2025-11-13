import React, { useEffect, useState } from 'react';
import NavbarComp from "./Navbar/NavbarComp";
import CardCarousel from "./CardCarousel";
import Delivery from "./delivery/Delivery";
import MenuNav from "./MenuNav";
import Footer from "./Footer/Footer";

import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from './ProductsCard/Card';
import CardMoti from "./ProductsCard/CardMoti";
import { Outlet } from 'react-router-dom';

import styles from "../styles/ErrorPage.module.css";
import closeImg from "../images/close-ellipse-svgrepo-com.svg";
import axios from "axios";


function AppLayout() {

    const location = useLocation();
    const { state } = location || {};


    return (


        <>
            <NavbarComp />
            <Outlet />
            <Footer />
        </>

    )
}

export default AppLayout;