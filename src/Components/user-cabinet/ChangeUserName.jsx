import React, { useEffect, useState, useContext, useRef } from 'react'
import { NavLink, useLocation, Outlet, useParams } from "react-router-dom";
import styles from "../../styles/UserCabinet.module.css"
import { InputMask, useMask } from '@react-input/mask';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';
import img from "../../images/close-ellipse-svgrepo-com.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/getUserSlice';
import { updateUser } from '../redux/getUserSlice';


const ChangeUserName = () => {

    // const location = useLocation();
    const userAuth = useSelector((state) => state.getUser.user);
    const inputRef = useMask({
        mask: '380_________',
        showMask: false,
        replacement: { _: /\d/ },
    });

    // const handleMusk = () => {
    //     inputRef.showMask = true;
    // };

    const [userUpdAuth, setUserUpdAuth] = useState({})

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (userUpdAuth) reset(userUpdAuth);
    }, [userUpdAuth]);

    useEffect(() => {
        if (!userAuth) return
        else {
            axios.get(`http://localhost:5000/users/${userAuth._id}`)
                .then(response => setUserUpdAuth(response.data))
                .catch(error => {
                    if (error.response) {
                        console.error('Status:', error.response.status);
                        console.error('Data:', error.response.data);
                    } else {
                        console.error('Error:', error.message);
                    }
                });
        }
    }, [userAuth])

    const [userAdres, setUserAdres] = useState(['']);
    const { register, reset, watch,
        handleSubmit, formState: { errors } } = useForm(
            {
                defaultValues: {
                    firstName: userUpdAuth.firstName || '',
                    secondName: userUpdAuth.secondName || '',
                    email: userUpdAuth.email || '',
                    phone: userUpdAuth.phone || ''
                },
            }
        );

    const adresInputRef = useRef(null);

    const handleAddAdrs = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (userAdres.length >= 4) return;
        if (adresInputRef.current.value != '') {
            setUserAdres([...userAdres, ''])
        }
    };

    const [showCabinetPop, setShowcabinetPop] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data) {
            delete data.birthdayUser;
            delete data._id;
            console.log(data);

            const result = await dispatch(updateUser(data))
            // console.log(result);

            setShowcabinetPop(true);


        }

    }

    return (
        <div className={styles.changeNameBlock}>

            <div className={styles.userDataContainer}>
                <h1>Особисті дані</h1>
                <form className={styles.blockForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.nameUserContainer}>

                        <input type="text" className={styles.inputNameParams} placeholder="Ваше ім'я"
                            {...register('firstName', {
                                pattern: {
                                    value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]{2,20}$/,
                                    message: 'Введіть ім*я коректно'
                                }, required: 'поле обов*язкове',
                            })}
                        />
                        <p>{errors.firstName?.message}</p>
                        <p>{errors.secondName?.message}</p>
                        <input type="text" className={styles.inputNameParams} placeholder="Ваше прізвище"

                            {...register('secondName', {
                                pattern: {
                                    value: /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ'-]{2,20}$/,
                                    message: 'Введіть прізвище коректно'
                                }, required: 'поле обов*язкове'
                            })}

                        />
                    </div>
                    <input className={styles.inputParms}
                        {...register('phone', {
                            required: "Введіть номер телефону",
                            pattern: {
                                value: /^(380)([3456789]\d{8})$/,
                                message: 'Введіть коректний номер телефону 380XXXXXXXXX'
                            }
                        })}
                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                        required

                    // placeholder="phone 380XXXXXXXXX"
                    // ref={inputRef} onChange={() => handleMusk} required
                    />

                    <p>{errors.phone?.message}</p>

                    <input type="email"

                        className={styles.inputParms} placeholder='Email' id=""
                        {...register('email', {
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Введіть адресу коректно'
                            }, required: 'поле обов*язкове'
                        })
                        }
                    />
                    <p>{errors.email?.message}</p>
                    <span style={{ margin: '0 auto' }}>Ваше день народження?</span>
                    <input type="date" className={styles.birthdayInput}{...register('birthdayUser')} name="" id="" />
                    <h2 style={{ margin: '10px auto 0' }}>Адреси</h2>
                    <div className={styles.adressContainer}>
                        <ul className={styles.adressListBlock}>
                            {userAdres.map((adres, index) => (

                                <li key={index}  >
                                    <input ref={adresInputRef}
                                        //onChange={(e) => { handleChangeAdres(index, e.target.value) }}
                                        className={styles.inputAdres} type='text' placeholder='Введіть адресу' />
                                </li>
                            ))}



                        </ul>
                        <div className={styles.saveButtonsGroup}>
                            <button onClick={(e) => handleAddAdrs(e)} disabled={userAdres.length >= 4} className={styles.buttonsParamsStyle}>Додати адресу</button>
                            <input type='submit' value='Зберегти зміни' className={styles.buttonsParamsStyle} />
                        </div>
                    </div>
                </form>
            </div>
            {showCabinetPop ? <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={true}
            >
                <div className={styles.cabinetPopUp}>
                    <img src={img} onClick={() => { setShowcabinetPop(false) }} className={styles.closeImg} alt="close" />
                    <span className={styles.popUpText}>Дані збережено!</span>
                </div>
            </Backdrop> : null}



        </div>


    )
}

export default ChangeUserName;