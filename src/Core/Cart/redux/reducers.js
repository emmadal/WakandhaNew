import {
  SUBTRACT_PRICE,
  ADD_CART_ITEM,
  ADD_PRICE,
  REMOVE_CART_ITEM,
  CHANGE_COLOR,
  CHANGE_SIZE,
} from './types';

const initialState = {
  items: [],
  price: 0,
};

export const cartItems = (
  state = initialState,
  { type, price, item, color, size },
) => {
  switch (type) {
    case ADD_CART_ITEM:
      let newUpdateData = updatedData([...state.items], item);
      let finalPrice =
        newUpdateData.length > state.items.length
          ? state.price + price
          : state.price;
      return {
        ...state,
        items: newUpdateData,
        price: finalPrice,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        items: dataAfterRemoving([...state.items], item),
        price: state.price - price,
      };
    case ADD_PRICE:
      return {
        ...state,
        items: increaseQuantity([...state.items], item),
        price: state.price + price,
      };
    case SUBTRACT_PRICE:
      return {
        ...state,
        items: decreaseQuantity([...state.items], item),
        price: state.price > 0 ? state.price - price : state.price,
      };
    case CHANGE_SIZE:
      return {
        ...state,
        items: changeItemSize([...state.items], item, size),
      };
    case CHANGE_COLOR:
      return {
        ...state,
        items: changeItemColor([...state.items], item, color),
      };
    default:
      return state;
  }
};

const updatedData = (array, item) => {
  const result = array.find((data) => {
    return data.offerID == item.offerID;
  });

  if (result) {
    return array;
  } else {
    let unique = [...new Set([...array, item])];
    return unique;
  }
};

const increaseQuantity = (array, item) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].offerID == item.offerID) {
      array[i].quantity = array[i].quantity + 1;
      break; //Stop this loop, we found it!
    }
  }

  return array;
};

const decreaseQuantity = (array, item) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].offerID == item.offerID) {
      if (array[i].quantity > 0) {
        array[i].quantity = array[i].quantity - 1;
        break; //Stop this loop, we found it!
      }
    }
  }

  return array;
};
const changeItemColor = (array, item, color) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].offerID == item.offerID) {
      array[i].color = color;
      break; //Stop this loop, we found it!
    }
  }

  return array;
};

const changeItemSize = (array, item, size) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].offerID == item.offerID) {
      array[i].size = size;
      break; //Stop this loop, we found it!
    }
  }

  return array;
};

const dataAfterRemoving = (array, item) => {
  let updatedData = array.filter((object) => object.offerID !== item.offerID);
  return updatedData;
};
