import { Box } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Main } from './Main';
import { Nav } from './Nav';

const AppLayout: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
      }}
    >
      <Nav />
      <Main>
        {/* <Header />*/}
        <Outlet />
      </Main>
    </Box>
  );
};

export default AppLayout;
