import axios from 'axios';
import apiKeys from '../apiKeys';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

const getAll = () => new Promise((resolve, reject) => {
  axios.get(`${bandAidApiBaseUrl}/bands`)
    .then((result) => {
      if (result != null) {
        const bands = result.data;
        resolve(bands);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const getBand = bandId => new Promise((resolve, reject) => {
  axios.get(`${bandAidApiBaseUrl}/bands/${bandId}`)
    .then((result) => {
      if (result != null) {
        const band = result.data;
        resolve(band);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getBand,
  getAll,
};
