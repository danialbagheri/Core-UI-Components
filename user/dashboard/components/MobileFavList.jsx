import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, CircularProgress, Typography} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {Price} from './Price'
import {EmptyState} from './EmptyState'
import {RemoveIcon} from './RemoveIcon'
import {getProperVariantImageSrc} from 'utils'
import {useShopify} from 'redux/ducks/shopify'
import {CustomButton} from 'components/shared'
import {AppContext} from 'components/appProvider'
import {useAuthFetch} from 'components/customHooks'
import {addToCartHandler, removeFromFavoriteHandler} from './localUtils'
/* -------------------------------------------------------------------------- */

export function MobileFavList(props) {
  const {loading} = props
  const [loadingVariant, setLoadingVariant] = React.useState(null)
  const [removeLoading, setRemoveLoading] = React.useState(false)
  const [appState, setAppState] = React.useContext(AppContext)
  const {addVariant, checkoutState, openCart} = useShopify()
  const authFetchHandler = useAuthFetch()
  const router = useRouter()
  const checkoutId = checkoutState.id

  return (
    <Box sx={{display: {xs: 'block', md: 'none'}}}>
      <Box
        sx={{
          width: '288px',
          height: '1px',
          margin: '0 auto',
          bgcolor: '#E4E4E4',
        }}
      />
      {loading ? (
        <Box className="centralize" mt="35px">
          <CircularProgress sx={{display: {xs: 'block', md: 'none'}}} />
        </Box>
      ) : (
        <>
          {appState?.favoriteVariants?.length ? (
            appState?.favoriteVariants.map(variant => (
              <>
                <Box
                  className="centralize"
                  key={variant.id}
                  sx={{py: '24px', width: 317, gap: 5}}
                >
                  <Box sx={{width: 79, height: 92, position: 'relative'}}>
                    <Image
                      alt={variant.name}
                      fill
                      sizes="10vw"
                      src={getProperVariantImageSrc(variant.image_list)}
                      style={{objectFit: 'cover'}}
                    />
                  </Box>
                  <Box
                    sx={{
                      flexGrow: '1',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      height: 92,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',

                        '& a': {
                          textDecoration: 'none',
                        },
                      }}
                    >
                      <Link
                        href={`/products/${variant.product_slug}?sku=${variant.sku}`}
                      >
                        <Typography sx={{fontSize: 14, fontWeight: 500}}>
                          {variant.product_name}
                        </Typography>
                        <Typography sx={{fontSize: 14, fontWeight: 500}}>
                          {variant.name}
                        </Typography>
                      </Link>

                      <Price
                        sx={{flexDirection: 'column', gap: '2px'}}
                        variant={variant}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <CustomButton
                        loading={loadingVariant === variant.id}
                        loadingSize={20}
                        onClick={() =>
                          addToCartHandler({
                            variant,
                            setLoadingVariant,
                            checkoutId,
                            addVariant,
                            openCart,
                          })
                        }
                        sx={{height: 32, width: 152, fontSize: 14}}
                        variant="contained"
                      >
                        Add to cart
                      </CustomButton>
                      {removeLoading === variant.id ? (
                        <CircularProgress
                          sx={{
                            width: '32px !important',
                            height: '32px !important',
                          }}
                        />
                      ) : (
                        <RemoveIcon
                          onClick={() =>
                            removeFromFavoriteHandler({
                              variant,
                              setRemoveLoading,
                              appState,
                              setAppState,
                              router,
                              authFetchHandler,
                            })
                          }
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '288px',
                    height: '1px',
                    margin: '0 auto',
                    bgcolor: '#E4E4E4',
                  }}
                />
              </>
            ))
          ) : (
            <EmptyState sx={{mt: '35px'}} />
          )}
        </>
      )}
    </Box>
  )
}
