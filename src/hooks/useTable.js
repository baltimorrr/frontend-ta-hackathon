import { useState } from 'react'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'config'

export default function useTable({
  defaultCurrentPage = 1,
  defaultRowsPerPage = 10,
}) {
  const [page, setPage] = useState(defaultCurrentPage || DEFAULT_PAGE)
  const [rowsPerPage, setRowsPerPage] = useState(
    defaultRowsPerPage || DEFAULT_PAGE_SIZE
  )

  const onChangePage = (_event, newPage) => {
    setPage(newPage)
  }

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target?.value, 10))
    setPage(DEFAULT_PAGE)
  }

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  }
}

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page > 1 ? Math.max(0, rowsPerPage - arrayLength) : 0
}
