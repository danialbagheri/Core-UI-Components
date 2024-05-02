import * as React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {Box, TextField, Typography, useTheme} from '@mui/material'

import {
  SUBSCRIBED,
  SUBSCRIPTION_STATE,
  subscriptionHandler,
  validateEmail,
} from 'utils'
import {CustomButton} from 'components/shared'

import Styles from './MailChimp.module.css'
import {GreenCheck} from 'components/icons'
import {AppContext} from 'components/appProvider'
import {WEBSITE_NAME} from 'constants/general'

const SUB_PANEL_OPEN = 'sub panel open'
const fieldStyle = {
  width: '100%',
  '&>p': {marginTop: '-2px', marginBottom: '-6px'},
  '& input': {padding: '5px'},
  '&>label': {top: '-11px'},
  '&>label.MuiFormLabel-filled': {top: 0},
  '&>label.Mui-focused': {
    top: 0,
    color: '#fb4c1e',
  },
  '&>.Mui-focused>fieldset': {
    borderColor: '#fb4c1e80 !important',
  },
}

const WEBSITE = process.env.NEXT_PUBLIC_WEBSITE

export default function MailjetSignUp() {
  const [showPopUp, setShowPopUp] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [isSubscribed, setIsSubscribed] = React.useState(false)
  const [appState, setAppState] = React.useContext(AppContext)
  const theme = useTheme()
  const isCabana = WEBSITE === 'cabana'

  /* -------------------------------- Function -------------------------------- */
  const setShowPopUpSetting = () => {
    setShowPopUp(!showPopUp)
  }

  const submitHandler = async e => {
    e.preventDefault()

    if (!email) {
      setError('Email is required.')
      return
    } else if (!validateEmail(email)) {
      setError('The email address is not valid.')
      return
    }

    setError('')
    setLoading(true)

    const subscribeState = await subscriptionHandler({
      email,
      setLoading,
      setAppState,
    })

    console.log('🚀 🙂  subscribeState:::', subscribeState)

    if (!subscribeState.state) {
      const message =
        subscribeState.message ||
        'Something went wrong. Please try again later.'
      setError(message)
    }
  }

  const onScroll = () => {
    const {scrollY} = window

    const subPanelOpenState = localStorage.getItem(SUB_PANEL_OPEN)
    if (scrollY > 1000 && subPanelOpenState !== 'open') {
      window.removeEventListener('scroll', onScroll, {passive: true})
      setShowPopUp(true)
      localStorage.setItem(SUB_PANEL_OPEN, 'open')
    }
  }
  /* -------------------------------------------------------------------------- */

  React.useEffect(() => {
    const subPanelOpenState = localStorage.getItem(SUB_PANEL_OPEN)
    const subscriptionState = localStorage.getItem(SUBSCRIPTION_STATE)

    if (subscriptionState === SUBSCRIBED) {
      setIsSubscribed(true)
    }

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && showPopUp) {
        setShowPopUp(false)
      }
    })

    if (subPanelOpenState !== 'open') {
      //add eventlistener to window
      window.addEventListener('scroll', onScroll, {passive: true})
      // remove event on unmount to prevent a memory leak with the cleanup
      return () => {
        window.removeEventListener('scroll', onScroll, {passive: true})
      }
    }
  }, [])

  if (isSubscribed) {
    return null
  }

  return (
    <>
      <Box
        onClick={() => setShowPopUp(false)}
        sx={{
          display: showPopUp ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: theme.palette.sand.main,
          zIndex: 50,
          transition: 'all 1s',
          opacity: 0.6,
        }}
      />

      <div
        className={`${Styles.NewsLetterContainer} ${
          showPopUp
            ? Styles.NewsLetterContainerOpen
            : Styles.NewsLetterContainerClose
        }`}
      >
        <Box
          onClick={e => {
            e.stopPropagation()
            setShowPopUpSetting()
          }}
          sx={{
            top: 0,
            left: 0,
            width: {xs: '100%', sm: '37px'},
            height: {xs: '37px', sm: '340px'},
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'primary.main',
            padding: '3px',
            cursor: 'pointer',
          }}
        >
          <i className={Styles.ToggleIcon} />
          <div className={Styles.Offer}>
            <span>GET 10% OFF</span>
          </div>
        </Box>

        <div className={Styles.Content}>
          <div className={Styles.ImageContainer}>
            <Image
              alt={'subscription'}
              fill
              src={'/home-page/newsletter-subscription.jpg'}
              style={{objectFit: 'cover'}}
            />
          </div>
        </div>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            backgroundColor: '#fdf8f1c7',
          }}
        >
          <Typography textAlign={'center'} variant="h5">
            Sign up to get 10% off your first order
          </Typography>
          {appState[SUBSCRIPTION_STATE] === SUBSCRIBED ? (
            <Box
              className="centralize"
              sx={{flexDirection: 'column-reverse', gap: 2}}
            >
              <Box className="centralize" gap="9px" width={175}>
                <GreenCheck sx={{width: 39, height: 39}} />
                <Typography color="#226F61" fontSize={20} fontWeight={700}>
                  Thank you for subscribing!
                </Typography>
              </Box>
              {!isCabana ? (
                <Image
                  alt="subscription-girl"
                  height={121}
                  src="/subscription/subscription-girl.png"
                  width={121}
                />
              ) : null}
            </Box>
          ) : (
            <Box className={Styles.infoContainer}>
              <Box mt={'-10px'} sx={{flexGrow: 1}}>
                <ul>
                  <li>Exclusive offers</li>
                  <li>New product launches</li>
                  <li>Sun advice</li>
                </ul>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  flexGrow: 1,
                }}
              >
                <TextField
                  error={error}
                  helperText={error}
                  id="outlined-required"
                  label="Email"
                  onChange={e => setEmail(e.target.value)}
                  required
                  sx={{...fieldStyle}}
                  type="email"
                  value={email}
                />
                <CustomButton
                  loading={loading}
                  onClick={submitHandler}
                  sx={{borderRadius: 1, height: 32, fontSize: 16}}
                  variant="contained"
                >
                  SUBSCRIBE
                </CustomButton>
              </Box>
            </Box>
          )}

          <p className={Styles.smallText}>
            By entering your email, you are opting in to receiving emails from{' '}
            {WEBSITE_NAME}. You can opt out anytime.
            <Link href={'/privacy-policy'}>Privacy policy</Link>
          </p>
        </Box>
      </div>
    </>
  )
}
