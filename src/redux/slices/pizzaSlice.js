import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// First, create the thunk
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { category, sortby, searchText, currentPage } = params;
        const { data } = await axios.get(
            `https://2fd538d29f418c29.mokky.dev/items?page=${currentPage}&limit=4${category}&sortBy=${sortby}${searchText}`
        );
        console.log(data.items)
        return data.items;

    }
)

const initialState = {
    items: [],
    status: ''
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },

    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error!'
            state.items = [];
        },

    },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
