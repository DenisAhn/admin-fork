import { Box, BoxProps } from '@mui/material';
import * as React from 'react';
import { forwardRef } from 'react';

type Props = {
  src: string;
} & BoxProps;

const SvgColor = forwardRef<HTMLSpanElement, Props>(
  ({ src, sx, ...other }, ref) => (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  )
);

export default SvgColor;
