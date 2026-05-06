import { useState } from "react";
import styles from "../../styles/Footer.module.css"
import { NavLink } from "react-router-dom";



function Footer() {






    return (
        <div className={styles.footer}>

            <div className={styles.lastFoot}>
                <div className={styles.footAboutUs}>
                    <img className={styles.footIcon} src="https://monosushi.com.ua/wp-content/uploads/2021/06/logo.svg" alt="" />
                    <NavLink className={styles.footerLink} to="actions" href="#">Акції</NavLink >
                    <NavLink className={styles.footerLink} to="about-us">Про нас</NavLink>
                    <NavLink className={styles.footerLink} to="oferta">Оферта</NavLink>
                    <p className={styles.footDelivery}><b>Точка самовивозу</b>
                        <br />
                        вул. Володимира Великого, 10в
                    </p>
                    <p className={styles.footOrder}><b>Оформити замовлення</b>
                        <br />
                        +380978780837</p>
                    <p className={styles.footWorkTime}><b>Працюємо з 11:00-23:00</b></p>
                </div>
                <div className={styles.siteFoot}>

                    <div><p>2024 Monosushi</p></div>

                    <div>
                        <img className={styles.payCards} src="https://monosushi.com.ua/wp-content/uploads/2020/10/pay-card-img-1.svg" alt="" />
                        <img className={styles.payCards} src="https://monosushi.com.ua/wp-content/uploads/2020/10/pay-card-img-2.svg" alt="" />
                        <img className={styles.payCards} src="https://monosushi.com.ua/wp-content/uploads/2020/10/pay-card-img-3.svg" alt="" />
                    </div>

                    <div className={styles.followUsFoot}>
                        <p className={styles.followText}>Follow us</p>
                        <a href="#" className={styles.foolowLink}>
                            <img className={styles.followImg} src="https://monosushi.com.ua/wp-content/uploads/2020/10/facebook-icon.svg" alt="" />
                        </a>
                        <a className={styles.foolowLink} href="#">
                            <img className={styles.followImg} src="https://monosushi.com.ua/wp-content/uploads/2020/10/instagram-icon.svg" alt="" />
                        </a>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Footer;