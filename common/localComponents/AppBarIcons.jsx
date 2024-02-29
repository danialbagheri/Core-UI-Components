import * as React from 'react'

import {Box} from '@mui/material'

import {useShopify} from '../../hooks'
import {AppContext} from '../../appProvider'
import Link from 'next/link'

/* ------------------------------- Local Icons ------------------------------ */
import search from '../../../public/icons/search.svg'
import userLoggedIn from '../../../public/icons/usr-logged-in.svg'
import userLoggedOut from '../../../public/icons/user-logged-out.svg'
import cartEmpty from '../../../public/icons/cart-empty.svg'
import Image from 'next/image'
/* -------------------------------------------------------------------------- */

export function AppBarIcons(props) {
  const {trigger, sx, setOpenSearchModal} = props
  const {openCart} = useShopify()
  const [appState] = React.useContext(AppContext)

  const isLoggedIn = appState.isAuthenticate

  const userSvgSrc = isLoggedIn ? userLoggedIn : userLoggedOut

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
      <Box
        onClick={() => setOpenSearchModal(true)}
        sx={{
          display: {
            xs: 'none',
            md: trigger ? 'block' : 'none',
            position: 'relative',
            cursor: 'pointer',
          },
        }}
      >
        <Image alt="search" height={20} src={search} width={20} />
      </Box>

      <Box>
        <Link href="/user">
          <Image alt="user" height={25} src={userSvgSrc} width={25} />
        </Link>
      </Box>

      <Box onClick={openCart}>
        <Image alt="cart" height={25} src={cartEmpty} width={25} />
      </Box>
    </Box>
  )
}
