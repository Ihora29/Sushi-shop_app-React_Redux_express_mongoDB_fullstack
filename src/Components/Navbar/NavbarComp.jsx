import styles from "../../styles/Navbar.module.css"
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Hamburger from 'hamburger-react'
import EnterComp from "../LoginComponents/EnterComp.jsx"
import Basket from "./Basket.jsx";
import Backdrop from '@mui/material/Backdrop';
import WeCallComp from "./WeCallComp.jsx";
import axios from "axios";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { PopUpCabinet } from "../user-cabinet/PopUpCabinet.jsx";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/getUserSlice";

function NavbarComp() {
    const [isOpen, setOpen] = useState(false);

    const [openEnter, setOpenEnter] = useState(false);
    const [showCabinet, setShowCabinet] = useState(false);
    const location = useLocation();
    const { state } = location || {};

    const userLogin = useSelector((state) => state.getUser.user);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser());


    }, [dispatch]);


    const handleClick = (e) => {
        e.stopPropagation();
        setShowCabinet(false);
        setOpenEnter(true);
        // console.log('click', userLogin);


        if (userLogin != null) {
            setShowCabinet(true);
            setOpenEnter(false)
        }
        else {

            setShowCabinet(false);
            setOpenEnter(true);

        }
    };

    function closeBackDrop() {
        setOpenEnter(false)
        setShowBasket(false)
        setShowPhoneComp(false)

    };

    const [showBasket, setShowBasket] = useState(false);

    const basket = useSelector((state) => state.basketItems.basketItems);

    const [totalCount, setTotalCount] = useState(0);
    const [orderPrice, setOrderPrice] = useState(0);


    const checkBasket = () => {
        setShowBasket(!showBasket)
    }


    useEffect(() => {

        if (basket && basket.length > 0) {
            const totalOrderCount = basket.reduce((accumulator, item) => accumulator + item.totalCount, 0);
            const totalOrderSum = basket.reduce((accumulator, item) => accumulator + item.price * item.totalCount, 0);
            setTotalCount(totalOrderCount);
            setOrderPrice(totalOrderSum);
        } else if (basket.length == 0) {
            setOrderPrice(0);
            setTotalCount(0)
        }

    },)

    const [showPhoneComp, setShowPhoneComp] = useState(false)

    const openContact = () => {
        setShowPhoneComp(!showPhoneComp)

    }

    return (
        <>
            <div className={styles.headerPanel} style={{ zIndex: showBasket ? 9999 : null }}>

                <div className={styles.brand}>
                    <Link to="/" ><img className={styles.brandIcon} src="https://monosushi.com.ua/wp-content/uploads/2021/06/logo.svg" alt="" />
                        <img className={styles.brandIconMobile} src="https://monosushi.com.ua/wp-content/uploads/2021/08/logo-mobile.svg" alt="" />
                    </Link>
                </div>

                <div className={styles.productsPanel} >
                    <Link className={styles.productIcon} id={styles.actionMenu} to="/actions"><img className={styles.linkIcon} src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-gift.svg" alt="" />
                        <span className={styles.nameIcon}>акції</span>
                    </Link>
                    <Link to="/sushi" className={styles.productIcon} ><img className={styles.linkIcon} src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-rolls.svg" alt="" />
                        <span className={styles.nameIcon}>роли</span>
                    </Link>
                    <Link to="/moti" className={styles.productIcon} ><img className={styles.linkIcon} src="https://monosushi.com.ua/wp-content/uploads/2024/04/moti.svg" alt="" />
                        <span className={styles.nameIcon}>моті</span>
                    </Link>
                    <Link to="/sets" className={styles.productIcon} ><img className={styles.linkIcon} src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-sets.svg" alt="" />
                        <span className={styles.nameIcon}>сети</span>
                    </Link>
                    <Link to="/drinks" className={styles.productIcon} ><img className={styles.linkIcon} src="https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-drinks.svg" alt="" />
                        <span className={styles.nameIcon}>напої</span>
                    </Link>
                </div>

                <div id={styles.hamburger}
                >
                    <Hamburger
                        toggled={isOpen} toggle={setOpen}
                        className={styles.hamburgerComp}
                    />
                    {isOpen && (<div className={styles.aboutUs}>
                        <NavLink to="/zone-delivery" style={{ paddingTop: '5px' }} className={styles.infoAboutUs}>Оплата і доставка</NavLink>
                        <NavLink to="/actions" className={styles.infoActions}>Акції</NavLink>
                        <NavLink to="/about-us" className={styles.infoAboutUs} id={styles.infoAboutUsID}>Про нас</NavLink>
                        <div className={styles.workTimeAboutUs}>
                            <div style={{ fontSize: '22px', margin: '0 auto' }}><b>+380978780837</b></div>
                            <span style={{ fontSize: '26px' }}>Працюємо з  <b>11:00-23:00</b></span>
                        </div>
                    </div>)}
                </div>


                {showPhoneComp ? <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={true}

                >
                    <WeCallComp onClose={closeBackDrop} />
                </Backdrop> : null}

                <div onClick={openContact} className={styles.phoneContact}>
                    <div className={styles.blockPhone}>
                        <img className={styles.phoneImg} src="https://monosushi.com.ua/wp-content/uploads/2020/10/phone.svg" alt="" ></img>
                        <span className={styles.weCall}>
                            МИ ЗАТЕЛЕФОНУЄМО

                        </span>
                    </div>
                </div>

                <div className={styles.workTime}>
                    <div className={styles.workTimeNumber}><b>+380978780837</b></div>
                    <span className={styles.workTimeText}>Працюємо з  <b>11:00-23:00</b></span>
                </div>

                <div onClick={handleClick} className={styles.userLogin}>
                    <img className={styles.userLogo} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/user.svg" alt="" ></img>
                </div>

                {
                    openEnter ? <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={true}>
                        <EnterComp onClose={closeBackDrop} />
                    </Backdrop> : null
                }
                {showCabinet ? <PopUpCabinet setShowCabinet={setShowCabinet} /> : null}

                <div className={styles.basketContainer}>


                    <div onClick={checkBasket} style={showBasket ? { backgroundColor: "transparent" } : null} className={styles.packageBuy}>
                        <img className={styles.packageLogo} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/basket.svg" alt="basket" ></img>
                        <span className={styles.totalPrice}>{orderPrice}грн.</span>
                        <span className={styles.buyCount}>{totalCount}</span>
                    </div>

                    <div style={showBasket ? { display: "block" } : { display: "none" }} className={styles.baketOpenCheck}></div>
                </div>

            </div>

            {
                showBasket ? (

                    <>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: 999 }}
                            open={true}
                            onClick={closeBackDrop}
                        >
                            <Basket
                            // totalCount={totalCount} totalSum={totalSum}
                            />
                        </Backdrop>

                    </>

                ) : null
            }
        </>
    );
}

export default NavbarComp;
