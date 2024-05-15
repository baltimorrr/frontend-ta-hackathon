import {
  Box,
  Checkbox,
  Stack,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
}

export default function TableHeadCustom({
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
}) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {onSelectAllRows && (
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(e) => onSelectAllRows(e?.target?.checked)}
            />
          </TableCell>
        )}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell?.hasFilter && onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
                sx={{ textTransform: 'capitalize' }}
              >
                {headCell.label}

                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <>
                {(() => {
                  if (!headCell?.hasCustomLabel) return headCell.label

                  return (
                    <Stack
                      direction='row'
                      alignItems={headCell?.customLabel?.align || 'center'}
                      justifyContent={headCell?.customLabel?.justify || 'left'}
                    >
                      {headCell.label}
                      {headCell?.customLabel?.render()}
                    </Stack>
                  )
                })()}
              </>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
