import {useShopify} from '../../../hooks'
import {Box, Button, useTheme} from '@mui/material'
import {VariantSelector} from 'sharedComponents'

export default function AddToBasketWithDropDown(props) {
  const {addVariant, checkoutState, openCart} = useShopify()
  const theme = useTheme()
  const {activeVariant, setActiveVariant} = props
  const variants = props.product.variants

  const inStock = (variant = false) => {
    if (!variant) {
      return activeVariant.inventory_quantity > 0
    }
    return variant.inventory_quantity > 0
  }

  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ]
    addVariant(checkoutState.id, lineItemsToAdd)
    openCart()
  }

  return (
    <Box
      sx={{
        /* ------------------------- Variant selector Styles ------------------------ */
        '& .main_variant_selector_con': {
          minHeight: 50,
          marginBottom: 2,
          gap: {xs: 5, sm: 4},
        },
        '& .SPF_variants': {
          width: 30,
          height: 30,
          fontSize: 12,
          // backgroundColor: theme.palette.primary.main,
          // boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        },
        '& .ProductOptionSelector': {
          width: '100%',
          height: '32px',
          padding: '2px 15px',
        },
        /* -------------------------------------------------------------------------- */
      }}
    >
      <VariantSelector
        selectedVariant={activeVariant}
        setSelectedVariant={setActiveVariant}
        variants={variants}
      />
      <Button
        color={'darkGrey'}
        disabled={!inStock()}
        fullWidth
        onClick={() => {
          addToBasket(activeVariant.graphql_id, 1)
        }}
        sx={{
          fontWeight: 700,
          '&:hover': {
            boxShadow: `0 0 2px 1px ${theme.palette.primary.main}`,
            borderColor: 'transparent',
          },
        }}
        variant="outlined"
      >
        {inStock() ? 'ADD TO CART' : 'OUT OF STOCK'}
      </Button>
    </Box>
  )
}
