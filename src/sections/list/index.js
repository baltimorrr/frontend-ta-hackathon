import { useCallback, useEffect } from 'react'

// @mui
import { Box, Card } from '@mui/material'

// components
import BasicTable from 'components/BasicTable'
import Pagination from 'components/Pagination'

import { DEFAULT_PAGE } from 'config'

import useTable from 'hooks/useTable'

import UserTableRow from './UserTableRow'
import { TABLE_DESKTOP_HEAD, mockData } from './config'

export default function ListUser() {
  const { page, setPage, rowsPerPage, onChangePage } = useTable({
    defaultRowsPerPage: 10,
  })

  const list = [...mockData]

  const columns = TABLE_DESKTOP_HEAD

  const tableRowComp = useCallback((row, index) => {
    return <UserTableRow key={row?.id || index} row={row} />
  }, [])

  useEffect(() => {
    setPage(DEFAULT_PAGE)
  }, [setPage])

  return (
    <Card>
      <Box mt={2}>
        <BasicTable
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          dataSource={list}
          TableRowComp={tableRowComp}
          heightEmptyRow={0}
        />

        <Pagination
          totalRecord={12}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={onChangePage}
          sx={{
            p: 2,
          }}
        />
      </Box>
    </Card>
  )
}
