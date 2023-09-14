import { Typography, Stack, StackProps } from '@mui/material';
import * as React from 'react';

import { Image } from 'components/ui/Image';

type EmptyContentProps = {
  title: string;
  img?: string;
  description?: string;
} & StackProps;

function EmptyContent({
  title,
  description,
  img,
  sx,
  ...other
}: EmptyContentProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        textAlign: 'center',
        p: (theme) => theme.spacing(8, 2),
        ...sx,
      }}
      {...other}
    >
      <Image
        disabledEffect
        alt="empty content"
        src={
          img || '/static/assets/illustrations/illustration_empty_content.svg'
        }
        sx={{ height: 240, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}

export default React.memo(EmptyContent);
