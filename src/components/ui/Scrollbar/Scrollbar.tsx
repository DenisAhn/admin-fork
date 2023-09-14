import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import * as React from 'react';

import { StyledRootScrollbar, StyledScrollbar } from './styles';

type Props = {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

const Scrollbar: React.FC<Props> = ({ children, sx, ...other }) => {
  return (
    <StyledRootScrollbar>
      <StyledScrollbar clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
};

export default Scrollbar;
