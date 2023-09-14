const getUserPrefix = (path: string) => `users/${path}`;

const getOrdersPrefix = (path: string) => `orders/${path}`;

const getAuthPrefix = (path: string) => `auth/${path}`;

export const ENDPOINTS = {
  user: {
    current: {
      url: getUserPrefix('current'),
      method: 'GET',
    },
    registration: {
      url: getUserPrefix('registration'),
      method: 'POST',
    },
    confirmation: {
      url: getUserPrefix('confirmation'),
    },
  },
  auth: {
    login: {
      url: getAuthPrefix('login'),
      method: 'POST',
    },
  },
  orders: {
    list: {
      url: getOrdersPrefix(''),
    },
  },
};
