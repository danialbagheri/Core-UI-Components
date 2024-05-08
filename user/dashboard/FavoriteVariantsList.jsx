import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {Box} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {MobileFavList} from './components'
import {AppContext} from 'components/appProvider'
import DesktopFavList from './components/DesktopFavList'
import {CustomButton} from 'components/shared'
import {useShopify} from 'redux/ducks/shopify'
/* -------------------------------------------------------------------------- */

export function FavoriteVariantsList() {
  const [appState] = React.useContext(AppContext)
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const {addVariant, checkoutState, openCart} = useShopify()

  const hasFavoriteVariants = appState?.favoriteVariants?.length

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

  return (
    <Box className="centralize" sx={{width: '100%', flexDirection: 'column'}}>
      <DesktopFavList />
      <MobileFavList />
      {hasFavoriteVariants ? (
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
