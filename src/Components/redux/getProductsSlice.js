import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],

};

export const fetchProducts = createAsyncThunk('getProducts', async () => {
    const response = await axios.get('http://localhost:5000/products');


    return response.data;
});

export const sliceProducts = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    }
});



export default sliceProducts.reducer;