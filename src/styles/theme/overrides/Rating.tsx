import { alpha, Theme } from '@mui/material/styles';
import * as React from 'react';

import { StarIcon } from './CustomIcons';

export default function Rating(theme: Theme) {
  return {
    MuiRating: {
      defaultProps: {
        emptyIcon: <StarIcon />,
        icon: <StarIcon />,
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.48,
          },
        },
        iconEmpty: {
          color: alpha(theme.palette.grey[500], 0.48),
        },
        sizeSmall: {
          '& svg': {
            width: 20,
            height: 20,
          },
        },
        sizeLarge: {
          '& svg': {
            width: 28,
            height: 28,
          },
        },
      },
    },
  };
}
