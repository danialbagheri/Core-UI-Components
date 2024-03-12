import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {Box} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {MobileFavList} from './components'
import {getFavoriteVariantsHandler} from 'utils'
import {AppContext} from 'components/appProvider'
import {useAuthFetch} from 'components/customHooks'
import DesktopFavList from './components/DesktopFavList'
import {CustomButton} from 'components/shared'
import {useShopify} from 'redux/ducks/shopify'
/* -------------------------------------------------------------------------- */

export function FavoriteVariantsList() {
  const [appState, setAppState] = React.useContext(AppContext)
  const [loading, setLoading] = React.useState(true)
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const {addVariant, checkoutState, openCart} = useShopify()
  const authFetchHandler = useAuthFetch()

  const hasFavoriteVariants = appState?.favoriteVariants?.length

  const getFavoriteVariants = async () => {
    try {
      await getFavoriteVariantsHandler({setAppState, authFetchHandler})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addAllToCartHandler = async () => {
    if (hasFavoriteVariants) {
      setButtonLoading(true)
      const lineItemsToAdd = []

      appState.favoriteVariants.forEach(variant => {
        lineItemsToAdd.push({
          variantId: variant.graphql_id,
          quantity: 1,
        })
      })

      try {
        await addVariant(checkoutState.id, lineItemsToAdd)
        openCart()
      } catch (err) {
        console.error(err)
      } finally {
        setButtonLoading(false)
      }
    }
  }

  //Get user favorite list if not already fetched
  React.useEffect(() => {
    if (!appState.favoriteVariants) {
      getFavoriteVariants()
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <Box className="centralize" sx={{width: '100%', flexDirection: 'column'}}>
      <DesktopFavList loading={loading} />
      <MobileFavList loading={loading} />
      {hasFavoriteVariants && !loading ? (
        <CustomButton
          disabled={buttonLoading}
          loading={buttonLoading}
          onClick={addAllToCartHandler}
          sx={{mt: '60px', height: 52, width: 212}}
          variant="contained"
        >
          Add all to cart
        </CustomButton>
      ) : null}
    </Box>
  )
}
