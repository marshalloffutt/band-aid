import axios from 'axios';
import apiKeys from '../apiKeys';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

const createBandMember = bandMember => axios.post(`${bandAidApiBaseUrl}/bandmembers/register`, bandMember);

export default {
  createBandMember,
};
