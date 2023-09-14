import { CircularProgress, Stack } from '@mui/material';
import * as React from 'react';

type LoadingStubProps = {
  className?: string;
  pageSized?: boolean;
};

const LoadingStub: React.FC<LoadingStubProps> = ({ className }) => {
  return (
    <Stack
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      className={className}
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default React.memo(LoadingStub);
