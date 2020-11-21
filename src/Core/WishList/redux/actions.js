import { SET_WISH_LIST, SET_WISH_LIST_ITEM } from './types';

export const setWishList = (data) => ({
  type: SET_WISH_LIST,
  data,
});

export const addWishListItem = (item) => ({
  type: SET_WISH_LIST_ITEM,
  item,
});
