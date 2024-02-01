import * as React from 'react'

import Image from 'next/image'
import {useRouter} from 'next/router'

import {Box, Typography} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import LogoutIcon from '@mui/icons-material/Logout'
import {destroyCookie} from 'nookies'
import {AppContext} from '../../appProvider'

const SIDE_BAR_ITEMS = [
  {id: 'my-dashboard', name: 'My dashboard', url: '/user/dashboard'},
  {
    id: 'account-details',
    name: 'Account details',
    url: '/user/dashboard/account-details',
  },
  {id: 'password', name: 'Password', url: '/user/dashboard/password'},
]

const SIDE_BAR_BUTTONS = [
  {
    id: 'log-out',
    name: 'Log out',
    onClick: router => {
      destroyCookie(null, 'calacc', {path: '/'})
      destroyCookie(null, 'calref', {path: '/'})
      router.push('/user/sign-in')
    },
    icon: <LogoutIcon color="primary" fontSize="small" />,
  },
]

export default function SideBar(props) {
  const {girlIcon, route} = props
  const router = useRouter()
  const [, setAppState] = React.useContext(AppContext)

  const routerClickHandler = (id, url) => {
    if (id === route) {
      return
    }
    router.push(url)
  }

  return (
    <Box
      sx={{
        width: 280,
        minWidth: 280,
        display: {xs: 'none', md: 'flex'},
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        bgcolor="sand.main"
        className="centralize"
        id="side_bar_top_part"
        sx={{
          p: '35px 15px',
          borderRadius: '10px',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Image
          alt={girlIcon.name || 'Calypso girl'}
          height={145}
          src={girlIcon.svg_icon}
          width={145}
        />
        <Box
          sx={{
            px: 10,
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',

            '&>div:last-child': {
              borderBottom: 'none',
            },
          }}
        >
          {SIDE_BAR_ITEMS.map(item => (
            <Box
              key={item.id}
              onClick={() => routerClickHandler(item.id, item.url)}
              sx={{
                py: 4,
                borderBottom: '2px solid #FFE1CB',
                width: '100%',
                position: 'relative',
                ...(route === item.id ? {} : {cursor: 'pointer'}),
              }}
            >
              <Typography
                color={route === item.id ? '#000' : 'primary'}
                fontSize="16px"
                fontWeight={700}
              >
                {item.name}
              </Typography>
              <ArrowForwardIosIcon
                color="primary"
                fontSize="small"
                sx={{
                  position: 'absolute',
                  right: -24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: route === item.id ? 'none' : 'block',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      {SIDE_BAR_BUTTONS.map(button => (
        <Box
          bgcolor="sand.main"
          key={button.id}
          onClick={() => {
            button.onClick(router)
            if (button.id === 'log-out') {
              setAppState(prev => ({...prev, isAuthenticate: false}))
            }
          }}
          sx={{
            p: '12px 55px',
            borderRadius: '10px',
            display: 'flex',
            gap: 4,
            cursor: 'pointer',
          }}
        >
          {button.icon}
          <Typography color="primary" fontSize="16px" fontWeight={600}>
            {button.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
