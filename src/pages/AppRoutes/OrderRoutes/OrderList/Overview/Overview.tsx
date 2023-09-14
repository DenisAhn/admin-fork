import { useTheme } from '@mui/material/styles';
import * as React from 'react';

import { OrdersListPageStore } from 'stores/local/OrdersListPageStore';

import { OverviewItem } from './OverviewItem';

type OverviewProps = {
  store: OrdersListPageStore;
};

const Overview: React.FC<OverviewProps> = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <OverviewItem
        title="Total"
        total={12}
        percent={100}
        price={909}
        icon="ic:round-receipt"
        color={theme.palette.info.main}
      />

      <OverviewItem
        title="Paid"
        total={13}
        percent={0 /* getPercentByStatus('Paid')*/}
        price={542}
        icon="eva:checkmark-circle-2-fill"
        color={theme.palette.success.main}
      />

      <OverviewItem
        title="Confirmed"
        total={15}
        percent={0}
        price={123}
        icon="eva:clock-fill"
        color={theme.palette.warning.main}
      />

      <OverviewItem
        title="Awaits payment"
        total={77}
        percent={0 /* getPercentByStatus('Awaits payment')*/}
        price={33}
        icon="eva:bell-fill"
        color={theme.palette.error.main}
      />

      <OverviewItem
        title="Await work"
        total={111}
        percent={0 /* getPercentByStatus('Awaits work')*/}
        price={77}
        icon="eva:file-fill"
        color={theme.palette.text.secondary}
      />
    </React.Fragment>
  );
};

export default React.memo(Overview);
