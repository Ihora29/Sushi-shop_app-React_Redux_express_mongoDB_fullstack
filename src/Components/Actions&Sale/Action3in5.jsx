import React from 'react'
import styles from '../../styles/Actions.module.css'



const Action3in5 = () => {
    return (
        <div className={styles.container3in5}>
            <div className={styles.boxName}>
                <h1 className={styles.action3in5_h1}>"3+1=5"</h1>
            </div>
            <div className={styles.aboutHBCont}>
                <h2 className={styles.action3in5_h2}>    Акційний “3+1=5”</h2>
                <ul className={styles.action3in5_list}>
                    <li>Замовляйте 5 ролів, а платіть за 4.</li>
                    <li>Замовляйте 10 ролів, а платіть за 8 і так далі.</li>
                    <li>Безкоштовним вважається рол з найменшою вартістю.</li>
                    <li>Ця акція не поєднується з іншими акціями.</li>
                </ul>
            </div>
        </div>
    )
}

export default Action3in5;