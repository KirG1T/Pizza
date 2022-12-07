import { CartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.count * item.price, 0);
};
