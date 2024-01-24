import * as React from 'react'
import {AppContext} from '../appProvider/AppProvider'
import {parseCookies, setCookie} from 'nookies'
import {addProductToFavorite, postRefreshToken} from '../../services'
import {Box} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

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
        await addProductToFavorite(slug, calacc)

        let newFavoriteProducts = []
        if (isFavorite) {
          newFavoriteProducts = appState.favoriteProducts.filter(
            product => product.slug !== slug,
          )
        } else {
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

            await addProductToFavorite(slug, calacc)

            let newFavoriteProducts = []
            if (isFavorite) {
              newFavoriteProducts = appState.favoriteProducts.filter(
                product => product.slug !== slug,
              )
            } else {
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

  return (
    <Box
      onClick={addToFavoriteHandler}
      sx={{
        display: isHovered ? 'block' : 'none',
        position: 'absolute',
        top: 18,
        left: 18,
      }}
    >
      <FavoriteIcon
        fontSize="large"
        sx={{
          fill: isFavorite ? '#FF0000' : '#FFF',
        }}
      />
    </Box>
  )
}
