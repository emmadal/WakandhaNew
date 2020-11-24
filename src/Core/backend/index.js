import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  devBackendUrl as devUrl,
  prodBackendUrl as prodUrl
} from '../../../app.json';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('@secure_token', token)
  } catch (e) {
    // saving error
  }
}

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@secure_token')
    if (value !== null) {
      return value
    }
    return null
  } catch (e) {
    return null
  }
}

export default function (method, path, args) {
  return new Promise(async function (resolve, _reject) {

    const secure_token = await getToken()

    axios({
      method,
      url: prodUrl + path,
      ...(args || {}),
      data: {
        ...(args ? args.data || {} : {}),
        secure_token: secure_token
      },
      json: true,
    }).then(response => {
      resolve(response.data);
    })
      .catch(error => {
        _reject(error);
      });
  })
}