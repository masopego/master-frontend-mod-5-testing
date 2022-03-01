import React from 'react';
import { HeaderGroup } from 'react-table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CellComponent } from './cell.component';

interface Props {
  headerGroups: HeaderGroup[];
}

export const HeaderComponent: React.FunctionComponent<Props> = (props) => {
  const { headerGroups } = props;
  return (
    <TableHead>
      {headerGroups.map((headerGroup, index) => (
        <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
          {headerGroup.headers.map((column, index) => (
            <CellComponent {...column.getHeaderProps()} key={index}>
              {column.render('Header')}
            </CellComponent>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};
