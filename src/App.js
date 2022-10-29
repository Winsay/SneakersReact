import AppContext from './context';
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import Orders from './pages/Orders';
import axios from 'axios';
import React from 'react';
import { Route, Routes } from 'react-router-dom';



function App() {
  const [items, setItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://634568f4dcae733e8ff1a755.mockapi.io/cart'),
          axios.get('https://634568f4dcae733e8ff1a755.mockapi.io/favorites'),
          axios.get('https://634568f4dcae733e8ff1a755.mockapi.io/items')
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных')
      }
    }
    fetchData();
  }, [])

  items.map((item, i) => {
    return (item.parentId = `${i + 1}`);
  });

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.parentId))
    try {
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.parentId)));
        await axios.delete(`https://634568f4dcae733e8ff1a755.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post('https://634568f4dcae733e8ff1a755.mockapi.io/cart', obj)
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            }
          }
          return item;
        }))
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onAddToFavorites = async (obj) => {
    const findItemFav = favorites.find(item => Number(item.parentId) === Number(obj.parentId))
    try {
      if (findItemFav) {
        setFavorites(prev => prev.filter(item => item.parentId !== obj.parentId));
        await axios.delete(`https://634568f4dcae733e8ff1a755.mockapi.io/favorites/${findItemFav.id}`);
      } else {
        setFavorites(prev => [...prev, obj])
        const { data } = await axios.post('https://634568f4dcae733e8ff1a755.mockapi.io/favorites', obj);
        setFavorites(prev => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            }
          }
          return item;
        }))
      }
    } catch (error) {
      alert('Не удалось добавить в избранное');
    }
  }

  const onRemoveItem = async (parentId, id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(parentId)));
      const { data } = await axios.delete(
        `https://634568f4dcae733e8ff1a755.mockapi.io/cart/${id}`
      );
      console.log(data);
      setCartItems((prev) =>
        prev.map((item) => {
          if (Number(item.parentId) === Number(data.parentId)) {
            return { ...item, id: data.id };
          }
          return item;
        })
      );
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
      console.log(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isFavoriteAdded = (parentId) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(parentId));
  }

  const isItemAdded = (parentId) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(parentId));
  }

  return (
    <AppContext.Provider value={{ cartItems, favorites, items, isItemAdded, isLoading, onAddToFavorites, onAddToCart, setCartOpened, setCartItems, isFavoriteAdded }}>
      <div className="wrapper">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} favorites={favorites} />

        <Routes>
          <Route path='/'
            element={<Home items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onAddToCart={onAddToCart}
              onAddToFavorites={onAddToFavorites}
              onChangeSearchInput={onChangeSearchInput}
              isLoading={isLoading} />} />
          <Route path='/favorites'
            element={<Favorites />} />
          <Route path='/orders'
            element={<Orders />}

          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;