"use client";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { SxProps, Theme } from '@mui/material/styles';

export interface ColumnData<T = Record<string, unknown>> {
  dataKey: keyof T | string;
  label: string;
  numeric?: boolean;
  width?: number;
  align?: 'left' | 'right' | 'center';
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface VirtualizedTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: ColumnData<T>[];
  height?: number | string;
  width?: number | string;
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  cellSx?: SxProps<Theme>;
  onRowClick?: (row: T, index: number) => void;
  getRowId?: (row: T, index: number) => string | number;
  emptyMessage?: string;
  stickyHeader?: boolean;
}

function VirtualizedTable<T extends Record<string, unknown>>({
  data,
  columns,
  height = 400,
  width = '100%',
  sx,
  headerSx,
  cellSx,
  onRowClick,
  getRowId,
  emptyMessage = 'No data available',
  stickyHeader = true,
}: VirtualizedTableProps<T>) {
  const ScrollerComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} sx={sx} />
  ));
  ScrollerComponent.displayName = 'VirtuosoScroller';

  const TableComponent = (props: React.ComponentProps<typeof Table>) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  );
  TableComponent.displayName = 'VirtuosoTable';

  const TableHeadComponent = React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  ));
  TableHeadComponent.displayName = 'VirtuosoTableHead';

  const TableBodyComponent = React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  ));
  TableBodyComponent.displayName = 'VirtuosoTableBody';

  const VirtuosoTableComponents: TableComponents<T> = {
    Scroller: ScrollerComponent,
    Table: TableComponent,
    TableHead: TableHeadComponent,
    TableRow,
    TableBody: TableBodyComponent,
  };

  const fixedHeaderContent = () => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={String(column.dataKey)}
            variant="head"
            align={column.align || (column.numeric ? 'right' : 'left')}
            style={{
              width: column.width,
              backgroundColor: 'var(--color-blue100)',
            }}
            sx={{
              backgroundColor: 'background.paper',
              fontWeight: 600,
              ...headerSx,
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const rowContent = (index: number, row: T) => {
    return (
      <React.Fragment>
        {columns.map((column) => {
          const value = row[column.dataKey as keyof T] as unknown;
          const cellContent = column.render
            ? column.render(value, row, index)
            : (value as React.ReactNode);

          return (
            <TableCell
              key={String(column.dataKey)}
              align={column.align || (column.numeric ? 'right' : 'left')}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
                ...cellSx,
              }}
              onClick={() => onRowClick && onRowClick(row, index)}
            >
              {cellContent}
            </TableCell>
          );
        })}
      </React.Fragment>
    );
  };

  if (data.length === 0) {
    return (
      <Paper style={{ height, width, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TableCell colSpan={columns.length} align="center">
          {emptyMessage}
        </TableCell>
      </Paper>
    );
  }

  return (
    <Paper style={{ height, width }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={stickyHeader ? fixedHeaderContent : undefined}
        itemContent={rowContent}
        computeItemKey={(index: number) => {
          if (getRowId) {
            return String(getRowId(data[index], index));
          }
          return String(index);
        }}
      />
    </Paper>
  );
}

// Export both named and default
export { VirtualizedTable };
export default VirtualizedTable;
