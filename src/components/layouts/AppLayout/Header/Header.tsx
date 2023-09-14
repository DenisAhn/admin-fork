import { AppBar, Stack, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';

import { useOffSetTop } from 'hooks/useOffSetTop';
import { HEADER, NAV } from 'styles/constants';
import { bgBlur } from 'styles/cssStyles';

function Header() {
  const theme = useTheme();

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP);

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...{
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
        },
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={{ xs: 0.5, sm: 1.5 }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(Header);
