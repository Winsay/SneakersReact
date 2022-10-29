import React from 'react'
import axios from 'axios';

import Info from '../info';
import { useCart } from '../../Hooks/useCart';

import style from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post("https://634568f4dcae733e8ff1a755.mockapi.io/orders", { items: cartItems });
            setOrderId(data.id)
            setsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete("https://634568f4dcae733e8ff1a755.mockapi.io/cart/" + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Не удалось отправить заказ')
        }
        setIsLoading(false)
    }
    return (
        <div onClick={onClose} className={`${style.drawer__overlay} ${opened ? style.overlay__visible : ''}`}>
            <div onClick={(e) => {
                e.stopPropagation();
            }} className={style.drawer}>
                <h2>Корзина <img onClick={onClose} src="img/btn-remove.svg" alt="remove" /></h2>


                {
                    items.length > 0 ?
                        <>
                            <div className="items">
                                {items.map((obj, index) => (
                                    <div key={index} className="cart__item">
                                        <img width={70} height={70} src={obj.imageUrl} alt="" />
                                        <div className="cart__item-descr">
                                            <p>{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.parentId, obj.id)} src="img/btn-remove.svg" alt="Remove" />
                                    </div>
                                ))}
                            </div>
                            <div className="card__total">
                                <ul className="cart__total-block">
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
                                    </li>
                                </ul>
                                <div onClick={onClickOrder} className={isLoading ? "checkout__btn grey__btn" : "checkout__btn"}>
                                    <b>Оформить заказ</b>
                                    <img src="img/arrow-right.svg" alt="arrow" />
                                </div>
                            </div>
                        </>
                        : <Info
                            cvet={isOrderComplete ? "#87C20A" : "#000"}
                            height={120}
                            width={isOrderComplete ? 83 : 120}
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                            image={isOrderComplete ? "img/complete-order.jpg" : "img/cartBox.png"} />
                }
            </div>
        </div>
    );
}

export default Drawer;