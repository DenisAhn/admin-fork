import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Navigate } from 'react-router-dom';

import { LoadingStub } from 'components/shared/LoadingStub';
import { APP_ROUTES } from 'config/routes';
import { userStore } from 'stores/global/UserStore';

/* HOC для страниц, для которых нужна авторизация */
export const withAuth = (Component: React.ComponentType) =>
  observer(() => {
    const { user, userCurrentRequest, getCurrent } = userStore;

    React.useEffect(() => {
      if (!user && !userCurrentRequest.meta.isLoaded) {
        getCurrent();
      }
    }, [user, getCurrent, userCurrentRequest]);

    if (userCurrentRequest.meta.isLoading) {
      return <LoadingStub pageSized />;
    }

    if (!user) {
      return <Navigate to={APP_ROUTES.auth.login.createRoute()} />;
    }

    return <Component />;
  });
