import axios from 'axios';
import apiKeys from '../apiKeys';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

const createPostingReply = reply => axios.post(`${bandAidApiBaseUrl}/postingreplies/register`, reply);

export default {
  createPostingReply,
};
