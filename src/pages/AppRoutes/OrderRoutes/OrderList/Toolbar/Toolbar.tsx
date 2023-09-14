import { Stack, TextField, MenuItem } from '@mui/material';
import * as React from 'react';

import { Services, SERVICES_MAPPER_TEXT } from 'entities/Services';
import { OrdersListPageStore } from 'stores/local/OrdersListPageStore';

const INPUT_WIDTH = 160;

type Props = {
  store: OrdersListPageStore;
};

const options = [...Object.values(Services), 'all'];

export default function InvoiceTableToolbar({ store }: Props) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        select
        label="Service type"
        value={store.currentServiceFilter}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: { maxHeight: 220 },
            },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
          textTransform: 'capitalize',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            onClick={() => store.setServiceFilter(option as Services)}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {SERVICES_MAPPER_TEXT[option] || option}
          </MenuItem>
        ))}
      </TextField>

      {/* <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search client or invoice number..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />*/}

      {/* {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}*/}
    </Stack>
  );
}
