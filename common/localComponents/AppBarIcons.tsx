import * as React from 'react'

import {
  // Backdrop,
  Box,
  SxProps,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'

import {useShopify} from '../../hooks'

interface PropsTypes {
  trigger: boolean
  sx: SxProps
  setOpenSearchModal?: (v: boolean) => void
}

export function AppBarIcons(props: PropsTypes) {
  const {trigger, sx, setOpenSearchModal} = props
  const {openCart, closeCart} = useShopify()
  const cartOpenState = React.useRef(false)

  return (
    <Box
      sx={{
        gap: {xs: '20px', md: trigger ? '25px' : '41px'},
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
    >
      <SearchIcon
        color="primary"
        onClick={() => setOpenSearchModal(true)}
        sx={{display: {xs: 'block', md: trigger ? 'block' : 'none'}}}
      />
      <PersonIcon color="primary" />

      {/* <Backdrop
        onClick={() => {
          closeCart()
          cartOpenState.current = false
        }}
        open={cartOpenState.current}
        // sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
      ></Backdrop> */}
      <ShoppingCartIcon
        color="primary"
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
      />
    </Box>
  )
}
