import React from 'react'
import styles from '../../styles/Actions.module.css'
import { NavLink } from 'react-router-dom'

const Actions = () => {
    return (
        <div className={styles.actionMainCont}>
            <h1 className={styles.actionText}>Акції на суші</h1>
            <div className={styles.firstBlok}>

                <NavLink to="/roll-of-week" className={styles.actionContainer}>
                    <img src="https://monosushi.com.ua/wp-content/uploads/2022/07/imgonline-com-ua-compressed-ryna9n84oqh1-scaled-697x379.jpg" alt="" />
                    <span className={styles.nameAction}>Рол тижня</span>
                    <button className={styles.btnActionMore}>Дізнатись Більше...</button>
                </NavLink>

                <NavLink to="/3in5" className={styles.actionContainer}>
                    <img src="https://monosushi.com.ua/wp-content/uploads/2022/07/imgonline-com-ua-compressed-ajbic74qfau00-scaled-697x379.jpg" alt="" />
                    <span className={styles.nameAction}>3+1=5</span>
                    <button className={styles.btnActionMore}>Дізнатись Більше...</button>
                </NavLink >

            </div>

            <div className={styles.firstBlok}>

                <NavLink to="/take-yourself" className={styles.actionContainer}>
                    <img src="https://monosushi.com.ua/wp-content/uploads/2022/07/imgonline-com-ua-compressed-pa0akdpwddstmsv1-scaled-697x379.jpg" alt="" />
                    <span className={styles.nameAction}>Самовивіз</span>
                    <button className={styles.btnActionMore}>Дізнатись Більше...</button>
                </NavLink>

                <NavLink to="/happy-birthday" className={styles.actionContainer}>
                    <img src="https://monosushi.com.ua/wp-content/uploads/2022/07/den-nar-scaled-697x379.jpg" alt="" />
                    <span className={styles.nameAction}>День Народження!</span>
                    <button className={styles.btnActionMore}>Дізнатись Більше...</button>
                </NavLink>

            </div>

            <div className={styles.aboutHBCont}>
                <h1>Суші-акції у Львові</h1>
                <p className={styles.actionParagraf}>Мрієте смакувати суші, не переплачуючи? З Monosushi це можливо! Ми зібрали найвигідніші акційні суші у Львові у цьому розділі сайту. Ви можете легко ознайомитися з усіма спеціальними пропозиціями та замовити роли за привабливою ціною. А ще — отримати рол або цілий сет у подарунок!</p>
                <h1>Акційні суші, які вам точно сподобаються</h1>
                <p className={styles.actionParagraf}>Ми пропонуємо смачні та вигідні акції, які допоможуть смакувати ролами вигідно:</p>

                <ul className={styles.action_ul_list}>
                    <li>Акція “Рол тижня”. Знижка 50% на один з ролів у нашому меню.</li>
                    <li>3+1 = 5. Замовляйте 4 роли та отримуйте п’ятий абсолютно безкоштовно. Те, що треба на велику компанію.</li>
                    <li>День народження з Моносуші. Отримайте “Запечений сет” у подарунок, якщо сьогодні святкуєте день народження.</li>
                    <li>Акція на самовивіз. Якщо ви забираєте суші самостійно, отримайте запечені моно макі у подарунок.</li>
                </ul>

                <h1>Доставка суші по акції у Львові: правила від Monosushi</h1>
                <p className={styles.actionParagraf}>Більшість наших акцій не сумуються між собою, а також доступні при замовленні суші на певну суму. Ознайомитися з правилами та умовами кожної акції можна, натиснувши “Дізнатися більше”. Також наші менеджери із задоволенням проконсультують вас акцій на суші у Львові.

                    Швидка доставка акційних суші, неповторний смак, аромат та гарна подача гарантовані. Адже ми — справжні перфекціоністи, які дуже уважні до дрібниць. Готуємо роли з добірних продуктів, стежимо за дотриманням усіх тонкощів кулінарного процесу. На нашій кухні стерильно, а наші рецепти — досконалі.

                    Скоріш оформляйте замовлення та смакуйте улюблені роли вигідно з Monosushi!</p>
            </div>


        </div>
    )
}

export default Actions