import AsyncStorage from '@react-native-community/async-storage';

export const storeCartItems = async (items) => {
  try {
    await AsyncStorage.setItem('@cart', JSON.stringify(items));
    return;
  } catch (e) {
    // saving error
  }
};

export const storeItemsPrice = async (price) => {
  try {
    await AsyncStorage.setItem('@price', JSON.stringify(price));
    return;
  } catch (e) {
    // saving error
  }
};
export const getItemsPrice = async () => {
  try {
    let result = await AsyncStorage.getItem('@price');
    let price = JSON.parse(result);
    return price;
  } catch (e) {
    // saving error
  }
};

export const getCartItems = async () => {
  try {
    let result = await AsyncStorage.getItem('@cart');
    let items = JSON.parse(result);
    return items;
  } catch (e) {
    // saving error
  }
};

export const deleteCartItem = async (item) => {
  try {
    let result = await AsyncStorage.getItem('@cart');
    let items = JSON.parse(result);

    let updatedData = items.filter((object) => object.offerID !== item.offerID);
    storeCartItems(updatedData);
    return updatedData;
  } catch (e) {
    // saving error
  }
};

export const clearLocalStorage = async () => {
  AsyncStorage.clear();
};
