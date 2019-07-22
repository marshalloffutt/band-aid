import axios from 'axios';
import apiKeys from '../apiKeys';

import authRequests from './authRequests';

const bandAidApiBaseUrl = apiKeys.bandAidApi.apiBaseUrl;

const createUser = user => axios.post(`${bandAidApiBaseUrl}/users/register`, user);

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${bandAidApiBaseUrl}/users`)
    .then((result) => {
      if (result != null) {
        const allUsers = result.data;
        resolve(allUsers);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserById = userId => new Promise((resolve, reject) => {
  axios.get(`${bandAidApiBaseUrl}/users/${userId}`)
    .then((result) => {
      if (result != null) {
        const user = result.data;
        resolve(user);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const getUser = () => new Promise((resolve, reject) => {
  const userEmail = authRequests.getUserEmail();
  getAllUsers()
    .then((users) => {
      const currentUser = users.find(user => user.email === userEmail);
      resolve(currentUser);
    }).catch((error) => {
      reject(error);
    });
});

const getUserIdByEmail = () => new Promise((resolve, reject) => {
  const userEmail = authRequests.getUserEmail();
  getAllUsers()
    .then((users) => {
      const currentUser = users.find(user => user.email === userEmail);
      const userId = currentUser.id;
      resolve(userId);
    }).catch((error) => {
      reject(error);
    });
});

export default {
  createUser,
  getUserById,
  getUserIdByEmail,
  getAllUsers,
  getUser,
};
