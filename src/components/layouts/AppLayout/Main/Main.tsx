import { Box, BoxProps } from '@mui/material';
import * as React from 'react';

import { NAV } from 'styles/constants';

const Main: React.FC<BoxProps> = ({ children, sx, ...props }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        ...{
          px: 2,
          py: 2 /* `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px` */,
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Main;
