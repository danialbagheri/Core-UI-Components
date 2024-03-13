import * as React from 'react'

import Link from 'next/link'

import {Box} from '@mui/material'

import {AppContext} from '../appProvider/AppProvider'
import {favoriteVariantHandler} from 'services'

import {Heart, HeartOutlined} from 'components/icons'
import {useAuthFetch} from 'components/customHooks'
import {CustomTooltip} from './CustomTooltip'

export const FavIcon = props => {
  const {isHovered, variant} = props

  const [appState, setAppState] = React.useContext(AppContext)

  const fetchHandlers = useAuthFetch()

  const sku = variant?.sku
  const isFavorite = appState.favoriteVariants?.find(
    variant => variant.sku === sku,
  )

  /* -------------------------------------------------------------------------- */

  const addToFavoriteHandler = async e => {
    e.stopPropagation()

    if (appState.isAuthenticate && sku) {
      const onAuthenticatedAction = async token => {
        const action = isFavorite ? 'remove' : 'add'
        await favoriteVariantHandler(sku, token, action)

        if (isFavorite) {
          const newFavoriteVariants = appState.favoriteVariants.filter(
            variant => variant.sku !== sku,
          )
          setAppState(prevState => ({
            ...prevState,
            favoriteVariants: newFavoriteVariants,
          }))
        } else {
          const newFavoriteVariants = [...appState.favoriteVariants, variant]
          setAppState(prevState => ({
            ...prevState,
            favoriteVariants: newFavoriteVariants,
          }))
        }
      }

      const onNotAuthenticatedAction = () => {
        setAppState(prevState => ({
          ...prevState,
          favoriteVariants: undefined,
          isAuthenticate: false,
        }))
      }

      fetchHandlers({onAuthenticatedAction, onNotAuthenticatedAction})
    }
  }

  return (
    <Box
      onClick={addToFavoriteHandler}
      sx={{
        display: {xs: 'block', md: isHovered || isFavorite ? 'block' : 'none'},
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
        <Heart
          sx={{
            fill: isFavorite ? '#FF0000' : '#FFF',
            display: {xs: isFavorite ? 'block' : 'none', md: 'block'},
          }}
        />
        <HeartOutlined
          sx={{
            width: 25,
            height: 24,
            fill: '#CAC1AE',
            display: {xs: isFavorite ? 'none' : 'block', md: 'none'},
          }}
        />
      </CustomTooltip>
    </Box>
  )
}
