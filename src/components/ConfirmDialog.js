// @mui
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

export default function ConfirmDialog({
  title,
  subheader,
  actions,
  open,
  onClose,
  children,
  ...other
}) {
  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose} {...other}>
      <DialogTitle>
        {title}
        {subheader}
      </DialogTitle>

      {children && <DialogContent>{children}</DialogContent>}

      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  )
}
