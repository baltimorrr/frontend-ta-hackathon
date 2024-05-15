import { useMemo } from 'react'
import { Pagination as MuiPagination } from '@mui/material'

export default function Pagination({
  totalRecord = 0,
  page = 0,
  rowsPerPage = 5,
  onChangePage,
  ...other
}) {
  const totalPage = useMemo(
    () => Math.ceil(totalRecord / rowsPerPage),
    [rowsPerPage, totalRecord]
  )

  if (!totalPage) return null

  return (
    <MuiPagination
      count={totalPage}
      page={page}
      onChange={onChangePage}
      shape='rounded'
      color='primary'
      {...other}
    />
  )
}
