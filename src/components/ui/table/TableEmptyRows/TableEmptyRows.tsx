import { TableRow, TableCell } from '@mui/material';
import * as React from 'react';

type Props = {
  height?: number;
  emptyRows: number;
};

function TableEmptyRows({ emptyRows, height }: Props) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}

export default React.memo(TableEmptyRows);
