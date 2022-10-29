import { useCart } from '../Hooks/useCart';
import { Link } from 'react-router-dom'
import React from 'react';


function Header(props) {
    const { totalPrice, cartItems } = useCart();


    return (
        <header className="header">
            <Link to="/">
                <div className="headerLeft">
                    <img className="headerLeft__logo" height={40} width={40} src="img/logo.png" alt="logo" />
                    <div className="headerInfo">
                        <h3 className="headerInfo__title">React sneakers</h3>
                        <p className="headerInfo__subtitle">Магазин лучших кросовок</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight">
                <li onClick={props.onClickCart}>
                    <img src={cartItems.length > 0 ? "img/basket-active.svg" : "img/basket.svg"} alt="" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to='/favorites'>
                        <img src={props.favorites.length > 0 ? "img/like-active.svg" : "img/like.svg"} alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img src="img/profile.svg" alt="" />
                    </Link>
                </li>
            </ul>
        </header >
    );
}

export default Header