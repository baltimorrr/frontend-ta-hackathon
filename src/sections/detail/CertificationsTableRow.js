// @mui
import { TableCell, TableRow as MuiTableRow } from '@mui/material'

import PropTypes from 'prop-types'

CertificationsTableRow.propTypes = {
  row: PropTypes.object,
}

export default function CertificationsTableRow({ row = {} }) {
  const { name, issuing_organization, issue_date, expired_date } = row || {}

  return (
    <MuiTableRow hover>
      <TableCell align='left' width='15%'>
        {name}
      </TableCell>

      <TableCell align='left' width='15%'>
        {issuing_organization}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {issue_date}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {expired_date}
      </TableCell>
    </MuiTableRow>
  )
}
