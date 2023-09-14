import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Image } from 'components/ui/Image';
import { Logo } from 'components/ui/Logo';

import {
  StyledContent,
  StyledRoot,
  StyledSection,
  StyledSectionBg,
} from './styles';

const AuthLayout: React.FC = () => {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 3 },
          ml: { xs: 2, md: 3 },
        }}
      />

      <StyledSection>
        <Typography
          variant="h3"
          sx={{ mb: 5, maxWidth: 480, textAlign: 'center' }}
        >
          Hi, Welcome to Homy Assistant
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={'/static/assets/illustrations/illustration_dashboard.png'}
          sx={{ maxWidth: 720, mb: -10 }}
        />
        <StyledSectionBg />
      </StyledSection>
      <StyledContent>
        <Stack sx={{ width: 1 }}>
          <Outlet />
        </Stack>
      </StyledContent>
    </StyledRoot>
  );
};

export default AuthLayout;
