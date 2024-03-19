import * as React from 'react'

import Image from 'next/image'

import {Box, Typography} from '@mui/material'

import {
  SUBSCRIBED,
  SUBSCRIPTION_STATE,
  subscriptionHandler,
  validateEmail,
} from 'utils'
import {Container} from './Container'
import {GreenCheck} from 'components/icons'
import {CustomButton, CustomOutlinedInput} from 'components/shared'
import {AppContext} from 'components/appProvider'

export function SubscribeForm({sx = {}}) {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [appState, setAppState] = React.useContext(AppContext)

  const submitHandler = async e => {
    e.preventDefault()

    if (!email) {
      setError('Email is required.')
      return
    } else if (!validateEmail(email)) {
      setError('Please enter a correct email address.')
      return
    }

    setLoading(true)
    setError('')

    subscriptionHandler({email, setLoading, setAppState})
  }

  React.useEffect(() => {
    const subscriptionState = localStorage.getItem(SUBSCRIPTION_STATE)

    if (subscriptionState === SUBSCRIBED) {
      setAppState(prev => ({...prev, [SUBSCRIPTION_STATE]: SUBSCRIBED}))
    }
  }, [])

  return (
    <Container sx={{...sx}}>
      {appState[SUBSCRIPTION_STATE] === SUBSCRIBED ? (
        <Box className="centralize">
          <Box className="centralize" gap="9px" width={175}>
            <GreenCheck sx={{width: 39, height: 39}} />
            <Typography color="#226F61" fontSize={20} fontWeight={700}>
              Thank you for subscribing!
            </Typography>
          </Box>
          <Image
            alt="subscription-girl"
            height={121}
            src="/subscription/subscription-girl.png"
            width={121}
          />
        </Box>
      ) : (
        <>
          <Typography
            color="primary"
            fontSize={34}
            fontWeight={700}
            textAlign="center"
          >
            GET 10% off
          </Typography>
          <Typography
            fontSize={16}
            fontWeight={500}
            mt="7px"
            sx={{color: '#7F2E00'}}
            textAlign="center"
          >
            Join our Sun-Safe family
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
              mt: 5,
            }}
          >
            <CustomOutlinedInput
              error={error}
              id="outlined-required"
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              sx={{
                width: 181,
                height: 32,
                '& input': {bgcolor: '#FFF', py: '5px'},
              }}
              type="email"
              value={email}
            />
            <CustomButton
              loading={loading}
              onClick={submitHandler}
              sx={{width: 112, height: 36, borderRadius: '4px', ml: -2}}
              variant="contained"
            >
              Subscribe
            </CustomButton>
          </Box>
        </>
      )}
    </Container>
  )
}
