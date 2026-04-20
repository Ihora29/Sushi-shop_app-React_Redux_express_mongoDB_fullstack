import React, { useState } from 'react'
import styles from "./../../styles/AboutUs.module.css"
import imgUp from "../../images/reshot-icon-up-MB34E6VNCW.svg"
import imgDown from "../../images/reshot-icon-down-2GNMF7CK9P.svg"

const AboutUsPage = () => {

    const [showFourthQuest, setShowFourthQuest] = useState(false);
    const [showFirstQuest, setShowFirstQuest] = useState(false)
    const [showSecondQuest, setShowSecondQuest] = useState(false)
    const [showThirdQuest, setShowThirdQuest] = useState(false)
    return (
        <>
            <div className={styles.mainAboutCont}>
                <h1 className={styles.mainNamepage}>Про нас</h1>
                <div className={styles.descrContainer}>
                    <h3>Monosushi – доставка неймовірно смачних суші у Львові.</h3>
                    <span className={styles.descrpText}>Головний пріоритет – висока якість їжі та сервісу. Ми – команда професіоналів, яка щодня працює для
                        Вас. Якість та Швидкість! – це два основних пріоритети в роботі команди. В першу чергу звичайно ж
                        Якість. Суші готуються без затримок, одразу ж після Вашого замовлення. А завдяки сучасним технологіям та
                        відповідальному навчанню працівників, свіжі страви можливо доставляти до 59 хв в 75% замовлень.</span>
                    <ul>
                        <li className={styles.descrpText} >висока якість їжі та сервісу</li>
                        <li className={styles.descrpText}>команда професіоналів</li>
                        <li className={styles.descrpText}>сучасні технології приготування</li>
                    </ul>
                    <div className={styles.secondContainer}>
                        <img className={styles.secondImgCont} src="https://monosushi.com.ua/wp-content/uploads/2022/07/img_1127-scaled-568x568.jpg" alt="" />
                        <div className={styles.blockOfsecondCont}>
                            <h4>Привіт! Познайомимось?</h4>
                            <span className={styles.descrpText}> Monosushi – це доставка найсмачніших суші у Львові, яка була створена командою перфекціоністів. Двоє друзів, які обожнюють роли вирішили створити продукт, якого їм не вистачало на ринку Львова. Продукт, в якому ідеальним буде все: смак, упакування, сервіс і все це за лояльною ціною!</span>
                        </div>
                    </div>

                    <div className={styles.secondContainer}>

                        <div className={styles.blockOfsecondCont}>
                            <h4>Наш пріоритет - ваша посмішка від задоволення</h4>
                            <span className={styles.descrpText}> <b>Monosushi </b> – це доставка одного (mono) продукту. Роли вже давно стали рядовою стравою, проте процес їх приготування всеодно залишається цілим мистецтвом. Суші потрібно готувати за чіткою технологією суворо дотримуючись традицій. І в цьому ми справжні експерти! Сумніваєтесь? Тоді замовляйте доставку Monosushi і насолоджуйтесь.</span>
                        </div>
                        <img className={styles.secondImgCont} src="https://monosushi.com.ua/wp-content/uploads/2022/07/img_8051-scaled-568x568.jpeg" alt="" />
                    </div>
                    <h2>Наші переваги</h2>
                    <div className={styles.thirdContainer}>
                        <div className={styles.blockOfThirdContainer}>
                            <img className={styles.imgOfThirdCont} src="https://monosushi.com.ua/wp-content/uploads/2020/10/advantages-img-1.svg" alt="" />
                            <h6 className={styles.ourPrefer}>Свіжі продукти</h6>
                            <span className={styles.thirdContainerText}>Наші інгредієнти ще вчора плавали у морі, а сьогодні вже у Ваших сушиках</span>
                        </div>
                        <div className={styles.blockOfThirdContainer}>
                            <img className={styles.imgOfThirdCont} src="https://monosushi.com.ua/wp-content/uploads/2020/10/advantages-img-2.svg" alt="" />
                            <h6 className={styles.ourPrefer}>Неймовірний смак</h6>
                            <span className={styles.thirdContainerText}>  Ми створили сушики, які змусять Ваші рецептори вибухнути від насолоди</span>
                        </div>
                        <div className={styles.blockOfThirdContainer}>
                            <img className={styles.imgOfThirdCont} src="https://monosushi.com.ua/wp-content/uploads/2020/10/advantages-img-3.svg" alt="" />
                            <h6 className={styles.ourPrefer} >Великі порції</h6>
                            <span className={styles.thirdContainerText}>Ми як ніхто інший розуміємо, що морепродукти потребують абсолютної чистоти на кухні </span>
                        </div>
                        <div className={styles.blockOfThirdContainer}>
                            <img className={styles.imgOfThirdCont} src="https://monosushi.com.ua/wp-content/uploads/2020/10/advantages-img-4.svg" alt="" />
                            <h6 className={styles.ourPrefer}>Чистота на кухні</h6>
                            <span className={styles.thirdContainerText}>Ми як ніхто інший розуміємо, що морепродукти потребують абсолютної чистоти на кухні</span>
                        </div>
                    </div>
                    <h2>Популярні запитання</h2>


                    <div className={styles.questionBlock}>
                        <h5 onClick={() => { setShowFirstQuest(!showFirstQuest) }}>Як можна замовити, якщо наша адреса не входить у вашу зону доставки?</h5>
                        <img className={styles.arrowPic} style={showFirstQuest ? { display: 'none' } : { display: 'block' }} src={imgDown} alt="" />
                        {showFirstQuest ? (<>        <img className={styles.arrowPic} id='ArrUp' src={imgUp} alt="" />
                            <span className={styles.descrpText}>Якщо ваша адреса знаходиться поза межами нашої зони доставки, ви можете:</span>
                            <ol>
                                <li className={styles.descrpQuest}>  Забрати замовлення самовивозом за однією з наших адрес. (В такому випадку ви отримаєте “Запечені моно макі з лососем у подарунок).</li>
                                <li className={styles.descrpQuest}>   Дізнатись в оператора чи є можливість зробити виключення для доставки поза межі зони в даний момент часу.</li>
                            </ol></>) : null}
                    </div>

                    <div className={styles.questionBlock}>
                        <h5 onClick={() => { setShowSecondQuest(!showSecondQuest) }}>Скільки часу очікувати на замовлення?</h5>
                        <img src={imgDown} style={showSecondQuest ? { display: 'none' } : { display: 'block' }} className={styles.arrowPic} alt="" />
                        {showSecondQuest ? (<><img className={styles.arrowPic} id='ArrUp' src={imgUp} alt="" />
                            <span className={styles.descrpQuest}> Час доставки залежить від адреси замовлення.
                                Доставка в зелену зону – до 1 год.
                                Доставка в жовту зону – до 1,5 год.</span></>) : null}
                    </div>

                    <div className={styles.questionBlock}>
                        <h5 onClick={() => { setShowThirdQuest(!showThirdQuest) }}>Доставка безкоштовна?</h5>
                        <img src={imgDown} style={showThirdQuest ? { display: 'none' } : { display: 'block' }} className={styles.arrowPic} alt="" />
                        {showThirdQuest ? (<>     <img className={styles.arrowPic} id='ArrUp' src={imgUp} alt="" />
                            <span className={styles.descrpQuest}> Доставка здійснюється платно</span></>) : null}

                    </div>

                    <div className={styles.questionBlock}>
                        <h5 onClick={() => { setShowFourthQuest(!showFourthQuest) }}>До якої години ви приймаєте замовлення?</h5>
                        <img src={imgDown} style={showFourthQuest ? { display: 'none' } : { display: 'block' }} id='ArrDown' className={styles.arrowPic} alt="" />
                        {
                            showFourthQuest ? (<> <img className={styles.arrowPic} id='arrUp' src={imgUp} alt="" />
                                <span className={styles.descrpQuest}>Ми приймаємо замовлення кожного дня з 11:00 по 22:30 ( у зв’язку з комендантською годиною )</span></>) : null
                        }
                    </div>

                </div>
            </div>

        </>
    )
}

export default AboutUsPage