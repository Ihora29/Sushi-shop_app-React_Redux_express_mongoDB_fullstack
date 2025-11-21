import React from 'react'
import styles from '../../styles/Actions.module.css'



const ActionTakeYourself = () => {
    return (
        <div style={{ width: "100vh", margin: '150px auto' }}>
            <div className={styles.boxName}>
                <h1 className={styles.takeYoureslf_h1}>Самовивіз</h1>
            </div>
            <div className={styles.aboutHBCont}>
                <h2 className={styles.takeYoureslf_h2}>Самовивіз суш у Львові</h2>
                <span className={styles.takeYoureslf_span}>Забирайте своє замовлення самостійно та отримуйте такі переваги:</span>
                <ol className={styles.takeYoureslf_ol_list}>
                    <li>Запечені моно макі з лососем у подарунок.</li>
                    <li>Відсутність мінімальної суми замовлення.</li>
                    <li>Час очікування на замовлення до 30 хв.</li>
                </ol>
                <ul className={styles.takeYoureslf_ul_list}>
                    <li>Для отримання акційного ролу у подарунок зберігається умова мінімальної суми замовлення 300 грн.</li>
                    <li>Ця акція не поєднується з іншими акціями.</li>
                </ul>
            </div>
        </div>
    )
}


export default ActionTakeYourself