import { createSlice } from "@reduxjs/toolkit";
import React from 'react'

const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
        user: {},
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            console.log("AuthSlice login method with values:", state.user);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {};
        },
    },
})

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
