import axios from 'axios';
import apiKeys from '../apiKeys';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

const createPostingReply = reply => axios.post(`${bandAidApiBaseUrl}/postingreplies/register`, reply);

const getRepliesOnPosting = postingId => new Promise((resolve, reject) => {
  axios.get(`${bandAidApiBaseUrl}/postingreplies/postings/${postingId}`)
    .then((result) => {
      if (result != null) {
        const replies = result.data;
        resolve(replies);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  createPostingReply,
  getRepliesOnPosting,
};
