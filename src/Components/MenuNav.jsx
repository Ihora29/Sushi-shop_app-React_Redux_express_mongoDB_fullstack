import styles from "../styles/MenuNav.module.css";
import { Link, NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MenuNav() {
    return (
        <div className={styles.menuNav}>
            <NavLink to="/" className={styles.menuOption} style={({ isActive }) => ({ color: isActive ? ("#b5d8f7") : "black" })} >Всі</NavLink >
            <NavLink to="/sushi" className={styles.menuOption} style={({ isActive }) => ({ color: isActive ? ("#b5d8f7") : "black" })} >Суші</NavLink >
            <NavLink to="/drinks" className={styles.menuOption} style={({ isActive }) => ({ color: isActive ? "#b5d8f7" : "black" })} >Напої</NavLink >
            <NavLink to="/sets" className={styles.menuOption} style={({ isActive }) => ({ color: isActive ? "#b5d8f7" : "black" })} >Сети</NavLink >
            <NavLink to="moti" className={styles.menuOption} style={({ isActive }) => ({ color: isActive ? "#b5d8f7" : "black" })} >Моті</NavLink >
            <NavLink to="best&sale_products" className={styles.menuOption} style={({ isActive }) => ({ color: isActive ? "#b5d8f7" : "black" })} >Акційні товари</NavLink >
        </div>
    )
}

export default MenuNav