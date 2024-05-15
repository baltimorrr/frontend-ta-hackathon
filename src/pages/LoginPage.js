import { Stack } from '@mui/material'
import LoginForm from 'sections/auth/LoginForm'

export default function LoginPage() {
  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `linear-gradient(to left top, #053637, #006158, #008e6d, #00bc75, #3aeb6f)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LoginForm />
    </Stack>
  )
}
