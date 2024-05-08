import {FAVORITE_VARIANTS} from 'constants/general'
import {favoriteVariantHandler} from 'services'

export const addToCartHandler = async ({
  variant,
  setLoadingVariant,
  checkoutId,
  addVariant,
  openCart,
}) => {
  setLoadingVariant(variant.id)

  const lineItemsToAdd = [
    {
      variantId: variant.graphql_id,
      quantity: 1,
    },
  ]

  try {
    await addVariant(checkoutId, lineItemsToAdd)
    openCart()
  } catch (err) {
    console.error(err)
  } finally {
    setLoadingVariant(null)
  }
}

export const removeFromFavoriteHandler = async ({
  variant,
  setRemoveLoading = () => {},
  appState,
  setAppState,
  router,
  authFetchHandler,
}) => {
  setRemoveLoading(variant.id)
  const onAuthenticatedAction = async token => {
    const sku = variant.sku
    await favoriteVariantHandler(sku, token, 'remove')
    const newFavoriteVariants = appState.favoriteVariants?.filter(
      variant => variant.sku !== sku,
    )
    localStorage.setItem(FAVORITE_VARIANTS, JSON.stringify(newFavoriteVariants))
    setAppState(prevState => ({
      ...prevState,
      favoriteVariants: newFavoriteVariants,
    }))
  }
  const onNotAuthenticatedAction = async () => {
    router.push('/user')
  }

  authFetchHandler({
    onAuthenticatedAction,
    onNotAuthenticatedAction,
    onFinally: () => setRemoveLoading(false),
  })
}
