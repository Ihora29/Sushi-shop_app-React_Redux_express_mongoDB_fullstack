import { configureStore } from '@reduxjs/toolkit';
import sliceProducts from './getProductsSlice';
import basketSlice from './basketSlice';
import getUserSlice from './getUserSlice'
export const store = configureStore({
    reducer: {
        products: sliceProducts,
        basketItems: basketSlice,
        getUser: getUserSlice
    },
});