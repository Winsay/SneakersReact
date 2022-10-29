import Card from '../components/Card';
import React from 'react';

function Home({ items, searchValue, onAddToCart, onAddToFavorites, onChangeSearchInput, setSearchValue, isLoading }) {
    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => { onAddToFavorites(obj) }}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ));
    }
    return (
        <div className="main">
            <div className="main__header">
                <h1>{searchValue ? `Поиск по запросу : "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search__block">
                    <img src="img/search.svg" alt="Search" />
                    <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
                    {searchValue && <img onClick={() => setSearchValue('')} className='clear' src="img/btn-remove.svg" alt="clear" />}
                </div>
            </div>
            <div className="main__cards">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;