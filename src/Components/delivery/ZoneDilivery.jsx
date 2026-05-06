import React from 'react';
import styles from '../../styles/Delivery.module.css'
import { MapContainer, TileLayer, Polygon, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import shopicon from '../../images/shop-svgrepo-com.svg';
import { useState } from 'react';



const ZoneDelivery = () => {
    const [position, setPosition] = useState([49.8397, 24.0297]); // Початкові координати (Львів)

    const mapRef = useRef();

    const customMarkerShop = new L.Icon({
        iconUrl: shopicon,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });

    const deliveryZones = [

        {
            name: "Левандівка",
            color: "yellow",
            coordinates: [
                [
                    [49.8700, 23.9600],
                    [49.8600, 24.0000],
                    [49.8500, 24.0300],
                    [49.8350, 24.0500],
                    [49.8100, 24.0400],
                    [49.8000, 24.0100],
                    [49.8050, 23.9800],
                    [49.8200, 23.9600],
                    [49.8400, 23.9500]
                ]
            ]
        },
        {
            name: "центр",
            color: "green",
            coordinates: [
                [
                    [49.8110, 23.9900], // Верхній лівий кут
                    [49.8180, 23.9950],
                    [49.8230, 24.0050], // Верхній правий кут
                    [49.8180, 24.0150],
                    [49.8130, 24.0200], // Нижній правий кут
                    [49.8080, 24.0250],
                    [49.8030, 24.0200], // Нижній лівий кут
                    [49.7980, 24.0100],
                    [49.8030, 23.9950],
                ]

            ]
        }
    ];

    return (
        <div className={styles.deliveryZoneContainer}>

            <h1 className={styles.h1line} >Доставка та оплата</h1>

            <section className={styles.firstInfo}>

                <div className={styles.deliveryCont1}>
                    <img src="https://monosushi.com.ua/wp-content/uploads/2020/10/mn-delivery-img.svg" className={styles.deliveryIcon} alt="" />

                    <div className={styles.descrybDelivery}>
                        <h6 className={styles.describeH6Green}> Зелена зона</h6>

                        <p className={styles.describePtext}>В межах зеленої зони ми доставляємо протягом</p> <span className={styles.descrOptionsGreen}>1 год.</span>
                        <br />
                        <br />
                        <p className={styles.describePtext}>Мінімальна сума замовлення в цю зону становить</p> <span className={styles.descrOptionsGreen}>400 грн.</span>
                        <br />
                        <br />
                        <p className={styles.describePtext} >Вартість доставки - 40 грн</p>
                    </div>
                </div>
                <div className={styles.deliveryCont2}>
                    <img src="https://monosushi.com.ua/wp-content/uploads/2020/10/mn-delivery-img.svg" className={styles.deliveryIcon} alt="" />

                    <div className={styles.descrybDelivery}>
                        <h6 className={styles.describeH6Yellow}>Жовта зона</h6>
                        <p className={styles.describePtext}>В межах жовтої зони ми доставляємо протягом </p> <span className={styles.descrOptionsYellow}>1.5 год.</span>
                        <br />
                        <br />
                        <p className={styles.describePtext}>Мінімальна сума замовлення в цю зону становить </p > <span className={styles.descrOptionsYellow}>500 грн.</span>
                        <br />
                        <br />
                        <p className={styles.describePtext} >Вартість доставки - 50 грн</p>
                    </div>
                </div>
            </section>
            <div className={styles.mapDelivery}>
                <MapContainer
                    center={[49.8397, 24.0297]}
                    zoom={12}
                    className={styles.mapDeliveryCont}
                    ref={mapRef}
                    zoomControl={false}

                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {deliveryZones.map((zone, index) => (
                        <Polygon key={index} pathOptions={{ color: zone.color }} positions={zone.coordinates} />
                    ))}

                    <Marker
                        position={[49.8096, 24.0103]} /// Фіксована адреса магазину
                        icon={customMarkerShop} // Іконка для маркера
                        draggable={false} // Невідповідно для нерухомого маркера
                    />
                    <ZoomControl position="topright" className="custom-zoom-control" />
                </MapContainer>
            </div>
            <section className={styles.descrPayText}>
                <p>Команда «Monosushi» пропонує надзвичайно зручну систему доставки та оплати. Чіткість наших стандартів роботи забезпечує швидке і якісне виконання замовлень для наших гостей.

                    Ми поділили Львів на умовні зони доставки – зелену та жовту. Для кожної зони ми чітко визначаємо час доставки.
                    Зелена зона доставки знаходиться ближче до нашої кухні, тому замовлення в цю зону доставляються – до 1 год. В жовту зону, яка знаходиться значно далі – до 1,5 год.</p>
            </section>
            <h2 style={{ textAlign: 'center', width: '100%' }}>Оплата</h2>
            <div className={styles.payContainer}>
                <div className={styles.payCashContainer}>
                    <div className={styles.payCashIcon}><img src="https://monosushi.com.ua/wp-content/uploads/2020/11/pay-info-img-3.svg" alt="" /></div>

                    <div className={styles.payContainerDescr}>
                        <h6 className={styles.payH6}>Оплата готівкою</h6>
                        <br />
                        <p className={styles.payP}>Розраховуйтесь за свої улюблені сушики готівкою при отриманні.</p>
                    </div>
                </div>

                <div className={styles.payCashContainer}>
                    <div className={styles.payCashIcon} > <img src="https://monosushi.com.ua/wp-content/uploads/2020/11/pay-info-img-1.svg" alt="" /></div>
                    <div className={styles.payContainerDescr}>
                        <h6 className={styles.payH6}>Безготівкова оплата</h6>
                        <br />
                        <p className={styles.payP}>Розраховуйтесь за свої улюблені сушики онлайн або карткою при отриманні.</p>
                    </div>
                </div>
            </div>

            <div className={styles.desryHowToPayCont}><p>
                Ми пропонуємо Вам 3 найпоширеніші варіанти для розрахунку: готівка, оплата онлайн або ж розрахунок карткою.

                Просто позначте найбільш зручний для Вас спосіб оплати при оформленні замовлення на сайті або ж повідомте про це оператора по телефону.

                Доставка «Моносуші» – це чіткі стандарти роботи, високий рівень сервісу та турбота про кожного гостя. Ми щодня розвиваємось, щоб почути лише три слова «Моносуші – це любов».</p></div>

        </div>
    )
}
export default ZoneDelivery