import axios from 'axios';
import apiKeys from '../apiKeys';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

const getShindigsUserById = userId => new Promise((resolve, reject) => {
  axios.get(`${bandAidApiBaseUrl}/shindigs/users/${userId}`)
    .then((result) => {
      if (result != null) {
        const userShindigs = result.data;
        resolve(userShindigs);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getShindigsUserById,
};
