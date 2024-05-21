import * as React from 'react'

import {useShopify} from '../../../hooks'

import * as ga from '../../../common/googleAnalytics'
import ProductQuantity from '../../detail/product-quantity'
import {FAVORITE_VARIANTS, WEBSITE_NAME} from 'constants/general'
import {CustomButton} from 'components/shared'
import {Box, Typography} from '@mui/material'
import {AppContext} from 'components/appProvider'
import {Heart, HeartOutlined} from 'components/icons'
import Link from 'next/link'
import {CustomTooltip} from 'components/products/CustomTooltip'
import {favoriteVariantHandler} from 'services'
import {useAuthFetch} from 'components/customHooks'
import ShareButton from 'components/common/shareButton/ShareButton'

export function AddButton(props) {
  const {selectedVariant, product, sx = {}} = props

  const {addVariant, checkoutState, openCart} = useShopify()
  const [selectedQuantity, setSelectedQuantity] = React.useState(1)
  const [appState, setAppState] = React.useContext(AppContext)
  const authFetchHandler = useAuthFetch()

  const isFavorite = Boolean(
    appState?.favoriteVariants?.find(
      variant => variant.sku === selectedVariant.sku,
    ),
  )
  const isLoggedIn = appState.isAuthenticate

  const favoriteBtnText = isFavorite
    ? 'Remove from wishlist'
    : 'Add to wishlist'

  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ]
    addVariant(checkoutState.id, lineItemsToAdd)
    openCart()
    ga.event({
      action: 'add_to_cart',
      params: [
        {
          product: product.name,
          item: [
            {
              id: selectedVariant.sku,
              name: product.name,
              price: selectedVariant.price,
              brand: WEBSITE_NAME,
              variant: selectedVariant.name,
            },
          ],
        },
      ],
    })
    setSelectedQuantity(1)
  }

  const favoriteClickHandler = async e => {
    e.stopPropagation()
    const sku = selectedVariant.sku

    if (appState.isAuthenticate && sku) {
      const onAuthenticatedAction = async token => {
        const action = isFavorite ? 'remove' : 'add'
        await favoriteVariantHandler(sku, token, action)

        if (isFavorite) {
          const newFavoriteVariants = appState.favoriteVariants.filter(
            variant => variant.sku !== sku,
          )
          localStorage.setItem(
            FAVORITE_VARIANTS,
            JSON.stringify(newFavoriteVariants),
          )
          setAppState(prevState => ({
            ...prevState,
            favoriteVariants: newFavoriteVariants,
          }))
        } else {
          const newFavoriteVariants = [
            ...appState.favoriteVariants,
            selectedVariant,
          ]
          localStorage.setItem(
            FAVORITE_VARIANTS,
            JSON.stringify(newFavoriteVariants),
          )
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

      authFetchHandler({
        onAuthenticatedAction,
        onNotAuthenticatedAction,
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: {xs: 'flex-start', md: 'center'},
        flexDirection: {xs: 'column', md: 'row'},
        gap: {xs: '29px', md: '23px'},
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <ProductQuantity
          selectedQuantity={selectedQuantity}
          setQuantity={setSelectedQuantity}
        />
        <CustomButton
          onClick={() => {
            addToBasket(selectedVariant.graphql_id, selectedQuantity)
          }}
          sx={{
            borderRadius: '10px',
            width: 218,
            height: 40,
            minWidth: 218,
            fontWeight: 500,
          }}
          variant="contained"
        >
          Add to cart
        </CustomButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          gap: '23px',
        }}
      >
        <Box
          onClick={favoriteClickHandler}
          sx={{
            cursor: 'pointer',
            '& svg': {width: {xs: 20, md: 30}, height: {xs: 18, md: 28}},
          }}
        >
          <CustomTooltip
            arrow
            enterTouchDelay={0}
            title={
              isLoggedIn ? (
                ''
              ) : (
                <div>
                  <Link href="/user/sign-in">Log in</Link> to use Wishlists!
                </div>
              )
            }
          >
            <Box className="centralize" sx={{gap: '9px'}}>
              {isFavorite ? (
                <Heart
                  sx={{
                    fill: '#FF0000',
                  }}
                />
              ) : (
                <HeartOutlined sx={{fill: '#000'}} />
              )}
              <Typography display={{xs: 'block', md: 'none'}}>
                {favoriteBtnText}
              </Typography>
            </Box>
          </CustomTooltip>
        </Box>
        <ShareButton media={product.main_image} text={product.name} />
      </Box>
    </Box>
  )
}
