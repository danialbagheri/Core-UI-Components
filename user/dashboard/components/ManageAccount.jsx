import * as React from 'react'

import {useRouter} from 'next/router'

import {Box, Divider, Typography} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import {destroyCookie} from 'nookies'

import {CustomButton} from '../../localShared'
import {AppContext} from '../../../appProvider'

const manageAccountList = [
  {
    id: 'account_details',
    title: 'Account details',
    description: 'Your name, mobile number and email address',
    route: '/user/dashboard/account-details',
  },
  {
    id: 'password',
    title: 'Password',
    description: 'To set or change your password',
    route: '/user/dashboard/password',
  },
]

export function ManageAccount() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [, setAppState] = React.useContext(AppContext)

  const logOutHandler = () => {
    setLoading(true)
    destroyCookie(null, 'calacc', {path: '/'})
    destroyCookie(null, 'calref', {path: '/'})
    setAppState(perv => ({...perv, isAuthenticate: false}))

    router.push('/user/sign-in')
  }

  return (
    <Box sx={{width: '100%', '&>hr:last-child': {display: 'none'}}}>
      <Typography sx={{fontSize: '24px', fontWeight: 700, mb: 6}}>
        Manage your account
      </Typography>

      {manageAccountList.map(item => (
        <>
          <Box
            key={item.id}
            onClick={() => router.push(item.route)}
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Box>
              <Typography
                color="primary"
                sx={{fontSize: '18px', fontWeight: 700}}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{fontSize: '14px', fontWeight: 500, color: '#226F61'}}
              >
                {item.description}
              </Typography>
            </Box>
            <ArrowForwardIosIcon color="primary" fontSize="small" />
          </Box>
          <Divider sx={{borderColor: '#F2F2F2', my: 3}} />
        </>
      ))}
      <CustomButton
        loading={loading}
        onClick={logOutHandler}
        sx={{
          mx: 'auto',
          my: {xs: 15, md: 10},
          display: 'flex',
          width: 163,
          height: 44,
        }}
      >
        Log out
      </CustomButton>
    </Box>
  )
}
