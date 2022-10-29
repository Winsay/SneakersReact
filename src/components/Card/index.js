import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';
import React from 'react';

export default function Card({ id, imageUrl, parentId, price, title, onFavorite, onPlus, loading = false }) {
    const { isItemAdded, isFavoriteAdded } = React.useContext(AppContext);
    const obj = { id, parentId, title, price, imageUrl, }

    const onClickPlus = () => {
        onPlus(obj);
    }
    const onClickFavorite = () => {
        onFavorite(obj);
    }
    return (
        <div className={styles.main__card}>
            {
                loading ? (<ContentLoader
                    speed={2}
                    width={210}
                    height={260}
                    viewBox="0 0 210 260"
                    backgroundColor="#ededed"
                    foregroundColor="#ffffff"
                >
                    <rect x="0" y="6" rx="10" ry="10" width="150" height="89" />
                    <rect x="0" y="113" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="132" rx="3" ry="3" width="93" height="15" />
                    <rect x="0" y="169" rx="8" ry="8" width="80" height="24" />
                    <rect x="118" y="161" rx="8" ry="8" width="32" height="32" />
                </ContentLoader>)
                    : (
                        <>
                            {onFavorite && <img onClick={onClickFavorite} className={styles.heart__pass} src={isFavoriteAdded(parentId) ? "img/heart-act.svg" : "img/heart-pass.svg"} alt="heart" />}
                            <img src={imageUrl} alt="sniker" /><p>{title}</p>
                            <div>
                                <div>
                                    <span>Цена:</span>
                                    <b>{price} руб.</b>
                                </div>
                                {onPlus && <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(parentId) ? 'img/plus-checked.svg' : 'img/plus.svg'} alt="Plus" />}
                            </div>
                        </>
                    )}
        </div>
    )
}

