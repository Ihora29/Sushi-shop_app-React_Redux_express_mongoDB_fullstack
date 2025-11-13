
import React, { hasOwnProperty, useState } from 'react';
import styles from "../../styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, loadCartFromStorage } from "../redux/getProductsSlice";
import { NavLink } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { addToBasket } from '../redux/basketSlice';
import axios from 'axios';


export const SaleItems = () => {

  const isUserAuth = JSON.parse(localStorage.getItem('isUserAuth'));

  const [countProduts, setCountProducts] = useState([]);

  const productsData = useSelector((state) => state.products.products);
  useEffect(() => {
    setCountProducts(productsData);
  }, [])


  const allProducts = productsData
    .filter((item) => item)
    .reduce((acc, curr) => acc.concat(curr), []);


  const itemsWithOption = allProducts.filter(item => item.hasOwnProperty('option'));

  const [saleItems, setSaleItems] = useState([]);

  const handleIncrese = (e, item_id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSaleItems(
      saleItems.map(item => {
        if (item_id === item.id) {
          return { ...item, totalCount: item.totalCount + 1 }
        }
        else {
          return item
        }
      })
    )
  };

  const handleDecrese = (e, item_id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSaleItems(
      saleItems.map(item => {
        if (item_id === item.id) {
          return { ...item, totalCount: item.totalCount - (item.totalCount > 1 ? 1 : 0) }
        }
        else {
          return item
        }
      })
    )
  }


  const handleAddBasket = (e, item) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(addToBasket(item))
  };

  const { register, reset, watch,
    handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const newProduct = { ...data, "id": parseInt(allProducts.length + 1).toString(), "totalCount": 1 }
    console.log(newProduct);

    if (countProduts.length > 0) {

      console.log(countProduts);

      axios.post(`http://localhost:3001/products`, newProduct)

        .then(response => {
          console.log(response);

        })
    }

  }

  useEffect(() => {
    if (allProducts) {
      setSaleItems(itemsWithOption)
    }


  }, [productsData]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  return (
    <>
      <h1 className={styles.nameOfBestItems}>Акційні товари</h1>
      <div className={styles.card}>
        {productsData && productsData.length > 0 ? (
          saleItems.map((item) => {

            return (
              <NavLink to={`/product/${item.id}`} key={item.id} className={styles.productItem}>
                <img src={item.imgSrc} className={styles.itemIcon} alt="" />
                <h2 className={styles.nameProduct}>{item.name}</h2>
                <div className={styles.itemOption}>{item.option}</div>
                <div className={styles.aboutProduct}>
                  <p className={styles.itemProd}>{item.details}</p>
                  <span className={styles.weightProduct}> Вага: {item.weight}</span>
                </div>

                <div className={styles.footItem}>
                  <span className={styles.prodPrice}>
                    {item.price * item.totalCount} грн.
                  </span>
                  <div className={styles.orderCount}>
                    <button
                      className={styles.btnOrder}
                      onClick={(e) => handleDecrese(e, item.id)}
                    >
                      -
                    </button>
                    <span className={styles.count}>{item.totalCount}</span>
                    <button
                      className={styles.btnOrder}
                      onClick={(e) => handleIncrese(e, item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={(e) => handleAddBasket(e, item)}
                    className={styles.btnBuy}
                  >
                    ЗАМОВИТИ
                  </button>
                </div>
              </NavLink>
            );
          })
        ) : (
          <h1>No products available</h1>
        )}


      </div>
      {isUserAuth && isUserAuth.type === "admin-user" ? (<div className={styles.addingCont}>
        <form className={styles.formAdding} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.uploadArea}>
            <input type="text" required {...register('imgSrc')} style={{ marginLeft: '20px', width: '80%' }} placeholder='url item adress' />
          </div>

          <div className={styles.sectionAdding}>
            <span ><b>name of Item:</b></span> <input style={{ marginLeft: '15px', width: '80%' }} {...register('name')} type="text" required />
          </div>
          <br />
          <div className={styles.sectionAdding}>
            <span ><b>type of Item:</b></span>
            <select required name="" {...register('option')} style={{ marginLeft: '50px' }} id="">
              <option value="best">best</option>
              <option value="sale">sale</option>

            </select>
          </div>
          <br />
          <div className={styles.sectionAdding}>
            <span ><b>price of Item:</b></span> <input style={{ marginLeft: '50px', width: '20%' }}
              {...register('price', {
                pattern: {

                  value: /^\d+$/,
                  message: 'Введіть числа'

                }
              })}
              type="text" required />
            <p>{errors.price?.message}</p>
          </div>
          <br />
          <div className={styles.sectionofItem}>
            <span style={{ marginLeft: '30px' }} ><b>weight of Item:</b></span> <input style={{ marginLeft: '30px', width: '20%' }}
              {...register('weight', {
                pattern: {
                  value: /^\d+$/,
                  message: 'Введіть числа'
                }
              })}
              type="text" required />
            <p>{errors.weight?.message}</p>
          </div>

          <div className={styles.sectionDescr}>
            <span><b>descrition Item:</b></span> <input {...register('descrItem')} style={{ width: '80%', height: '60px', marginLeft: '30px' }} required type="text" />
          </div>

          <input className={styles.sendItemBtn} type="submit" value='add' />
        </form>
      </div>) : null
      }
    </>
  )
}
