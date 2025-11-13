import { createContext } from 'react'
import { NavLink, useLocation, Outlet } from "react-router-dom";
import styles from "../../styles/UserCabinet.module.css"
import { fetchUser } from '../redux/getUserSlice';
import { useDispatch, useSelector, } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from "react-router-dom";
const UserCabinet = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const userAuth = useSelector((state) => state.getUser.user);
    //  console.log(userAuth);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    // if (!userAuth) {
    //     return <Navigate to="/" replace />;
    // }




    return (
        <>

            <div className={styles.mainContainer}>
                <div className={styles.navSideRoutes}>
                    <ul className={styles.navList}>
                        <li><NavLink to='' className={styles.linkInCabinet}>Особисті дані</NavLink></li>
                        <li><NavLink to="orderhistory" className={styles.linkInCabinet}>Історія замовлень</NavLink></li>
                        <li><NavLink to='changepass' className={styles.linkInCabinet}>Зміна паролю</NavLink></li>
                    </ul>
                </div>

                <div className={styles.userDataContainer}>

                    <Outlet

                    />
                </div>

            </div>


        </ >
    )
}

export default UserCabinet
