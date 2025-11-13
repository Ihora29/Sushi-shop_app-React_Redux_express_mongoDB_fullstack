import React, { useState } from "react";
import styles from "../../styles/Login.module.css"
import img from "../../images/close-ellipse-svgrepo-com.svg"
import { useMask } from '@react-input/mask';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserCabinet } from "../user-cabinet/UserCabinet";
import { useEffect } from "react";
import axios from "axios";

function LoginComp({ onClose }) {

    const [closeLogin, setCloseLogin] = useState(true);

    function closeLoginComp() {
        setCloseLogin(!closeLogin)
    };

    const inputRef = useMask({
        mask: '380_________',
        showMask: false,
        replacement: { _: /\d/ },
    });

    const handleMusk = () => {
        inputRef.showMask = true;
    };

    const { register,
        handleSubmit, watch, formState: { errors } } = useForm({ mode: "onChange" });

    const password = watch("password");

    // const navigate = useNavigate();

    const onSubmit = async (data) => {
        const userPhone = inputRef?.current.value;

        if (data) {
            const user = { ...data, status: "login-user", phone: userPhone }
            delete user["confirmPassword"]

            axios.post('http://localhost:5000/register', user)
                .then(res => {
                    console.log('res', res);
                    closeLoginComp()
                    onClose()
                })
                .catch(error => {
                    if (error.response) {
                        console.log('Server error:', error.response.data.msg)

                    }
                })

        }

    }



    return (
        <div className={styles.loginCard} style={{ display: closeLogin ? "flex" : "none" }}>
            <div className={styles.headRegistrCont}>
                <button onClick={onClose} aria-hidden={false} className={styles.closeBtn}>
                    <img className={styles.closeImg} src={img} alt="" />
                </button>
                <span
                    className={styles.textRegister}>Створіть кабінет</span>
            </div>

            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.nameBlok}>
                    <input type="text" className={styles.inputName} aria-hidden={false} id="firstName" placeholder="Ваше ім'я "
                        {...register('firstName', {
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]{2,20}$/,
                                message: 'Введіть ім*я коректно'
                            }, required: 'поле обов*язкове'
                        })}
                    />
                    <input type="text" className={styles.inputName} aria-hidden={false} id="secondName" placeholder="Ваше прізвище"
                        {...register('secondName', {
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]{2,20}$/,
                                message: 'Введіть прізвище коректно'
                            }, required: 'поле обов*язкове'
                        })}
                    />
                </div>
                <p >{errors.firstName?.message}</p>
                <p >{errors.secondName?.message}</p>
                <input className={styles.inputContacts} aria-hidden={false} placeholder="Ваш номер телефону"
                    ref={inputRef} onChange={() => handleMusk} required />

                <input type="email" className={styles.inputContacts} aria-hidden={false} placeholder="Email"
                    {...register('email', {
                        pattern: {

                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Введіть адресу коректно'
                        }, required: true
                    })
                    } required />
                <p >{errors.email?.message}</p>

                <div className={styles.nameBlok}>
                    <input type="password" className={styles.inputPassword}
                        aria-hidden={false}
                        placeholder="Пароль"
                        {...register('password', {
                            minLength: { value: 6, message: 'Введіть пароль не менше 6 символів' },
                            pattern: {
                                value: /^[A-Za-z\d]{6,}$/,
                            },
                            required: 'поле обов*язкове'
                        })
                        }
                    />

                    <input type="password" className={styles.inputPassword} aria-hidden={false} placeholder="Пароль знову"
                        {...register('confirmPassword', {
                            minLength: { value: 6, message: 'Повторіть пароль не менше 6 символів' },
                            pattern: {
                                value: /^[A-Za-z\d]{6,}$/,
                            },
                            required: 'поле обов*язкове',
                            validate: (value) =>
                                value === password || "Паролі не співпадають",
                        })
                        }
                    />

                </div>
                <p >{errors.password?.message}</p>

                <p>{errors.confirmPassword?.message}</p>

                <div className={styles.rulesContainer}>
                    <input type="checkbox" aria-hidden={false} name="" id="checkRules" required />

                    <label htmlFor="checkRules" iner="true" style={{ marginLeft: '10px' }} className={styles.agreeRules}>Я погоджуюсь з умовами та правилами</label>
                </div>
                <input className={styles.registerBtn} type="submit" value='зареєструватися' />
            </form>


        </div>
    )
}

export default LoginComp;