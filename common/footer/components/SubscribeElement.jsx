import * as React from 'react'

import {Box, Typography, useTheme} from '@mui/material'
import {AppContext} from 'components/appProvider'
import {
  CalypsoGirlDashboard,
  CartEmpty,
  GreenCheck,
  Heart,
  UserLoggedOut,
} from 'components/icons'
import {CustomButton, CustomOutlinedInput} from 'components/shared'
import Image from 'next/image'
import {SUBSCRIBED, SUBSCRIPTION_STATE} from 'utils'
import Link from 'next/link'

const WEBSITE = process.env.NEXT_PUBLIC_WEBSITE
const isCabana = WEBSITE === 'cabana'

const Title = () => (
  <Typography color="primary" fontSize={34} fontWeight={700} textAlign="center">
    GET 10% off
  </Typography>
)

const Subtitle = props => {
  const {text, sx = {}} = props
  return (
    <Typography fontSize={16} fontWeight={500} sx={{color: '#7F2E00', ...sx}}>
      {text}
    </Typography>
  )
}

const SubscriptionField = props => {
  const {error, setEmail, email, loading, submitHandler, sx = {}} = props

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        ...sx,
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
  )
}

export function SubscribeElement(props) {
  const {email, error, setEmail, loading, submitHandler} = props
  const [isSubscribed, setIsSubscribed] = React.useState(false)
  const [appState] = React.useContext(AppContext)
  const theme = useTheme()

  const notRegisteredNotSubscribed = !appState.userData && !isSubscribed
  const notRegisteredSubscribed = !appState.userData && isSubscribed
  const registeredNotSubscribed = appState.userData && !isSubscribed
  const registeredSubscribed = appState.userData && isSubscribed

  React.useEffect(() => {
    const subscriptionState = localStorage.getItem(SUBSCRIPTION_STATE)
    setIsSubscribed(subscriptionState === SUBSCRIBED)
  }, [])

  switch (true) {
    case notRegisteredNotSubscribed:
      return (
        <React.Fragment>
          <Title />
          <Subtitle
            sx={{mt: '7px', textAlign: 'center'}}
            text="Join our Sun-Safe family"
          />
          <SubscriptionField
            email={email}
            error={error}
            loading={loading}
            setEmail={setEmail}
            submitHandler={submitHandler}
            sx={{mt: 5}}
          />
        </React.Fragment>
      )
    case notRegisteredSubscribed:
      return (
        <Box className="centralize">
          <Box className="centralize" gap="9px" width={182}>
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
      )
    case registeredNotSubscribed:
      return (
        <Box className="centralize" sx={{flexDirection: 'column', gap: 3}}>
          <Typography color="#7F2E00" fontSize={22} fontWeight={700}>
            Hey {appState.userData?.first_name}
          </Typography>
          <Title />
          <Subtitle
            sx={{textAlign: 'center'}}
            text="subscribe and enjoy the next purchase discount"
          />
          <SubscriptionField
            email={email}
            error={error}
            loading={loading}
            setEmail={setEmail}
            submitHandler={submitHandler}
            sx={{mt: 2}}
          />
        </Box>
      )
    case registeredSubscribed:
      return (
        <Box>
          <Box className="centralize" sx={{gap: '22px'}}>
            <CalypsoGirlDashboard sx={{width: 102, height: 102}} />
            <Box>
              <Typography color="#7F2E00" fontSize={22} fontWeight={700}>
                Hey {appState.userData?.first_name}
              </Typography>
              <Subtitle
                sx={{mt: 2, maxWidth: 144}}
                text="Here are quick links to your account"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: '22px',
            }}
          >
            <Link
              className="centralize"
              href="/user/dashboard"
              style={{textDecoration: 'none', gap: '8px'}}
            >
              <CartEmpty
                sx={{fill: theme.palette.primary.main, width: 15, height: 15}}
              />
              <Typography color="primary" fontSize={14} fontWeight={600}>
                Orders
              </Typography>
            </Link>
            <Link
              className="centralize"
              href="/user/dashboard/favorite-variants"
              style={{textDecoration: 'none', gap: '8px'}}
            >
              <Heart
                sx={{fill: theme.palette.primary.main, width: 13, height: 13}}
              />
              <Typography color="primary" fontSize={14} fontWeight={600}>
                Wishlist
              </Typography>
            </Link>
            <Link
              className="centralize"
              href="/user/dashboard/account-details"
              style={{textDecoration: 'none', gap: '8px'}}
            >
              <UserLoggedOut
                sx={{fill: theme.palette.primary.main, width: 15, height: 15}}
              />
              <Typography color="primary" fontSize={14} fontWeight={600}>
                Setting
              </Typography>
            </Link>
          </Box>
        </Box>
      )
    default:
      return null
  }
}
