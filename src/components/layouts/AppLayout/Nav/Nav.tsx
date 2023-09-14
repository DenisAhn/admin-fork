import { Box, Drawer, List, Stack } from '@mui/material';
import * as React from 'react';

import { Logo } from 'components/ui/Logo';
import { Scrollbar } from 'components/ui/Scrollbar';
import { NAV } from 'styles/constants';

import { NavList } from './List';
import NAV_ITEMS from './config';
import { StyledSubheader } from './styles';

const Nav: React.FC = () => {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: 0,
        width: NAV.W_DASHBOARD,
        height: '100%',
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            zIndex: 10,
            width: NAV.W_DASHBOARD,
            bgcolor: 'transparent',
            borderRightStyle: 'dashed',
          },
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              pt: 3,
              pb: 2,
              px: 2.5,
              flexShrink: 0,
            }}
          >
            <Logo />
          </Stack>

          <Stack>
            {NAV_ITEMS.map((group) => {
              const key = group.subheader || group.items[0].title;

              return (
                <List key={key} disablePadding sx={{ px: 2 }}>
                  {group.subheader && (
                    <StyledSubheader disableSticky>
                      {group.subheader}
                    </StyledSubheader>
                  )}

                  {group.items.map((list) => (
                    <NavList
                      key={list.title + list.path}
                      data={list}
                      depth={1}
                    />
                  ))}
                </List>
              );
            })}
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
      </Drawer>
    </Box>
  );
};

export default React.memo(Nav);
