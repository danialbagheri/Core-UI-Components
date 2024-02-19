import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'

/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {AppContext} from 'components/appProvider'
import {useAuthFetch} from 'components/customHooks'
import {getFavoriteProductsHandler} from 'utils'
// import {Price} from './components'
/* -------------------------------------------------------------------------- */

export function FavoriteProductsList() {
  const [appState, setAppState] = React.useContext(AppContext)
  const authFetchHandler = useAuthFetch()

  const getFavoriteProducts = async () => {
    try {
      await getFavoriteProductsHandler({setAppState, authFetchHandler})
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    if (!appState.favoriteProducts) {
      getFavoriteProducts()
    }
  }, [])

  return (
    <Box sx={{width: '100%'}}>
      <Table aria-label="simple table">
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
            {/* <TableCell>Unit Price</TableCell> */}
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appState?.favoriteProducts?.length ? (
            appState?.favoriteProducts.map(product => (
              <TableRow
                key={product.id}
                sx={{'& td': {px: 0, lineHeight: 'normal', py: '32px'}}}
              >
                <TableCell sx={{fontWeight: 500, fontSize: 16}}>
                  {product.name}
                </TableCell>
                {/* <TableCell>
                  <Price variant={product.variants[0]} />
                </TableCell> */}
                <TableCell>
                  <Button>Add to cart</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell> No favorite products found</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  )
}
