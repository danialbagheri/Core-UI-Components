import * as React from 'react'

import {
  // Backdrop,
  Box,
  IconButton,
  SxProps,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'

import {useShopify} from '../../hooks'
import {useRouter} from 'next/router'

interface PropsTypes {
  trigger: boolean
  sx: SxProps
  setOpenSearchModal?: (v: boolean) => void
}

export function AppBarIcons(props: PropsTypes) {
  const {trigger, sx, setOpenSearchModal} = props
  const {openCart, closeCart} = useShopify()
  const cartOpenState = React.useRef(false)
  const router = useRouter()

  return (
    <Box
      sx={{
        gap: {xs: 0, md: trigger ? '15px' : '30px'},
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
    >
      <IconButton
        onClick={() => setOpenSearchModal(true)}
        sx={{
          width: '40px',
          height: '40px',
          display: {xs: 'none', md: trigger ? 'block' : 'none'},
        }}
      >
        <SearchIcon color="primary" onClick={() => setOpenSearchModal(true)} />
      </IconButton>

      <IconButton
        onClick={() => router.push('/login')}
        sx={{
          width: '40px',
          height: '40px',
        }}
      >
        <PersonIcon color="primary" />
      </IconButton>

      <IconButton
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
          width: '40px',
          height: '40px',
        }}
      >
        <ShoppingCartIcon color="primary" />
      </IconButton>
    </Box>
  )
}
