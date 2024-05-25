// @mui
import { TableCell, TableRow as MuiTableRow } from '@mui/material'

import PropTypes from 'prop-types'

EducationTableRow.propTypes = {
  row: PropTypes.object,
}

export default function EducationTableRow({ row = {} }) {
  const { university, major, degree, study_from, study_till } = row || {}

  return (
    <MuiTableRow hover>
      <TableCell align='left' width='15%'>
        {university}
      </TableCell>

      <TableCell align='left' width='15%'>
        {major}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {degree}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {study_from}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {study_till}
      </TableCell>
    </MuiTableRow>
  )
}
