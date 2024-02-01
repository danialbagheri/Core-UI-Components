import * as React from 'react'

import {Box} from '@mui/material'

import {useShopify} from '../../hooks'
import {AppContext} from '../../appProvider'
import {
  assetsEndPoints,
  CART_ICON_ID,
  SEARCH_ICON_ID,
  USER_LOGGED_IN_ICON_ID,
  USER_LOGGED_OUT_ICON_ID,
} from '../../../utils'
import Image from 'next/image'
import Link from 'next/link'

export function AppBarIcons(props) {
  const {trigger, sx, setOpenSearchModal} = props
  const {openCart, closeCart} = useShopify()
  const cartOpenState = React.useRef(false)
  const [appState] = React.useContext(AppContext)

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

  const userSvgSrc = isLoggedIn
    ? userLoggedInIcon?.svg_icon
    : userLoggedOutIcon?.svg_icon

  return (
    <Box
      sx={{
        gap: {xs: 1, msm: 2, sm: 3, md: trigger ? '15px' : '30px'},
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
      <Box
        onClick={() => setOpenSearchModal(true)}
        sx={{
          width: '30px',
          height: '30px',
          display: {xs: 'none', md: trigger ? 'block' : 'none'},
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <Image
          alt={searchIcon?.name}
          fill
          src={searchIcon?.svg_icon}
          style={{
            contentFit: 'cover',

            filter:
              'invert(43%) sepia(75%) saturate(2599%) hue-rotate(2deg) brightness(112%) contrast(84%)',
          }}
        />
      </Box>

      <Link href="/user">
        <Image
          alt={userLoggedInIcon?.name}
          height={30}
          src={userSvgSrc || ''}
          style={{
            filter:
              'invert(43%) sepia(75%) saturate(2599%) hue-rotate(2deg) brightness(112%) contrast(84%)',
          }}
          width={30}
        />
      </Link>

      <Box
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
          width: '30px',
          height: '30px',
          p: 0,
          cursor: 'pointer',
        }}
      >
        <Image
          alt={cartIcon?.name}
          height={30}
          src={cartIcon?.svg_icon}
          style={{
            filter:
              'invert(43%) sepia(75%) saturate(2599%) hue-rotate(2deg) brightness(112%) contrast(84%)',
          }}
          width={30}
        />
      </Box>
    </Box>
  )
}
