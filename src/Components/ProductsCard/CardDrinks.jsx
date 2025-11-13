import React, { useEffect, useState } from "react";
import styles from "../../styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/getProductsSlice";

import { AboutDrinks } from "../Footer/AboutDrinks";
import { NavLink } from "react-router-dom";
import { addToBasket } from "../redux/basketSlice";

function CardDrinks() {

    const productsData = useSelector((state) => state.products.products);
    const drinksArr = productsData.filter(item => item.type === "drinks");
    //drinks.push(productsData.slice(14, 15))
    console.log();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const [drinksProd, setDrinksProd] = useState([])

    useEffect(() => {
        if (drinksArr) {

            setDrinksProd(drinksArr);
        }
    }, []);

    const handleAddBasket = (e, item) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        dispatch(addToBasket(item))
    };

    const handleIncrese = (e, item_id) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setDrinksProd(
            drinksProd.map(item => {
                if (item_id === item.id) {
                    return { ...item, totalCount: item.totalCount + 1 }
                }
                else {
                    return item
                }
            })
        )
    }

    const handleDecrese = (e, item_id) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setDrinksProd(
            drinksProd.map(item => {
                if (item_id === item.id) {
                    return { ...item, totalCount: item.totalCount - (item.totalCount > 1 ? 1 : 0) }
                }
                else {
                    return item
                }
            })
        )
    }

    return (
        <>
            <h1 className={styles.nameCard}>Напої</h1>
            <div className={styles.card}>
                {productsData && productsData.length > 0 ? (
                    drinksArr.map((item) => {

                        return (
                            <NavLink to={`/product/${item.id}`} key={item.id} className={styles.productItem}>
                                <img src={item.imgSrc} className={styles.itemIcon} alt="" />
                                <h2 className={styles.nameProduct}>{item.name}</h2>
                                {item.option ? <div className={styles.itemOption}>{item.option}</div> : null}
                                <div className={styles.aboutProduct}>
                                    <p className={styles.itemProd}>{item.details}</p>
                                    <span className={styles.weightProduct}> Вага: {item.weight}</span>
                                </div>

                                <div className={styles.footItem}>
                                    <span className={styles.prodPrice}>{item.price * item.totalCount} грн.</span>
                                    <div className={styles.orderCount}>
                                        <button className={styles.btnOrder}
                                            onClick={(e) => handleDecrese(e, item.id)}
                                        >-</button>
                                        <span className={styles.count}>{item.totalCount}</span>
                                        <button className={styles.btnOrder}
                                            onClick={(e) => handleIncrese(e, item.id)}
                                        >+</button>
                                    </div>
                                    <button className={styles.btnBuy}
                                        onClick={(e) => handleAddBasket(e, item)}
                                    >ЗАМОВИТИ</button>
                                </div>
                            </NavLink>
                        );
                    })
                ) : (
                    <h1>No products available</h1>
                )}
            </div>

            <AboutDrinks />
        </>


    );
}

export default CardDrinks;
