import * as React from 'react'

import {useRouter} from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
/* ----------------------------- MUI Components ----------------------------- */
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {RemoveIcon} from './RemoveIcon'
import {AppContext} from 'components/appProvider'
import {EmptyState} from './EmptyState'
import {CustomButton} from 'components/shared'
import {Price} from './Price'
import {useShopify} from 'redux/ducks/shopify'
import {useAuthFetch} from 'components/customHooks'
import {addToCartHandler, removeFromFavoriteHandler} from './localUtils'
import {getProperVariantImageSrc} from 'utils'
/* -------------------------------------------------------------------------- */

export default function DesktopFavList() {
  const [loadingVariant, setLoadingVariant] = React.useState(null)
  const [removeLoading, setRemoveLoading] = React.useState(false)
  const [appState, setAppState] = React.useContext(AppContext)
  const {addVariant, checkoutState, openCart} = useShopify()
  const authFetchHandler = useAuthFetch()
  const router = useRouter()
  const checkoutId = checkoutState.id

  return (
    <>
      {appState?.favoriteVariants?.length ? (
        <Table
          aria-label="simple table"
          sx={{width: 'calc(100% - 100px)', display: {xs: 'none', md: 'table'}}}
        >
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  fontSize: 16,
                  fontWeight: 700,
                  px: 0,
                  py: '7px',
                  lineHeight: 'normal',
                },
              }}
            >
              <TableCell>Product name</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appState?.favoriteVariants.map(variant => (
              <TableRow
                key={variant.id}
                sx={{'& td': {px: 0, lineHeight: 'normal', py: '32px'}}}
              >
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    '& a': {textDecoration: 'none'},

                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '20px',

                    pr: '16px !important',
                  }}
                >
                  <Box sx={{width: 61, height: 70, position: 'relative'}}>
                    <Image
                      alt={variant.name}
                      fill
                      sizes="10vw"
                      src={getProperVariantImageSrc(variant.image_list)}
                      style={{objectFit: 'cover'}}
                    />
                  </Box>
                  <Link
                    href={`/products/${variant.product_slug}?sku=${variant.sku}`}
                  >
                    {`${variant.product_name} - ${variant.name}`}
                  </Link>
                </TableCell>
                <TableCell sx={{maxWidth: 74, minWidth: 115}}>
                  <Price variant={variant} />
                </TableCell>
                <TableCell
                  align="right"
                  sx={{position: 'relative', minWidth: 115}}
                >
                  <CustomButton
                    disabled={loadingVariant === variant.id}
                    loading={loadingVariant === variant.id}
                    onClick={() =>
                      addToCartHandler({
                        variant,
                        setLoadingVariant,
                        checkoutId,
                        addVariant,
                        openCart,
                      })
                    }
                    sx={{width: 112, height: 36, fontSize: 14}}
                    variant="contained"
                  >
                    Add to cart
                  </CustomButton>
                  {removeLoading === variant.id ? (
                    <CircularProgress
                      sx={{
                        position: 'absolute',
                        right: '-42px',
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
                      sx={{
                        position: 'absolute',
                        right: '-42px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState
          sx={{display: {xs: 'none !important', md: 'flex !important'}}}
        />
      )}
    </>
  )
}
