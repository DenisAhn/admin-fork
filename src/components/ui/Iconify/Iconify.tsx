import { Icon, IconifyIcon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';
import * as React from 'react';

interface Props extends BoxProps {
  icon: IconifyIcon | string;
}

const Iconify = React.forwardRef<SVGElement, Props>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

export default React.memo(Iconify);
