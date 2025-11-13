
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
axios.defaults.withCredentials = true;


const initialState = {
    user: null

};


export const fetchUser = createAsyncThunk('getUser', async () => {
    const response = await axios.get('http://localhost:5000/auth/check');
    return response.data;
});


export const updateUser = createAsyncThunk('authUpdUser', async (update) => {
    const { data } = await axios.patch("http://localhost:5000/auth/check", update, { withCredentials: true });


    return data;
})

export const sliceUser = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    }
});

export const { logout } = sliceUser.actions;

export default sliceUser.reducer;
