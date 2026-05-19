import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



//const itemsStorage = localStorage.getItem('basket') != null ? JSON.parse(localStorage.getItem('basket')) : [];


const initialBasket = {
    basketItems: (() => {
        try {
            const basket = localStorage.getItem('basket');
            return basket ? JSON.parse(basket) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    })()

};


export const basketSlice = createSlice({
    name: 'basketSlice',
    initialState: initialBasket,
    reducers: {
        addToBasket: (state, action) => {


            const dubState = state.basketItems.filter(
                (item) => item.id === action.payload.id
            )
            if (dubState.length < 1) {
                state.basketItems = [...state.basketItems, action.payload];
                localStorage.setItem('basket', JSON.stringify(state.basketItems))
            }



        },
        removeFromBasket: (state, action) => {
            state.basketItems = state.basketItems.filter(
                (item) => item.id != action.payload.id
            )
            //  console.log(state.basketItems);

            localStorage.setItem('basket', JSON.stringify(state.basketItems));
        },
        decrementBasket: (state, action) => {

            const item =
                state.basketItems.find(
                    item => item.id === action.payload.id
                );

            if (!item) return;

            item.totalCount--;

            if (item.totalCount <= 0) {

                state.basketItems =
                    state.basketItems.filter(
                        item => item.id !== action.payload.id
                    );
            }

            localStorage.setItem(
                'basket',
                JSON.stringify(state.basketItems)
            );

        },
        increaseBasket: (state, action) => {

            const item = state.basketItems.find(
                item => item.id === action.payload.id
            );

            if (!item) return;

            item.totalCount++;

            localStorage.setItem(
                'basket',
                JSON.stringify(state.basketItems)
            );

        },

    },

});

export const { addToBasket, removeFromBasket, decrementBasket, increaseBasket } = basketSlice.actions;

export default basketSlice.reducer;