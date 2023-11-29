import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            // state.items = [...state.items, action.payload]

            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            } else {
                state.items.unshift(action.payload);
            }
            // state.totalPrice += (action.payload.price * saction.payload.price)
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.count * item.price) + sum
            }, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem && findItem.count > 0) {
                findItem.count--;
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.count * item.price) + sum
            }, 0)
        },

        removeItem(state, action) {
            if (window.confirm('вы точно хотите удалить?')) {
                state.items = state.items.filter(obj => obj.id !== action.payload)
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.count * item.price) + sum
            }, 0)
        },
        clearItems(state) {
            if (window.confirm('вы точно хотите удалить?')) {
                state.items = [];
                state.totalPrice = 0;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
