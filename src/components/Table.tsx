"use client";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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
  autoHeight?: boolean;
  maxHeight?: number | string;
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
  autoHeight = false,
  maxHeight,
}: VirtualizedTableProps<T>) {
  // Empty state
  if (data.length === 0) {
    return (
      <Paper style={{ height: autoHeight ? 'auto' : height, width, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
        <Typography color="text.secondary" align="center">
          {emptyMessage}
        </Typography>
      </Paper>
    );
  }

  // Auto height mode - use regular MUI Table
  if (autoHeight) {
    return (
      <TableContainer
        component={Paper}
        sx={{
          width,
          maxHeight: maxHeight || 'none',
          ...sx
        }}
      >
        <Table stickyHeader={stickyHeader} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.dataKey)}
                  align={column.align || (column.numeric ? 'right' : 'left')}
                  style={{
                    width: column.width,
                    backgroundColor: 'var(--color-blue100)',
                  }}
                  sx={{
                    fontWeight: 600,
                    fontFamily: 'Quicksand',
                    ...headerSx,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={getRowId ? String(getRowId(row, index)) : index}
                hover
                onClick={() => onRowClick && onRowClick(row, index)}
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
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
                        fontFamily: 'Quicksand',
                        fontWeight: 500,
                        ...cellSx,
                      }}
                    >
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  // Virtualized mode - for large datasets with fixed height
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
              fontFamily: 'Quicksand',
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
                fontFamily: 'Quicksand',
                fontWeight: 500,
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
