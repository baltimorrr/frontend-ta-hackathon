import { TableCell, TableRow } from '@mui/material'

export default function TableEmptyRows({ emptyRows, height = 80 }) {
  if (!emptyRows) {
    return null
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  )
}
