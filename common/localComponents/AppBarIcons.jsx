import * as React from 'react'

import Link from 'next/link'

import {Box, useTheme} from '@mui/material'

import {useShopify} from '../../hooks'
import {AppContext} from '../../appProvider'
import {CartEmpty, Search, UserLoggedIn, UserLoggedOut} from 'components/icons'

export function AppBarIcons(props) {
  const {trigger, sx, setOpenSearchModal} = props
  const [appState] = React.useContext(AppContext)

  const {openCart} = useShopify()
  const theme = useTheme()

  const isLoggedIn = appState.isAuthenticate

  return (
    <Box
      sx={{
        gap: {xs: 3, md: trigger ? '20px' : '30px'},
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s ease-in-out',
        '& img:hover': {
          scale: '1.05',
        },
        ...sx,
      }}
    >
      <Search
        onClick={() => setOpenSearchModal(true)}
        sx={{
          width: 20,
          height: 20,
          fill: theme.palette.primary.main,
          display: {
            xs: 'none',
            md: trigger ? 'block' : 'none',
            position: 'relative',
            cursor: 'pointer',
          },
        }}
      />

      <Box>
        <Link className="centralize" href="/user">
          {isLoggedIn ? (
            <UserLoggedIn
              sx={{width: 25, height: 25, color: theme.palette.primary.main}}
            />
          ) : (
            <UserLoggedOut
              sx={{width: 25, height: 25, color: theme.palette.primary.main}}
            />
          )}
        </Link>
      </Box>

      <CartEmpty
        onClick={openCart}
        sx={{
          width: 25,
          height: 25,
          color: theme.palette.primary.main,
          cursor: 'pointer',
        }}
      />
    </Box>
  )
}
