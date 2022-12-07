import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        id: number;
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://636a5378c07d8f936d9a58b6.mockapi.io/items/${id}`,
                );
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении данных!');
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>'Загрузка...'</>;
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} />
            <h2>{pizza.id}</h2>
            <p>{pizza.title}</p>
            <h4>{pizza.price} грн</h4>
        </div>
    );
};

export default FullPizza;
