import React, { useEffect, useState } from 'react'
import styles from "../../styles/Basket.module.css";

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import basketImg from "./../../images/reshot-icon-trash-2ZNJ9PUBQL.svg"
import { removeFromBasket } from '../redux/basketSlice.js';
import { addToBasket } from '../redux/basketSlice.js';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../redux/getProductsSlice';



export default function Basket() {



  const [totalSum, setTotalSum] = useState(0);
  const [basketItemCount, setBasketItemCount] = useState([]);
  const dispatch = useDispatch();

  const mapbox = useSelector(state => {
    return {
      productsData: state.products?.products || [],
      basket: state.basketItems.basketItems || []
    }
  });
  const basket = mapbox.basket
  //console.log(basket);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const productsDrinks = mapbox.productsData.slice(24, 28);


  useEffect(() => {
    if (basket.length >= 0) {

      setBasketItemCount(basket);
    } else if (basket.length === 0) {
      setTotalSum(0)
    }

  }, [basket]);

  useEffect(() => {
    const totalSumRes = basketItemCount.reduce((accumulator, item) => accumulator + item.price * item.totalCount, 0);
    setTotalSum(totalSumRes);
    if (basketItemCount.length == 0) {
      setTotalSum(0)
    };
  }, [basketItemCount])

  const handleIncrese = (e, item_id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setBasketItemCount(
      basketItemCount.map(item => {
        if (item_id === item.id) {
          return { ...item, totalCount: item.totalCount + 1 }
        }
        else {
          return item
        }
      })
    )
  }

  const handleDecrese = (e, item_id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setBasketItemCount(
      basketItemCount.map(item => {
        if (item_id === item.id) {
          return { ...item, totalCount: item.totalCount - (item.totalCount > 1 ? 1 : 0) }
        }
        else {
          return item
        }
      })

    )
  }



  const handleDelete = (e, item) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(removeFromBasket(item));
    // console.log();

  };

  const handleAddBasket = (e, item) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(addToBasket(item))
  };

  const responsive = {
    superLargeDesktop: {

      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,

    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,

    }
  }

  return (
    <div className={styles.basketContainer}>
      <div
        style={basketItemCount.length > 0 ? { border: '2px solid #b5d8f7' } : null}
        className={styles.itemsCount} >

        {basketItemCount.length > 0 ? (

          basketItemCount.map((item, index) => (
            <li className={styles.orderItem} key={index}>
              <img className={styles.orderImg} src={item.imgSrc} alt="" />
              <span className={styles.orderName}> {item.name}</span>
              <img className={styles.trashPic} src={basketImg} onClick={(e) => handleDelete(e, item)} alt="" />
              <div className={styles.changeContainer}>
                <div className={styles.orderCount}>
                  <button className={styles.btnOrder}
                    onClick={(e) => handleDecrese(e, item.id)}
                  >-</button>
                  <span className={styles.count}>{item.totalCount}</span>
                  <button className={styles.btnOrder}
                    onClick={(e) => handleIncrese(e, item.id)}
                  >+</button>
                </div>
                <span className={styles.itemsPrice}>{item.price}грн.</span>
              </div>
            </li>
          ))
        ) : (<div>
          <img className={styles.emptyBasketPic} src="https://monosushi.com.ua/wp-content/themes/monosushi/img/icons/cart-empty-img.svg" alt="" />
          <h3 className={styles.emptyBasketText}>Кошик порожній</h3>
          <NavLink to='/' className={styles.emptyBasketBtn} >Перейти до каталогу</NavLink>

        </div>
        )}
      </div>

      <h3 className={styles.textTryAlways}>Спробуйте також</h3>

      <Carousel className={styles.karousel} swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={1000}
        containerClass={styles.carouselContainer}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
        dotListClass={styles.custom}
        itemClass={styles.carouselPadding}
      >
        {productsDrinks?.map((item) => {
          return (
            <NavLink to={`/product/${item.id}`} key={item.id} className={styles.carouselDrinks}>
              <img src={item.imgSrc} className={styles.drinkImg} alt="" />
              <h2 className={styles.drinkName}>{item.name}</h2>
              {item.option ? <div className={styles.itemOption}>{item.option}</div> : null}
              <div className={styles.aboutProduct}>
                <span className={styles.weightProduct}> Вага:{item.weight}</span>
              </div>
              <div className={styles.footItem}>
                <span className={styles.prodPrice}>{item.price} грн.</span>
                <button onClick={(e) => handleAddBasket(e, item)}
                  className={styles.btnBuyMini}>ЗАМОВИТИ</button>

              </div>
            </NavLink>
          );
        })
        }
      </Carousel>
      <div className={styles.bottomBasketContainer} style={basketItemCount.length == 0 ? { display: 'none' } : { display: 'flex' }}>
        <span className={styles.total}><b>{totalSum}</b> грн.</span>
        <Link className={styles.makeOrderBtn} state={basketItemCount} to='create-order' >Оформити замовлення</Link>
      </div>


    </div >
  )
}
