import axios from 'axios';
import apiKeys from '../apiKeys';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

const createShindig = shindig => axios.post(`${bandAidApiBaseUrl}/shindigs/register`, shindig);

const updateShindig = (shindig, id) => axios.put(`${bandAidApiBaseUrl}/shindigs/update/${id}`, shindig);

const deleteShindig = shindigId => axios.delete(`${bandAidApiBaseUrl}/shindigs/delete/${shindigId}`);

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
  createShindig,
  updateShindig,
  deleteShindig,
};
