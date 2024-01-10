import * as React from 'react'

import {useRouter} from 'next/router'
import {setCookie} from 'nookies'

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from '@mui/material'
import {CustomButton, CustomTextField, Title} from './localShared'
import {postUserSignIn} from '../../services'

/**
 * Customizable container component with dynamic styling options.
 *
 * @param {object} param.sx - Styling object for the main container.
 * @returns {React.FC<Props>} - A React Functional Component.
 *
 * @example
 * // Example usage with custom styling
 * <AlreadyMember sx={{ backgroundColor: '#000' }} />
 *
 * @description
 * This component is versatile and can be used on both the /user and /user/sign-in pages.
 * The title displayed is dynamic and changes based on the route where it is rendered.
 */

const EMAIL = 'email'
const PASSWORD = 'password'
const DETAIL = 'detail'

const errorInitialState = {
  [EMAIL]: null,
  [PASSWORD]: null,
  [DETAIL]: null,
}

export function AlreadyMember({sx = {}}) {
  const [fields, setFields] = React.useState({[EMAIL]: '', [PASSWORD]: ''})
  const [error, setError] = React.useState(errorInitialState)
  const [loading, setLoading] = React.useState(false)

  const theme = useTheme()
  const router = useRouter()

  const isSignInPage = router.pathname.includes('sign-in')

  const changeHandler = (value, field) => {
    setFields(prev => ({...prev, [field]: value}))
  }

  const signInHandler = async e => {
    e.preventDefault()
    setLoading(true)
    setError(errorInitialState)

    try {
      const response = await postUserSignIn(fields)
      const {refresh, access} = response

      setCookie(null, 'calacc', access, {
        maxAge: 30 * 60 * 1000,
        path: '/',
      })
      setCookie(null, 'calref', refresh, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        path: '/',
      })

      router.push('/user/dashboard')

      setLoading(false)
    } catch (err) {
      const errorMessages = err.res
      setError({
        [EMAIL]: errorMessages[EMAIL],
        [PASSWORD]: errorMessages[PASSWORD],
        [DETAIL]: errorMessages[DETAIL],
      })
      setLoading(false)
    }
  }

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
        ...sx,
      }}
    >
      <Title sx={{display: isSignInPage ? 'none' : {xs: 'none', md: 'block'}}}>
        Already a member?
      </Title>
      <Title sx={{display: isSignInPage ? 'block' : 'none'}}>Sign in</Title>

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
        {error[DETAIL] ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <Typography>{error[DETAIL]}</Typography>
          </Alert>
        ) : null}

        <CustomTextField
          error={Boolean(error[EMAIL] || error[DETAIL])}
          helperText={error[EMAIL]}
          id="sign-in-email"
          label="Email"
          onChange={e => changeHandler(e.target.value, EMAIL)}
          type="email"
        />
        <CustomTextField
          error={error[PASSWORD] || error[DETAIL]}
          helperText={error[PASSWORD]}
          id="sign-in-password"
          label="Password"
          onChange={e => changeHandler(e.target.value, PASSWORD)}
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
        loading={loading}
        onClick={signInHandler}
        sx={{mt: '50px', width: 200, height: 40}}
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
