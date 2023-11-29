import React from "react";
import { useNavigate } from "react-router-dom";

import qs from "qs";

import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import {
    setCategoryes,
    setCurrentPage,
    setFilters
} from "../redux/slices/filterSlice";

import { SearchContext } from "../App";
import Sort, { listSort } from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import Pagination from "../components/Search/Pagination";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { items, status } = useSelector((state) => state.pizza);
    const currentPage = useSelector((state) => state.filter.currentPage);
    const { categoryes, sort } = useSelector((state) => state.filter);
    const selectedSort = sort.typeSort;

    const { searhValue } = React.useContext(SearchContext);
    // const [isLoading, setIsLoading] = React.useState(true);

    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    };

    const changeCategory = (i) => {
        dispatch(setCategoryes(i));
    };

    const getPizzas = async () => {
        const category = categoryes > 0 ? `&category=${categoryes}` : "";
        const sortby = selectedSort;
        const searchText = searhValue && `&title=${searhValue}`;

        dispatch(
            fetchPizzas({
                category,
                sortby,
                searchText,
                currentPage
            })
        );

        window.scrollTo(0, 0);
    };
    //если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const querryString = qs.stringify({
                typeSort: selectedSort,
                categoryes,
                currentPage
            });
            navigate(`?${querryString}`);
        }
        isMounted.current = true;
    }, [categoryes, selectedSort, currentPage]);

    //если был первый рендер, то проверяем урл параметры и сохраняем в редукс
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = listSort.find(
                (obj) => obj.typeSort === params.typeSort
            );
            // console.log(sort);
            // console.log({ ...params });
            // console.log({ ...params, sort });

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, []);
    //если был первый рендер то запрашиваем пиццы
    React.useEffect(() => {
        getPizzas();

        isSearch.current = false;
    }, [categoryes, selectedSort, currentPage, searhValue]);
    const sceleton = [...new Array(6)].map((_, i) => <Sceleton key={i} />);
    const pizzas = items.map((item) => (
        <PizzaBlock key={item.title} {...item} />
    ));

    return (
        <>
            <div className="content__top">
                <Categories {...{ changeCategory, categoryes }} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === "error!" ? (
                <div className="content__error-info">
                    <h2>Ошибка сервера </h2>
                    <p>получения пицц из базы данных, попробуте позже</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading" ? sceleton : pizzas}
                </div>
            )}

            {/* {Array.from({ length: 6 } */}
            {/* [...Array(6)]  */}

            <Pagination onChangePage={onChangePage} currentPage={currentPage} />
        </>
    );
};

export default Home;
