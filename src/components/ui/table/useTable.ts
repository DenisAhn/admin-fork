import * as React from 'react';

import { TableProps } from './types';

type ReturnType = TableProps;

export type UseTableProps = {
  defaultDense?: boolean;
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
};

export function useTable(props?: UseTableProps): ReturnType {
  const [dense, setDense] = React.useState(!!props?.defaultDense);

  const [orderBy, setOrderBy] = React.useState(props?.defaultOrderBy || 'name');

  const [order, setOrder] = React.useState<'asc' | 'desc'>(
    props?.defaultOrder || 'asc'
  );

  const [page, setPage] = React.useState(props?.defaultCurrentPage || 0);

  const [rowsPerPage, setRowsPerPage] = React.useState(
    props?.defaultRowsPerPage || 5
  );

  const [selected, setSelected] = React.useState<string[]>(
    props?.defaultSelected || []
  );

  const onSort = React.useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';

      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const onSelectRow = React.useCallback(
    (id: string) => {
      const selectedIndex = selected.indexOf(id);

      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = React.useCallback(
    (checked: boolean, newSelecteds: string[]) => {
      if (checked) {
        setSelected(newSelecteds);

        return;
      }

      setSelected([]);
    },
    []
  );

  const onChangePage = React.useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
    },
    []
  );

  const onChangeDense = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDense(event.target.checked);
    },
    []
  );

  return {
    dense,
    order,
    page,
    orderBy,
    rowsPerPage,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    setPage,
    setDense,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage,
  };
}
