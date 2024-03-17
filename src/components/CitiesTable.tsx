import * as React from 'react';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { City, CitiesTableProps } from '../types/cities';

interface ColumnData {
  width: number;
  label: string;
  dataKey: keyof City;
  isNumber?: boolean;
}

const columns: ColumnData[] = [
  {
    width: 150,
    label: 'City',
    dataKey: 'city',
  },
  {
    width: 100,
    label: 'Admin name',
    dataKey: 'admin_name',
  },
  {
    width: 100,
    label: 'Population',
    dataKey: 'population',
    isNumber: true,
  },
];

const VirtuosoTableComponents: TableComponents<City> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.isNumber ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
            fontWeight: 'bold'
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: City) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.isNumber ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export const CitiesTable = ({ cities }: CitiesTableProps) =>  {
  return (
    <Paper style={{ height: 400, width: 600 }}>
      <TableVirtuoso
        data={cities}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
