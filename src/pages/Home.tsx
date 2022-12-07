import { useEffect, useRef, useCallback } from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import { list } from '../components/Sort';

import { PizzaBlock, Skeleton, Pagination, Sort, Categories } from '../components';

import { selectPizzaData } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { items, status } = useSelector(selectPizzaData);
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);

    function onChangePage(page: number) {
        dispatch(setCurrentPage(page));
    }

    async function getPizzas() {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // axios
        //     .get(
        //         `https://636a5378c07d8f936d9a58b6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        //     )
        //     .then((res) => {
        //         setItems(res.data);
        //         setIsLoading(false);
        //     });
        dispatch(
            // @ts-ignore
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );
    }

    //Если изменили параметры и был произведён первый рендер. Данный код вшивает в адресную строку строку запроса данные, которые находятся в стейте редакса. Эти данные получаются из преобразования объекта в строку с помощью библиотеки qs. За непосредственное вшитие строки запроса в адресную строку отвечает хук useNavigate из библиотеки React Router.
    //При самом первом рендере в этом useEffect выполнится только isMounted.current = true. Вшитие данных в URL не будет!
    // useEffect(() => {
    //     if (isMounted.current) {
    //         const query = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage,
    //         });
    //         navigate(`?${query}`);
    //     }
    //     isMounted.current = true;
    // }, [categoryId, sort.sortProperty, currentPage]);

    //Если был первый рендер, то проверяем URL-параметры и сохраняем в редакс
    //Из адресной строки вытягивается строка запроса с помощью window.location.search и с помощью библиотеки qs преобразуется в объект. Далее идёт сравнение sortProperty из params с sortProperty из списка и данные передаются в редакс
    //При самом первом рендере window.location.search = '', т.е. false. Следовательно выполнится только isSearch.current = true.
    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(
    //             window.location.search.slice(1),
    //         ) as unknown as SearchPizzaParams;

    //         const sort = list.find((obj) => obj.sortProperty === params.sortBy);

    //         dispatch(
    //             setFilters({
    //                 searchValue: params.search,
    //                 categoryId: Number(params.category),
    //                 currentPage: Number(params.currentPage),
    //                 sort: sort || list[0],
    //             }),
    //         );

    //         isSearch.current = true;
    //     }
    // }, []);

    //Если isSearch.current = true, т.е. из URL пришли параметры, тогда нас удовлетворяет проверка !isSearch.current и в таком случае не будет повторного запроса на сервер (функция  getPizzas()) при первом рендере.
    //Если был первый рендер, то запрашиваем пиццы.
    useEffect(() => {
        window.scrollTo(0, 0);

        getPizzas();

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort} />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>Произошла ошибка!</h2>
                    <p>Не удалось получить пиццы. Повторите попытку позже.</p>
                </div>
            ) : (
                <div className='content__items'>
                    {status === 'loading'
                        ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
                        : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
                </div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage}></Pagination>
        </div>
    );
};

export default Home;
