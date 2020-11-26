import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';

import {
  devBackendUrl as devUrl,
  prodBackendUrl as prodUrl
} from '../../../app.json';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('@secure_token', !token || token == "" ? null : token)
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

export default function (method, path, args = {}) {
  return new Promise(async function (resolve, _reject) {

    const token = await getToken()

    axios({
      method,
      url: prodUrl + path,
      ...(args || {}),
      params: {
        ...(args ? args.params || {} : {}),
        secret_token: token
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