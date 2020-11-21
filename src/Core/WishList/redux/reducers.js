import { SET_WISH_LIST, SET_WISH_LIST_ITEM } from './types';

const initialState = {
  wishList: [],
};

export const userWishLists = (state = initialState, { type, data, item }) => {
  switch (type) {
    case SET_WISH_LIST:
      return { ...state, wishList: data };
    case SET_WISH_LIST_ITEM:
      let data = [...state.wishList, item];
      return { ...state, wishList: updatedData(data) };
    default:
      return state;
  }
};

const updatedData = (array) => {
  let unique = [...new Set(array)];
  return unique;
};
