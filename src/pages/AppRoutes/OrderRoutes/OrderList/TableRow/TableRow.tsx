import { TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { Label } from 'components/ui/Label';
import { CATEGORIES_MAPPER_TEXT } from 'entities/Categories';
import { OrderCommonType } from 'entities/Order';
import { SERVICES_MAPPER_TEXT } from 'entities/Services';
import { MAP_STATUS_TO_COLOR, ORDER_STATUS_TEXT_MAPPER } from 'entities/Status';
import { MONTH_IN_NOMINATIVE } from 'utils/date';

type Props = {
  row: OrderCommonType;
  selected: boolean;
  onViewRow: VoidFunction;
};

export default function InvoiceTableRow({ row, selected, onViewRow }: Props) {
  const date = dayjs(row.createdAt);

  return (
    <TableRow onClick={onViewRow} hover selected={selected}>
      <TableCell>{row.id}</TableCell>

      <TableCell align="center">{`${row.user.firstName} ${row.user.secondName}`}</TableCell>

      <TableCell align="center">{`${date.get('date')} ${
        MONTH_IN_NOMINATIVE.en[date.get('month')]
      } ${date.get('year')}`}</TableCell>

      <TableCell align="center">
        {CATEGORIES_MAPPER_TEXT[row.category]}
      </TableCell>

      <TableCell align="center">{SERVICES_MAPPER_TEXT[row.service]}</TableCell>

      <TableCell align="center">{row.provider}</TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {`${row.price} TL`}
      </TableCell>

      <TableCell align="center">
        <Label
          variant="soft"
          style={{
            background: MAP_STATUS_TO_COLOR[row.orderStatus].background,
            color: MAP_STATUS_TO_COLOR[row.orderStatus].title,
          }}
        >
          {ORDER_STATUS_TEXT_MAPPER[row.orderStatus]}
        </Label>
      </TableCell>
    </TableRow>
  );
}
