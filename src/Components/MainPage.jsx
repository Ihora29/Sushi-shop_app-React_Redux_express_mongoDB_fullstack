import React, { useEffect } from 'react'
import CardCarousel from './CardCarousel'
import Delivery from './delivery/Delivery'
import MenuNav from './MenuNav'
import AllProductsCard from './ProductsCard/AllProductsCard'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import About from './Footer/About'
import { CircularProgress } from '@mui/material'
import { Backdrop } from '@mui/material'
import styles from "../styles/ErrorPage.module.css";
import closeImg from "../images/close-ellipse-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from './redux/getUserSlice';
import { logout } from './redux/getUserSlice'


function MainPage() {

    const location = useLocation();
    const { state } = location || {};

    useEffect(() => {

        const checkWorkTime = () => {

            const date = new Date();
            const currentHour = date.getHours();
            if (currentHour >= 18 || currentHour < 11) {
                //setWorkingTime(true);
                console.log('Notworkingtime');
                setShowWorkPopUp(true);
            }
            else {
                setShowWorkPopUp(false)
                //    console.log('work');

            }
        };
        checkWorkTime();
        const interval = setInterval(checkWorkTime, 1800000);
        return () => clearInterval(interval);


    }, [])


    // const isUserAuth = useSelector((state) => state.getUser.user);
    // // console.log(isUserAuth);

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchUser());
    // }, [dispatch]);


    const handleClosePopUp = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowWorkPopUp(false);

    }

    const [showWorkPopUp, setShowWorkPopUp] = useState(false);



    return (
        <>
            <>
                <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={showWorkPopUp ? true : false} >

                    <div className={styles.workPopUp} style={showWorkPopUp ? { display: 'flex' } : { display: 'none' }}>
                        <img src={closeImg} className={styles.closePopUpPic} alt="" onClick={(e) => handleClosePopUp(e)} />
                        <img className={styles.popUpPic} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/error-monosushi.svg" alt="" />
                        <h6 className={styles.popuph5}>Вибачте, але замовлення не доступні</h6>
                        <p><strong>Чекаємо</strong> на Вас щодня з <strong>11:00-</strong><strong>18:00</strong></p>
                    </div>
                </Backdrop>

                {/* <h1 style={loadingProgress ? { display: 'none' } : { display: 'flex', margin: '400px auto' }}>Lox</h1> */}
            </>
            :
            <div className={styles.mainWrapper}>
                <CardCarousel />
                <Delivery />
                <MenuNav />
                <AllProductsCard />
                <About />
            </ div>

        </>
    )

}

export default MainPage