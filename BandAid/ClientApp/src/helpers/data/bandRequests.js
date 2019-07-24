import axios from 'axios';
import apiKeys from '../apiKeys';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

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

export default { getBand };
