import React from "react";
import axios from "axios";
import Card from "../components/Card";
import Info from "../components/info";

function Orders() {
    const [orders, setOreders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://634568f4dcae733e8ff1a755.mockapi.io/orders');
                setOreders(data.map(obj => obj.items).flat(Infinity));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов')
                console.error(error);
            }
        })()
    }, [])
    return (
        <div className="main">
            <div className="main__header">
                <h1>Мои Заказы</h1>

            </div>
            <div className="main__cards">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}

                {!orders.length > 0 && !isLoading && (
                    <Info
                        title="У вас нет заказов"
                        description={'Вы нищеброд? \n Оформите хотя бы один заказ.'}
                        image="img/soSad.png"
                        dimensions={70}
                    />
                )}
            </div>
        </div>
    )
}

export default Orders;