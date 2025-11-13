import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/ErrorPage.module.css'

const OrderHistory = () => {


    const [orderItems, setOrderItems] = useState([])
    useEffect(() => {

        axios.get('http://localhost:5000/add-order')
            .then(response => {
                //console.log(response.data);
                const orderArr = response.data.flat(Infinity)
                console.log(orderArr);


            })
            .catch(error => console.error("Помилка завантаження історії замовлень:", error));

    }, []);



    return (
        <>
            {orderItems && orderItems.length > 0 ? <div className={styles.buyingContainer}>{orderItems.map((item, index) => (
                <li className={styles.buyedItemsLi} key={index}>
                    <div className={styles.buyedItemsName}>{item.name}</div> <span style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '21px' }}>{item.totalCount}</span>
                </li>
            ))}</div> : <h2>У Вас ще не має замовлень, перейти до <NavLink to='/'><b>каталогу</b></NavLink> </h2>
            }
        </>
    )
}

export default OrderHistory