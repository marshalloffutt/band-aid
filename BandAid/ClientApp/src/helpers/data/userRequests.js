import axios from 'axios';
import apiKeys from '../apiKeys';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

const createUser = user => axios.post(`${bandAidApiBaseUrl}/users/register`, user);

export default { createUser };
