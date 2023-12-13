import {Box, Button, Checkbox, FormControlLabel, useTheme} from '@mui/material'
import {CustomButton, CustomTextField, Title} from './localShared'

export function AlreadyMember() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          md: '50%',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        px: '75px',
      }}
    >
      <Title sx={{display: {xs: 'none', md: 'block'}}}>Already a member?</Title>
      <Box
        sx={{
          mt: {xs: '58px', md: '40px'},
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          maxWidth: 280,
        }}
      >
        <CustomTextField
          id="sign-in-email"
          label="Email"
          onChange={e => console.log('E:::::', e.target.value)}
          type="email"
        />
        <CustomTextField
          id="sign-in-password"
          label="Password"
          onChange={e => console.log('E:::::', e.target.value)}
          type="password"
        />
        <FormControlLabel
          control={<Checkbox sx={{color: theme.palette.primary.main}} />}
          label="Keep me signed in"
          sx={{
            m: 0,
            '&>span:nth-child(2)': {
              padding: 0,
              color: '#226F61',
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '0',
              ml: 2,
            },
            '&>span:first-child': {
              p: 0,
            },
          }}
        />
      </Box>
      <CustomButton
        onClick={e => {
          e.preventDefault()
        }}
        sx={{mt: '50px'}}
        variant="contained"
      >
        Sign in
      </CustomButton>

      <Button
        sx={{
          textTransform: 'none',

          mt: '42px',

          boxShadow: 'none',

          '&:hover': {
            bgcolor: '#FFF !important',
            boxShadow: 'none !important',
          },
        }}
        variant="text"
      >
        <Title subTitle>Forgot your password?</Title>
      </Button>
    </Box>
  )
}
