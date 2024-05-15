import { TableCell, TableRow } from '@mui/material'

import EmptyContent from 'components/EmptyContent'

export default function TableNoData({ isNotFound }) {
  if (!isNotFound) return null
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <EmptyContent
          title='No Data'
          sx={{
            '& span.MuiBox-root': { height: 160 },
          }}
        />
      </TableCell>
    </TableRow>
  )
}
