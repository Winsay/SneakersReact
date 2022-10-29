
import React from "react";
import Card from "../components/Card";
import Info from "../components/info";
import AppContext from "../context";



export default function Favorites() {

    const { favorites, onAddToFavorites, isLoading, onAddToCart } = React.useContext(AppContext);

    return (
        <div className="main">
            <div className="main__header">
                <h1>Мои Закладки</h1>
            </div>
            <div className="main__cards">
                {(isLoading ? [...Array(12)] : favorites).map((item, index) => {
                    return (
                        <Card
                            key={index}
                            loading={isLoading}
                            onFavorite={(obj) => { onAddToFavorites(obj) }}
                            onPlus={(obj) => onAddToCart(obj)}
                            {...item}
                        />
                    );
                })}


                {!favorites.length > 0 && !isLoading && (
                    <Info
                        title="Закладок нет"
                        description="Вы ничего не добавляли в закладки"
                        image="img/unSmile.png"
                        dimensions={70}
                    />
                )}
            </div>
        </div>
    )
}

