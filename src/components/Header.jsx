import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Search from "./Search";

const Header = () => {
    const { items, totalPrice } = useSelector((state) => state.cart);
    const totalCount = items.reduce((sum, item) => item.count + sum, 0);
    return (
        <div className="header">
            <div className="container">
                <Link to="/">
                    <div className="header__logo">
                        <img
                            width="38"
                            src="/assets/img/pizza-logo.svg"
                            alt="Pizza logo"
                        />
                        <div>
                            <h1>React Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                <Search />
                <div className="header__cart">
                    <Link to="/cart" className="button button--cart">
                        <span>{totalPrice} ₽</span>
                        <div className="button__delimiter"></div>

                        <span>{totalCount}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Header;
