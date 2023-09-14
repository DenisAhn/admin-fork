export const APP_ROUTES = {
  root: '/',
  auth: {
    mask: '/auth/*',
    register: {
      createRoute: () => '/auth/register',
      mask: '/register',
    },
    login: {
      createRoute: () => '/auth/login',
      mask: '/login',
    },
  },
  app: {
    mask: '/app/*',
    createRoute: () => '/app/',
    orders: {
      createRoute: () => '/app/orders',
      mask: '/orders',
    },
  },
};
