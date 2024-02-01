import * as React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import {styled} from '@mui/material/styles'
import {Box} from '@mui/material'
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip'

import {parseCookies, setCookie} from 'nookies'

import {AppContext} from '../appProvider/AppProvider'
import {addProductToFavorite, postRefreshToken} from '../../services'
import {
  assetsEndPoints,
  WISH_LIST_FILL_ICON_ID,
  WISH_LIST_OUTLINED_ICON_ID,
} from '../../utils/getAssets'

export const FavIcon = props => {
  const {isHovered, slug, product} = props
  const [appState, setAppState] = React.useContext(AppContext)

  const isFavorite = appState.favoriteProducts?.find(
    product => product.slug === slug,
  )

  const userAccountIcons = appState.icons?.[assetsEndPoints.userAccount]?.items

  /* -- Icons which are got from the api and have been set in the AppProvider - */
  const heartFilledIcon = userAccountIcons?.find(
    icon => icon.id === WISH_LIST_FILL_ICON_ID,
  )
  const heartOutlineIcon = userAccountIcons?.find(
    icon => icon.id === WISH_LIST_OUTLINED_ICON_ID,
  )
  /* -------------------------------------------------------------------------- */

  const addToFavoriteHandler = async e => {
    e.stopPropagation()
    const {calacc, calref} = parseCookies()

    if (appState.isAuthenticate) {
      try {
        let newFavoriteProducts = []

        if (isFavorite) {
          await addProductToFavorite(slug, calacc, 'remove')
          newFavoriteProducts = appState.favoriteProducts.filter(
            product => product.slug !== slug,
          )
        } else {
          await addProductToFavorite(slug, calacc, 'add')
          const initialFavoriteProducts = appState.favoriteProducts
          newFavoriteProducts = [...initialFavoriteProducts, product]
        }
        setAppState(perv => ({...perv, favoriteProducts: newFavoriteProducts}))
      } catch (err) {
        if (err.status === 401) {
          try {
            const {access} = await postRefreshToken({
              refresh: calref || 'no-token',
            })

            setCookie(null, 'calacc', access, {
              path: '/',
            })

            let newFavoriteProducts = []
            if (isFavorite) {
              await addProductToFavorite(slug, access, 'remove')
              newFavoriteProducts = appState.favoriteProducts.filter(
                product => product.slug !== slug,
              )
            } else {
              await addProductToFavorite(slug, access, 'add')
              const initialFavoriteProducts = appState.favoriteProducts
              newFavoriteProducts = [...initialFavoriteProducts, product]
            }
            setAppState(perv => ({
              ...perv,
              favoriteProducts: newFavoriteProducts,
            }))
          } catch (err) {
            if (err.status === 401) {
              setAppState(perv => ({...perv, isAuthenticate: false}))
            }
            console.error(err)
          }
        } else {
          console.error(err)
        }
      }
    }
  }

  const CustomTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} cc classes={{popper: className}} />
  ))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#FFF',
      '&:before': {
        border: '1px solid #000',
      },
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#FFF',
      color: '#000',
      border: '1px solid #000',
    },
  }))

  return (
    <Box
      onClick={addToFavoriteHandler}
      sx={{
        display: {xs: 'block', md: isHovered || isFavorite ? 'block' : 'none'},
        position: 'absolute',
        top: 18,
        left: 18,
        '& img': {
          filter: isFavorite
            ? 'brightness(0) saturate(100%) invert(30%) sepia(81%) saturate(7482%) hue-rotate(354deg) brightness(113%) contrast(128%)'
            : {
                xs: 'brightness(0) saturate(100%) invert(88%) sepia(16%) saturate(266%) hue-rotate(3deg) brightness(89%) contrast(83%)',
                md: 'brightness(0) saturate(100%) invert(100%) sepia(55%) saturate(2%) hue-rotate(186deg) brightness(112%) contrast(101%)',
              },
        },
        '& #products_fill_heart_icon': {
          display: {xs: isFavorite ? 'block' : 'none', md: 'block'},
        },
        '& #products_outline_heart_icon': {
          display: {xs: isFavorite ? 'none' : 'block', md: 'none'},
        },
      }}
    >
      <CustomTooltip
        arrow
        title={
          appState.isAuthenticate ? (
            ''
          ) : (
            <div>
              <Link href="/user/sign-in">Log in</Link> to use Wishlists!
            </div>
          )
        }
      >
        <Image
          alt={heartFilledIcon?.name || 'heart'}
          height={24}
          id="products_fill_heart_icon"
          src={heartFilledIcon?.svg_icon || ''}
          width={25}
        />
        <Image
          alt={heartOutlineIcon?.name || 'heart'}
          height={24}
          id="products_outline_heart_icon"
          src={heartOutlineIcon?.svg_icon || ''}
          width={25}
        />
      </CustomTooltip>
    </Box>
  )
}
