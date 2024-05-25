import { useMemo } from 'react'

import { Table, TableBody, TableContainer } from '@mui/material'
import { styled } from '@mui/material/styles'

import { emptyRows } from 'hooks/useTable'

import { defaultPagination } from 'config'
import PropTypes from 'prop-types'

import Scrollbar from './Scrollbar'

import TableHeadCustom from './table/TableHeadCustom'
import TableSkeleton from './table/TableSkeleton'
import TableEmptyRows from './table/TableEmptyRows'
import TableNoData from './table/TableNoData'

const TableContainerStyle = styled(TableContainer)(({ theme, ownerState }) => ({
  position: 'relative',
  padding: `0 ${theme.spacing(2)}`,
  ...ownerState,
}))

BasicTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  isLoading: PropTypes.bool,
  heightEmptyRow: PropTypes.number,
  heightSkeletonRow: PropTypes.number,
  tableStyle: PropTypes.object,
  TableRowComp: PropTypes.func,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func,
}

export default function BasicTable({
  columns = [],
  dataSource = [],
  page = 0,
  rowsPerPage = defaultPagination,
  isLoading = false,
  heightEmptyRow,
  heightSkeletonRow,
  tableStyle = {},
  TableRowComp,
  orderBy = '',
  order = 'asc',
  onSort,
}) {
  const isNotFound = !isLoading && !dataSource.length
  const tableData = useMemo(
    () => (isLoading ? [...Array(rowsPerPage)] : dataSource),
    [dataSource, isLoading, rowsPerPage]
  )
  return (
    <Scrollbar
      sx={{
        '& .simplebar-placeholder': {
          display: 'none',
        },
      }}
    >
      <TableContainerStyle ownerState={tableStyle}>
        <Table>
          {columns.length > 0 && (
            <TableHeadCustom
              onSort={onSort}
              orderBy={orderBy}
              order={order}
              headLabel={columns}
            />
          )}

          <TableBody>
            {tableData.map((row, index) =>
              row && TableRowComp
                ? TableRowComp(row?.cvInJson, index)
                : !isNotFound && (
                    <TableSkeleton
                      key={index}
                      columns={columns}
                      height={heightSkeletonRow}
                    />
                  )
            )}
          </TableBody>

          <TableEmptyRows
            emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
            height={heightEmptyRow}
          />

          <TableNoData isNotFound={isNotFound} />
        </Table>
      </TableContainerStyle>
    </Scrollbar>
  )
}
