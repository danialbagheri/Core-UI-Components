import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import {useRouter} from 'next/router'
import Link from 'next/link'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Divider, Typography} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
/* -------------------------------------------------------------------------- */

/* ------------------------------- Libraries ------------------------------- */
import {destroyCookie} from 'nookies'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {AppContext} from 'components/appProvider'
import {CustomButton} from 'components/shared'
import {FAVORITE_VARIANTS, USER_DATA} from 'constants/general'
/* -------------------------------------------------------------------------- */

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
    localStorage.removeItem(FAVORITE_VARIANTS)
    localStorage.removeItem(USER_DATA)
    setAppState(perv => ({...perv, isAuthenticate: false}))

    router.push('/user/sign-in')
  }

  return (
    <Box sx={{width: '100%', '&>hr:last-child': {display: 'none'}}}>
      <Typography sx={{fontSize: '24px', fontWeight: 700, mb: 6}}>
        Manage your account
      </Typography>

      {manageAccountList.map(item => (
        <React.Fragment key={item.id}>
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',

              '&>a': {
                textDecoration: 'none',
              },
            }}
          >
            <Link href={item.route}>
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
            </Link>

            <ArrowForwardIosIcon color="primary" fontSize="small" />
          </Box>
          <Divider sx={{borderColor: '#F2F2F2', my: 3}} />
        </React.Fragment>
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
