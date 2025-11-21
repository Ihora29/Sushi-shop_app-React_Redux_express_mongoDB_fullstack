import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Link } from "react-router-dom";
import styles from "../../styles/UserCabinet.module.css"
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import img from "../../images/close-ellipse-svgrepo-com.svg"
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/getUserSlice';
import { fetchUser } from '../redux/getUserSlice';


const ChangeUserPass = () => {

    const navigate = useNavigate();

    const userAuth = useSelector((state) => state.getUser.user);
    //  console.log(userAuth);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);



    const { register, reset, watch,
        handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });


    const [passIdentError, setPassIdentError] = useState(false);
    const [showCabinetPop, setShowcabinetPop] = useState(false);
    // const [messagePassError, setMessagePassError]=useState('')
    const password = watch("password");

    const onSubmit = async (data) => {
        //  setShowcabinetPop(true);
        if (data.password === data.confirmPassword && data.oldPassword != '') {
            delete data['confirmPassword'];
            try {
                const result = await axios.patch('http://localhost:5000/change-password', data, { withCredentials: true })
                console.log(result);

                setShowcabinetPop(true);
            } catch (error) {
                // setPassIdentError(!passIdentError)
                // setMessagePassError(error.response.data.message)
                console.log(error.response.data.message);
                const errMsg = error.response.data.message
                return errMsg
            }
        }


    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.passContainer}>
                <h1 style={{ textAlign: 'center' }}>Зміна паролю </h1>
                <form className={styles.ChangePassForm} onSubmit={handleSubmit(onSubmit)}>
                    <input type="password" className={styles.inputNameParams}
                        {...register('oldPassword', {
                            minLength: { value: 6, message: 'Введіть пароль не менше 6 символів' },
                            pattern: {
                                value: /^[A-Za-z\d]{6,}$/,
                            },
                            required: 'поле обов*язкове'
                        })
                        }
                        placeholder='Ваш старий пароль' />
                    <p >{errors.oldPassword?.message}</p>
                    <input type="password"
                        {...register('password', {
                            minLength: { value: 6, message: 'Введіть пароль не менше 6 символів' },
                            pattern: {
                                value: /^[A-Za-z\d]{6,}$/,
                            },
                            required: 'поле обов*язкове'
                        })
                        }
                        className={styles.inputNameParams} placeholder='Новий пароль*' />

                    <input type="password" className={styles.inputNameParams}
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
                        // onChange={handleChange}
                        placeholder='Повторіть пароль*' />

                    <p >{errors.password?.message}</p>
                    <p >{errors.confirmPassword?.message}</p>
                    {/* {passIdentError ? <p>Паролі не співпадають</p> : null} */}
                    <div className={styles.saveButtonsGroup}>
                        <button className={styles.buttonsParamsStyle}>Скасувати</button>
                        <input type="submit" value='Зберегти зміни' className={styles.buttonsParamsStyle} />
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

export default ChangeUserPass;