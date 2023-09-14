/* import { LoadingButton } from '@mui/lab';
import {
  Container,
  TableCell,
  Table,
  TableBody,
  Card,
  Grid,
  Box,
  Select,
  MenuItem,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import { capitalize } from 'lodash-es';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Image } from 'components/ui/Image';
import { Scrollbar } from 'components/ui/Scrollbar';
import {
  MAP_STATUS_TO_COLOR,
  ORDER_STATUS_TEXT_MAPPER,
  OrderStatus,
} from 'entities/Status';
import { MONTH_IN_NOMINATIVE } from 'utils/date';*/

export default function RequestDetailsPage() {
  /* c; onst navigate = useNavigate();

 const { id } = useParams();*/

  /* const [status, setStatus] = React.useState<OrderStatus | null>(
    invoice?.orderStatus || null
  );*/

  /* React.useEffect(() => {
    if (invoice?.orderStatus) {
      setStatus(invoice.orderStatus);
    }
  }, [invoice?.orderStatus]);*/

  /* Запрос на изменение статуса */
  /* React.useEffect(() => {
    if (invoice?.id && status) {
      axios.patch(`/orders/update/${invoice.id}`, {
        status,
      });
    }
  }, [status, invoice]);*/

  /* const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.request.edit(id));
  };

  const verifyPayment = React.useCallback(() => {
    axios.get('/orders/payment/verify/' + invoice?.id);
  }, [invoice?.id]);

  if (!invoice) {
    return null;
  }

  const [currentInvoice, setCurrentInvoice] =
    React.useState<OrderCommonType | null>(null);

  React.useEffect(() => {
    const call = async () => {
      const response = await axios.get<{
        order: OrderCommonType;
        extra: Record<string, any>;
      }>(`/orders/${id}`);

      setCurrentInvoice({ ...response.data.order, extra: response.data.extra });
    };

    call();
  }, [id]);*/

  return null;
  /* <Container>
      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image
              disabledEffect
              alt="logo"
              src="/static/logo/homyLogo.svg"
              sx={{ maxWidth: 120 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Select
                sx={{
                  '& .MuiInputBase-input': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  },
                }}
                variant="standard"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {Object.entries(OrderStatus).map(([key, value]) => (
                  <MenuItem
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                    key={key}
                    value={key}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: MAP_STATUS_TO_COLOR[key].background,
                      }}
                    />
                    {capitalize(ORDER_STATUS_TEXT_MAPPER[value])}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="h6">ORDER №{invoice.id}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: 'text.disabled' }}
            >
              Invoice from
            </Typography>

            <Typography variant="body2">
              {invoice.user.firstName + ' ' + invoice.user.secondName}
            </Typography>

            <Typography variant="body2">
              9388 Auer Station Suite 573 - Honolulu, AK / 98024
            </Typography>

            <Typography variant="body2">Phone: +90412356345</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: 'text.disabled' }}
            >
              Order Status
            </Typography>

            <Typography variant="body2">{invoice.orderStatus}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: 'text.disabled' }}
            >
              Is payment verified
            </Typography>

            <Typography variant="body2">{invoice.paid}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: 'text.disabled' }}
            >
              Payment method
            </Typography>

            <Typography variant="body2">
              {invoice.paymentMethod || 'Not chosen yet'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: 'text.disabled' }}
            >
              Date create
            </Typography>

            <Typography variant="body2">{`${date.get('day')} ${
              MONTH_IN_NOMINATIVE.en[date.get('month')]
            } ${date.get('year')}`}</Typography>
          </Grid>
          {invoice.extra &&
            Object.entries(invoice.extra).map(([key, detail]) => {
              if (!detail || !key) {
                return null;
              }

              return (
                <Grid item xs={12} sm={6} key={key} sx={{ mb: 5 }}>
                  <Typography
                    paragraph
                    variant="overline"
                    sx={{ color: 'text.disabled' }}
                  >
                    {capitalize(getLabel(key || ''))}
                  </Typography>

                  <Typography variant="body2">
                    {capitalize(detail || '')}
                  </Typography>
                </Grid>
              );
            })}

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10px',
              }}
            >
              <LoadingButton
                onClick={verifyPayment}
                size="large"
                variant="contained"
                disabled={invoice.paid === OrderPaymentStatus.paid}
              >
                Verify payment
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
        {/!* {invoice.photos && (
        <React.Fragment>
          <Stack>
            <Typography sx={{ color: 'text.disabled' }} variant="body1">
              Attachments
            </Typography>
            {invoice.photos?.map((item) => (
              <Image style={{ height: 150, width: 150 }} src={item} />
            ))}
          </Stack>
        </React.Fragment>
      )}*!/}

        {/!* {!invoice.price.free && (
        <Box display="flex" justifyContent="flex-end">
          <TableCell align="right" sx={{ typography: 'h6' }}>
            Total
          </TableCell>

          <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
            {invoice.price.value + ' ' + invoice.price.currency}
          </TableCell>
        </Box>
      )}*!/}

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>

                  <TableCell align="left">Description</TableCell>

                  <TableCell align="left">Qty</TableCell>

                  <TableCell align="right">Unit price</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableCell colSpan={3} />

                <TableCell align="right" sx={{ typography: 'h6' }}>
                  Total
                </TableCell>

                <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
                  {invoice.price + 'TL'}
                </TableCell>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <Divider sx={{ mt: 5 }} />
      </Card>
    </Container>*/
}
