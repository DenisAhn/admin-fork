import {
  Card,
  Container,
  Divider,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Typography,
  Stack,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Label } from 'components/ui/Label';
import { Scrollbar } from 'components/ui/Scrollbar';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'components/ui/table';
import { OrderStatus } from 'entities/Status';
import { useOrdersListPageStore } from 'stores/local/OrdersListPageStore';
import { noop } from 'utils/noop';

import { Overview } from './Overview';
import { TableRow } from './TableRow';
import { Toolbar } from './Toolbar';
import { getTabs, TABLE_HEAD } from './config';

function OrdersList() {
  const store = useOrdersListPageStore();

  const { ordersListRequest, orders, currentStatusFilter, setFilterStatus } =
    store;

  React.useEffect(() => {
    ordersListRequest.call();
  }, [ordersListRequest]);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const denseHeight = dense ? 56 : 76;

  const getLengthByStatus = React.useCallback(
    (status: OrderStatus) => {
      return orders.filter((item) => item.orderStatus === status).length;
    },
    [orders]
  );

  const handleFilterStatus = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: OrderStatus
  ) => {
    setFilterStatus(newValue);
  };

  const tabs = React.useMemo(() => {
    return getTabs(getLengthByStatus, orders);
  }, [getLengthByStatus, orders]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders list
      </Typography>
      <Card sx={{ mb: 5 }}>
        <Stack
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderStyle: 'dashed' }}
            />
          }
          sx={{ py: 2 }}
        >
          <Overview store={store} />
        </Stack>
      </Card>
      <Card>
        <Tabs
          value={currentStatusFilter}
          onChange={handleFilterStatus}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  style={{
                    background: tab.color.background,
                    color: tab.color.title,
                  }}
                  sx={{ mr: 1 }}
                >
                  {tab.count}
                </Label>
              }
            />
          ))}
        </Tabs>

        <Divider />

        <Toolbar store={store} />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={orders.length}
                numSelected={selected.length}
                onSort={onSort}
              />

              <TableBody>
                {orders.map((row) => (
                  <TableRow
                    key={row.id}
                    row={row}
                    selected={selected.includes(String(row.id))}
                    onViewRow={noop}
                  />
                ))}
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(
                    page,
                    rowsPerPage,
                    0 /* todo tableData.length*/
                  )}
                />

                <TableNoData isNotFound={orders.length === 0} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={0 /* todo dataFiltered.length*/}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Card>
    </Container>
  );
}

export default observer(OrdersList);
