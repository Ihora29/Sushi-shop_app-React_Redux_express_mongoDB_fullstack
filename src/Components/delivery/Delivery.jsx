import { NavLink } from 'react-router-dom';
import styles from '../../styles/Delivery.module.css'


function Delivery() {
    return (
        <div className={styles.deliveryContainer}>

            <div className={styles.sect1}>
                <img className={styles.deliveryPictures1} src="	https://monosushi.com.ua/wp-content/uploads/2020/10/mn-delivery-img.svg" alt="" ></img>
                <NavLink to="zone-delivery" className={styles.buttonDelivery}>Зона доставки</NavLink>
            </div>

            <div className={styles.sect2}>
                <img className={styles.deliveryPictures2} src="https://monosushi.com.ua/wp-content/uploads/2020/10/mono-supermen.svg" alt="" ></img>
                <span className={styles.deliveryDescr}>Середній час доставки в зеленій зоні 00:43:00</span>
            </div>

            <div className={styles.sect3}>
                <img className={styles.deliveryPictures3} src="https://monosushi.com.ua/wp-content/uploads/2020/10/mono-bonus.svg" alt="" ></img>
                <span className={styles.deliveryDescr}>Наш графік роботи: 11:00 до 23:00</span>
            </div>

        </div>
    );
}

export default Delivery;