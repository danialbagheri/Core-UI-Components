import * as React from 'react'

import {Box, useTheme} from '@mui/material'

import {useShopify} from '../../hooks'
import {AppContext} from '../../appProvider'
import {
  assetsEndPoints,
  CART_ICON_ID,
  SEARCH_ICON_ID,
  USER_LOGGED_IN_ICON_ID,
  USER_LOGGED_OUT_ICON_ID,
} from '../../../utils'
import Link from 'next/link'
import {ApiSvgIcon} from '../../shared'

export function AppBarIcons(props) {
  const {trigger, sx, setOpenSearchModal} = props
  const {openCart, closeCart} = useShopify()
  const cartOpenState = React.useRef(false)
  const [appState] = React.useContext(AppContext)
  const theme = useTheme()

  const isLoggedIn = appState.isAuthenticate

  const userLoggedInIcon = appState.icons[
    assetsEndPoints.userAccount
  ]?.items.find(item => item.id === USER_LOGGED_IN_ICON_ID)

  const userLoggedOutIcon = appState.icons[
    assetsEndPoints.userAccount
  ]?.items.find(item => item.id === USER_LOGGED_OUT_ICON_ID)

  const cartIcon = appState.icons[assetsEndPoints.userAccount]?.items.find(
    item => item.id === CART_ICON_ID,
  )

  const searchIcon = appState.icons[assetsEndPoints.userAccount]?.items.find(
    item => item.id === SEARCH_ICON_ID,
  )

  const userSvgSrc = isLoggedIn ? userLoggedInIcon : userLoggedOutIcon

  return (
    <Box
      sx={{
        gap: {xs: 4, md: trigger ? '20px' : '30px'},
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
      <ApiSvgIcon
        className="centralize"
        htmlContent={searchIcon?.svg_icon_text}
        onClick={() => setOpenSearchModal(true)}
        sx={{
          width: 20,
          height: 20,
          display: {xs: 'none', md: trigger ? 'block' : 'none'},
          fill: theme.palette.primary.main,

          position: 'relative',
          cursor: 'pointer',
        }}
      />

      <Link href="/user">
        <ApiSvgIcon
          className="centralize"
          htmlContent={userSvgSrc?.svg_icon_text}
          sx={{
            width: {xs: 20, md: 25},
            height: {xs: 20, md: 25},
            fill: theme.palette.primary.main,
          }}
        />
      </Link>

      <ApiSvgIcon
        className="centralize"
        htmlContent={cartIcon?.svg_icon_text}
        onClick={e => {
          e.preventDefault()
          if (!cartOpenState.current) {
            openCart()
            cartOpenState.current = true
          } else {
            closeCart()
            cartOpenState.current = false
          }
        }}
        sx={{
          width: {xs: 20, md: 25},
          height: {xs: 20, md: 25},
          fill: theme.palette.primary.main,
          cursor: 'pointer',
        }}
      />
    </Box>
  )
}
