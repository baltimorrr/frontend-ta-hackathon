import { List, ListItem, ListItemText } from '@mui/material'
import Iconify from 'components/Iconify'
import IconButtonAnimate from 'components/animate/IconButtonAnimate'
import { fFileSize } from 'utils/formatNumber'
import getFileData from 'utils/getFileData'

export default function UploadFilePreview({
  uploadFiles,
  onDeleteFile,
  ...other
}) {
  return (
    <>
      <List disablePadding {...other}>
        {uploadFiles.map(({ file, errors = [] }, index) => {
          const { path, size, name } = getFileData(file)

          if (!Array.isArray(errors) || !errors.length)
            return (
              <ListItem
                key={`${path}-${index}`}
                sx={{
                  my: 2,
                  px: 2,
                  py: 0.75,
                  borderRadius: 0.75,
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <Iconify
                  icon={'eva:file-fill'}
                  sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }}
                />

                <ListItemText
                  primary={typeof file === 'string' ? file : name}
                  secondary={
                    typeof file === 'string' ? '' : fFileSize(size) || 0
                  }
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />

                <IconButtonAnimate
                  color='primary'
                  onClick={() => onDeleteFile(file, true)}
                >
                  <Iconify icon='eva:close-fill' />
                </IconButtonAnimate>
              </ListItem>
            )

          return (
            <ListItem
              key={`${path}-${index}`}
              sx={{
                my: 2,
                px: 2,
                py: 0.75,
                borderRadius: 0.75,
                border: (theme) => `solid 1px ${theme.palette.error.dark}`,
              }}
            >
              <Iconify
                icon={'eva:file-fill'}
                sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }}
              />

              <ListItemText
                primary={typeof file === 'string' ? file : name}
                secondary={errors?.[0]?.message || ''}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  color: 'error.dark',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  color: 'error.dark',
                }}
              />

              <IconButtonAnimate
                color='primary'
                onClick={() => onDeleteFile(file)}
              >
                <Iconify icon='eva:close-fill' />
              </IconButtonAnimate>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
