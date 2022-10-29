import React from 'react'
import AppContext from '../context'
import { Link } from 'react-router-dom'

const Info = ({ image, title, description, height, width, cvet }) => {
    const { setCartOpened } = React.useContext(AppContext)
    return (
        <div className="cartEmpty">
            <img width={width} height={height} src={image} alt="Box" />
            <h2 style={{ color: cvet }}>{title}</h2>
            <p>{description}</p>
            <Link to='/'>
                <button onClick={() => setCartOpened(false)} className="greenButton">
                    <img src="img/arrow-right.svg" alt="Back" />Вернуться назад
                </button>
            </Link>
        </div>
    )
}

export default Info;