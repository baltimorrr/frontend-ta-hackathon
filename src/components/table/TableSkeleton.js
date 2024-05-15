import { Skeleton, Stack, TableCell, TableRow } from '@mui/material'

export default function TableSkeleton({ columns = [], height = 20, ...other }) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={columns.length || 5}>
        <Stack spacing={3} direction='row' alignItems='center'>
          {(columns || []).map(({ width, align }, index) => (
            <Skeleton
              key={index}
              align={align || 'left'}
              variant='text'
              width={width || '100%'}
              height={height}
            />
          ))}
        </Stack>
      </TableCell>
    </TableRow>
  )
}
