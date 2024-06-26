// @mui
import { TableCell, TableRow as MuiTableRow } from '@mui/material'

import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { fDate } from 'utils/formatTime'

UserTableRow.propTypes = {
  row: PropTypes.object,
}

export default function UserTableRow({ row = {} }) {
  const { title, name, email, phone, createdAt, id } = row || {}
  const navigate = useNavigate()

  return (
    <MuiTableRow
      hover
      onClick={() => navigate(`/resume/${id}`)}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell align='left' width='15%'>
        {title}
      </TableCell>

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
        {!!createdAt ? fDate(createdAt) : null}
      </TableCell>
    </MuiTableRow>
  )
}
