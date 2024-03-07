import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {
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
/* -------------------------------------------------------------------------- */

export default function DesktopFavList(props) {
  const {loading} = props
  const [appState] = React.useContext(AppContext)

  if (loading) {
    return <CircularProgress sx={{display: {xs: 'none', md: 'block'}}} />
  }

  return (
    <>
      {appState?.favoriteProducts?.length ? (
        <Table
          aria-label="simple table"
          sx={{width: '100%', display: {xs: 'none', md: 'table'}}}
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
              {/* <TableCell>Unit Price</TableCell> */}
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appState?.favoriteProducts.map(product => (
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
                <TableCell sx={{position: 'relative'}}>
                  <CustomButton
                    sx={{width: 112, fontSize: 14}}
                    variant="contained"
                  >
                    Add to cart
                  </CustomButton>
                  <RemoveIcon
                    sx={{
                      position: 'absolute',
                      right: '-42px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState />
      )}
    </>
  )
}
