import React, { useEffect } from 'react'
import styles from '../../styles/ErrorPage.module.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


export const CheckForBuy = ({ address, totalSum, clientDelivery }) => {
    const basket = useSelector((state) => state.basketItems.basketItems);

    useEffect(() => {
        console.log('basket', basket);

        console.log('address', address);
        console.log('clientDelivery', clientDelivery);


    }, [])





    return (
        <>
            <div className={styles.checkWrapper}>

                <h1 className={styles.thnksOrder}>Дякуємо за замовлення!</h1>
                <section className={styles.checkBody}>

                    {basket.map((item, index) => (

                        <li key={index} className={styles.buyingItem}><div className={styles.itemName}>{item.name}</div><div className={styles.itemCounts}><span style={{ marginLeft: '5px' }}>{item.totalCount}</span><span>{item.price * item.totalCount}<span style={{ fontSize: '12px' }}>грн</span></span></div></li>


                    ))}
                    <div className={styles.totalSumCont}>total:{totalSum} <span>грн.</span></div>
                    <div className={styles.addressName}>adress:{address}</div>
                </section>
                <div className={styles.iconCheck}>
                    <img src="https://monosushi.com.ua/wp-content/uploads/2020/10/mn-delivery-img.svg" className={styles.iconDeliver} alt="" />
                    <h6 className={styles.footerCheckH6}> Очікуйте на дзвінок.Кур'єр прямує до Вас!</h6>
                    <NavLink className={styles.checkBtn} to='/'>На головну</NavLink>
                </div>
            </div>
        </>
    )
}
