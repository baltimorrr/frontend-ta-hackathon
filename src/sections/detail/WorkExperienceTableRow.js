// @mui
import { TableCell, TableRow as MuiTableRow } from '@mui/material'

import PropTypes from 'prop-types'

WorkExperienceTableRow.propTypes = {
  row: PropTypes.object,
}

export default function WorkExperienceTableRow({ row = {} }) {
  const { company, position, description, work_from, work_till } = row || {}

  return (
    <MuiTableRow hover>
      <TableCell align='left' width='15%'>
        {company}
      </TableCell>

      <TableCell align='left' width='15%'>
        {position}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {description}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {work_from}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {work_till}
      </TableCell>
    </MuiTableRow>
  )
}
