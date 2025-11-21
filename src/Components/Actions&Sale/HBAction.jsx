import React from 'react'
import styles from '../../styles/Actions.module.css'
import { NavLink } from 'react-router-dom'



export const HBAction = () => {
    return (
        <div className={styles.main_HB_container}>
            <div className={styles.boxName}>
                <h2 id={styles.HBText}>День народження з</h2>
                <h2> Monocуші</h2>
            </div>

            <div className={styles.aboutHBCont}>
                <h1 className={styles.HBText_h1}>Святкуй з Monosushi! Суші акція до дня народження</h1>
                <p className={styles.HBText_p}>Незабаром свято? Найкращий день народження  — зі смачними ролами. <NavLink className={styles.HBLink} to="/">Monosushi</NavLink> підготували для вас дещо особливе. І це — не просто знижка. Даруємо “Запечений сет” безкоштовно  до вашого замовлення! Ще більше суші на день народження для вас та ваших гостей. </p>
                <h3 className={styles.HBText_h3}>Як отримати “Запечений сет” на день народження?</h3>
                <p className={styles.HBText_p}>Скористатися акцією можна просто:</p>
                <ul className={styles.HBText_list} >
                    <li className={styles.HBText_item} > Замовте суші на 750 грн та більше. Це можуть бути будь-які позиції з нашого меню.</li>
                    <li className={styles.HBText_item} >Оберіть зі списку акцій – “Акцію до дня народження” під час оформлення замовлення. </li>
                    <li className={styles.HBText_item} >Покажіть кур’єру при отриманні  документ (оригінал), який підтверджує вашу дату народження.</li>
                </ul>
                <p className={styles.HBText_p}> <b>Готово:</b> отримайте “Запечений сет” та насолоджуйтеся неповторним смаком ролів від Monosushi!

                    Суші акція діє на ваш  день народження + один день до та після свята. <br />

                    <b>Зверніть увагу:</b>  ця акція не сумується з іншими акціями.</p>
            </div>
        </div>
    )
}

export default HBAction;
