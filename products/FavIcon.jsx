import * as React from 'react'
import {AppContext} from '../appProvider/AppProvider'
import {parseCookies, setCookie} from 'nookies'
import {addProductToFavorite, postRefreshToken} from '../../services'
import {Box} from '@mui/material'
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {styled} from '@mui/material/styles'
import Link from 'next/link'

export const FavIcon = props => {
  const {isHovered, slug, product} = props

  const [appState, setAppState] = React.useContext(AppContext)

  const isFavorite = appState.favoriteProducts?.find(
    product => product.slug === slug,
  )

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
        display: isHovered || isFavorite ? 'block' : 'none',
        position: 'absolute',
        top: 18,
        left: 18,
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
        <FavoriteIcon
          fontSize="large"
          sx={{
            fill: isFavorite ? '#FF0000' : '#FFF',
          }}
        />
      </CustomTooltip>
    </Box>
  )
}
