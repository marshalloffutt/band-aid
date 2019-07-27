import axios from 'axios';
import apiKeys from '../apiKeys';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

const createPosting = posting => axios.post(`${bandAidApiBaseUrl}/postings/register`, posting);

const getAll = () => new Promise((resolve, reject) => {
  axios.get(`${bandAidApiBaseUrl}/postings/open`)
    .then((result) => {
      if (result != null) {
        const postings = result.data;
        resolve(postings);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getAll, createPosting };
