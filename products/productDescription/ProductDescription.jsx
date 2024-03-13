import * as React from 'react'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Stack} from '@mui/material'

import {AddButton} from './addButton'
import {OutOfStock} from './outOfStock'
import {ProductTab} from './productTab'
import {VariantSize} from './variantSize'
import {ShowPrice} from 'sharedComponents'
import {CustomButton} from 'components/shared'
import {CustomTooltip} from '../CustomTooltip'
import {favoriteVariantHandler} from 'services'
import {getFavoriteVariantsHandler} from 'utils'
import {ProductDropDown} from './productDropDown'
import {AppContext} from 'components/appProvider'
import StarRating from '../StarRating/StarRating'
import {VariantSelector} from '../VariantSelector'
import {useAuthFetch} from 'components/customHooks'
import {Heart, HeartOutlined} from 'components/icons'
import ShareButton from 'components/common/shareButton/ShareButton'

const ProductDescription = props => {
  const {product, selectedVariant, setSelectedVariant} = props

  const [appState, setAppState] = React.useContext(AppContext)
  const [loading, setLoading] = React.useState(false)
  const authFetchHandler = useAuthFetch()
  const isLoggedIn = appState.isAuthenticate !== false
  const isFavorite = Boolean(
    appState?.favoriteVariants?.find(
      variant => variant.sku === selectedVariant.sku,
    ),
  )

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
          setAppState(prevState => ({
            ...prevState,
            favoriteVariants: newFavoriteVariants,
          }))
        } else {
          const newFavoriteVariants = [
            ...appState.favoriteVariants,
            selectedVariant,
          ]
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
        setLoading,
      })
    }
  }

  const getFavoriteProductsHandler = async () => {
    await getFavoriteVariantsHandler({authFetchHandler, setAppState})
  }

  React.useEffect(() => {
    if (appState.isAuthenticate === undefined) {
      getFavoriteProductsHandler()
    }
  }, [])

  return (
    <Stack gap={4}>
      <Typography color="primary.main" variant={'h2'}>
        {product.name}
      </Typography>

      <Typography variant={'h3'}>{product.sub_title}</Typography>

      <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 2, mt: 2}}>
        <StarRating name={product.name} score={product.review_average_score} />
        <a href="#readReviews">
          {product.total_review_count >= 1 ? (
            <span>Read {product.total_review_count} reviews</span>
          ) : (
            <span>Be the first to review to this product</span>
          )}
        </a>
      </Box>
      <Box
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
        sx={{textAlign: 'justify'}}
      />
      <ProductTab product={product} selectedVariant={selectedVariant} />

      {selectedVariant.inventory_quantity > 0 ? (
        <Box mt={10}>
          <Typography>
            FREE 1 - 2 day shipping on all orders above £25
          </Typography>
        </Box>
      ) : null}

      <VariantSize selectedVariant={selectedVariant} />

      <Typography color="primary.main" variant="h2">
        <ShowPrice selectedVariant={selectedVariant} />
      </Typography>

      <VariantSelector
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        slug={product.slug}
        variants={product.variants}
      />

      {selectedVariant.inventory_quantity > 0 ? (
        <AddButton product={product} selectedVariant={selectedVariant} />
      ) : (
        <OutOfStock selectedVariant={selectedVariant} />
      )}

      <Box
        sx={{
          width: 220,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: {xs: 'wrap', ssm: 'nowrap'},
        }}
      >
        <CustomTooltip
          arrow
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
          <Box>
            <CustomButton
              borderColor="#DEDEDE"
              className="centralize"
              loading={loading}
              onClick={favoriteClickHandler}
              sx={{
                p: 2,
                borderRadius: '10px',
                gap: '10px',
                color: isFavorite ? '#FF0000' : '#000',
                width: 233,
                height: 42,
              }}
            >
              {isFavorite ? 'Remove from favorites' : 'Add to your favorite'}
              {isFavorite ? (
                <Heart sx={{fill: '#FF0000'}} />
              ) : (
                <HeartOutlined sx={{fill: '#000'}} />
              )}
            </CustomButton>
          </Box>
        </CustomTooltip>
        <ShareButton media={product.main_image} text={product.name} />
      </Box>

      <ProductDropDown product={product} selectedVariant={selectedVariant} />
    </Stack>
  )
}

export default ProductDescription
