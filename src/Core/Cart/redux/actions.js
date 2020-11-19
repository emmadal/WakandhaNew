import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  ADD_PRICE,
  SUBTRACT_PRICE,
  CHANGE_COLOR,
  CHANGE_SIZE,
} from './types';

export const addCartItem = (item, price) => ({
  type: ADD_CART_ITEM,
  item: { ...item, quantity: 1, size: 'extraLarge', color: 'white' },
  price: typeof price == 'string' ? Number(price) : price,
});

export const addItemPrice = (item, price) => ({
  type: ADD_PRICE,
  item,
  price: typeof price == 'string' ? Number(price) : price,
});

export const subtractItemPrice = (item, price) => ({
  type: SUBTRACT_PRICE,
  item,
  price: typeof price == 'string' ? Number(price) : price,
});

export const addItemInCart = (item, price) => {
  return (dispatch) => {};
};

export const changeColor = (item, color) => ({
  type: CHANGE_COLOR,
  item,
  color,
});
export const changeSize = (item, size) => ({
  type: CHANGE_SIZE,
  item,
  size,
});

export const removeCartItem = (item) => ({
  type: REMOVE_CART_ITEM,
  item,
  price: getPrice(item),
});

const getPrice = (item) => {
  const { offerPrice } = item;
  let price = typeof offerPrice == 'string' ? Number(offerPrice) : offerPrice;

  return item.quantity * price;
};
