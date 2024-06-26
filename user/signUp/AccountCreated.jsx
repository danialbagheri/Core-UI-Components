import * as React from 'react'

import {Box, Typography, useTheme} from '@mui/material'

import {validateEmail} from '../../../utils'
import {AppContext} from '../../appProvider/AppProvider'
import {postResendActivation} from '../../../services'
import {CustomButton, CustomOutlinedInput} from 'components/shared'
import {CalypsoGirlDashboard, GreenCheck} from 'components/icons'
import {IS_CALYPSO_WEBSITE} from 'constants/general'

export function AccountCreated() {
  const [appState] = React.useContext(AppContext)
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState({state: false, message: ''})
  const [sendState, setSendState] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const theme = useTheme()

  const signUpEmail = appState.signUpEmail

  const handleChange = e => {
    setEmail(e.target.value)
  }

  const errorHandler = email => {
    let errorState = false
    if (!email) {
      setError({state: true, message: 'Please enter your email address'})
      errorState = true
    } else if (!validateEmail(email)) {
      setError({state: true, message: 'Please enter a valid email address'})
      errorState = true
    }

    return errorState
  }

  const handleResendEmail = async () => {
    setLoading(true)
    setSendState(false)
    setError({state: false, message: ''})
    const emailAddress = signUpEmail || email

    const errorState = errorHandler(emailAddress)

    if (!errorState) {
      try {
        await postResendActivation({email: emailAddress})
        setSendState(true)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  return (
    <Box className="centralize" sx={{px: '18px', flexDirection: 'column'}}>
      {IS_CALYPSO_WEBSITE ? (
        <CalypsoGirlDashboard sx={{width: 145, height: 145}} />
      ) : null}

      <Typography sx={{fontSize: 18, fontWeight: 700, mt: 5}}>
        Please activate your account by clicking the link sent to your email.
      </Typography>
      {sendState ? (
        <Box
          className="centralize"
          sx={{
            p: '28px',
            bgcolor: theme.palette.palm.main,
            borderRadius: '11px',
            gap: 5,
            maxWidth: 340,
            mt: 8,
          }}
        >
          <Box
            className="centralize"
            sx={{
              border: '2px solid #FFF',
              borderRadius: '50%',
            }}
          >
            <GreenCheck sx={{width: 30, height: 30}} />
          </Box>
          <Typography color="#FFF" sx={{fontSize: 20, fontWeight: 600}}>
            An Email has been sent to your email address
          </Typography>
        </Box>
      ) : null}
      {!signUpEmail ? (
        <CustomOutlinedInput
          error={error.message}
          label="Email address"
          onChange={handleChange}
          placeholder="Enter your Email address"
          sx={{mt: 8, mb: 5, width: 260}}
          type="email"
          value={email}
        />
      ) : null}
      <CustomButton
        error={!email ? error.state : null}
        loading={loading}
        onClick={handleResendEmail}
        sx={{
          width: 260,
          height: 45,
          mt: '13px',
          ...(error.state ? {bgcolor: '#d32f2f'} : {}),
        }}
        variant="contained"
      >
        Resend email
      </CustomButton>
      {signUpEmail && error.state ? (
        <Typography color="#d32f2f" sx={{mt: 2}}>
          {error.message}
        </Typography>
      ) : null}
    </Box>
  )
}
