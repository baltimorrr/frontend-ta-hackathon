// @mui
import { TableCell, TableRow as MuiTableRow } from '@mui/material'

import PropTypes from 'prop-types'

UserTableRow.propTypes = {
  row: PropTypes.object,
}

export default function UserTableRow({ row = {} }) {
  const { name, email, phone, address } = row || {}

  return (
    <MuiTableRow hover>
      <TableCell align='left' width='15%'>
        {name}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {email}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {phone}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {address}
      </TableCell>
    </MuiTableRow>
  )
}
