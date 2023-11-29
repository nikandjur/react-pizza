import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryes: 0,
    currentPage: 1,
    sort: {
        name: "популярности",
        typeSort: "raiting"
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryes(state, action) {
            state.categoryes = action.payload;
        },
        setSelectedSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryes = Number(action.payload.categoryes);
        }
        //    " action"
        //     categoryes:  "0"
        //     currentPage: "3"
        //     sort: 
        //         {name: 'популярности', 
        //         typeSort: 'raiting'}
        //     typeSort : raiting"

    },
});


export const { setCategoryes, setSelectedSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
