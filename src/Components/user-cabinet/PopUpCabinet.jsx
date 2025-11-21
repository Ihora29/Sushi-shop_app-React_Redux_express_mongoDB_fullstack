
import { useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.css";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import arrowImg from '../../images/arrow-top-svgrepo-com.svg'
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/getUserSlice";
import { logout } from "../redux/getUserSlice"
axios.defaults.withCredentials = true;



export const PopUpCabinet = ({ setShowCabinet }) => {



    // const userLogin = useSelector((state) => state.getUser.user);
    // console.log(userLogin);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const navigate = useNavigate();

    const handleLogOut = async () => {
        await axios.post("http://localhost:5000/logout", {});
        dispatch(logout())
        setShowCabinet(false);
        navigate("/")
    }

    const handleQuitIcon = () => {
        setShowCabinet(false);
    }

    return (
        <div className={styles.cabinetContainer}>
            <ul className={styles.ul_cabinet_list}>

                <li className={styles.itemListCabinet} onClick={handleQuitIcon}><NavLink
                    to={`/user-cabinet/`}
                    className={styles.listLinkItem}>Особистий кабінет</NavLink></li>
                <li className={styles.itemListCabinet} onClick={handleQuitIcon}><NavLink
                    to={`/user-cabinet/orderhistory`}

                    className={styles.listLinkItem}>Історія покупок</NavLink></li>
                <li className={styles.itemListCabinet} onClick={handleQuitIcon}><NavLink
                    to={`/user-cabinet/changepass`}
                    className={styles.listLinkItem}>Змінити пароль</NavLink></li>
                <li className={styles.itemListCabinet}><button
                    onClick={handleLogOut}
                    className={styles.logOutBtn}>Вийти</button></li>
                <li className={styles.itemListCabinet} onClick={() => {
                    setShowCabinet(false)
                }}>
                    <img src={arrowImg} style={{ width: '20px', height: '100%' }} alt="" />
                </li>
            </ul>

        </div>
    )
}
