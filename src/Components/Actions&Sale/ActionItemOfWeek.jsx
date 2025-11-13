import React from 'react'
import styles from '../../styles/Actions.module.css'


const ActionItemOfWeek = () => {
    return (
        <div className={styles.weekRollContainer}>
            <div className={styles.boxName}>
                <h2 id={styles.RolOfWeek_h2}>50% знижки на "Рол тижня"</h2>
            </div>
            <div className={styles.aboutHBCont}>
                <h1 className={styles.RolOfWeek_h1}>Акційний “рол Тижня”</h1>
                <ul className={styles.RolOfWeek_list}>
                    <li>Щотижня діє знижка 50% на один з ролів у нашому меню.</li>
                    <li>“Рол тижня” ви можете знайти на головній сторінці нашого сайту.</li>
                    <li>Знижка діє при мінімальній сумі замовлення 300 грн.</li>
                    <li>Ця акція не поєднується з іншими акціями.</li>
                </ul>
            </div>
        </div>
    )
}


export default ActionItemOfWeek