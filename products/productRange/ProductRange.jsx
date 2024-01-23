import {Box, CircularProgress} from '@mui/material'

import {ProductItem} from '../ProductItem'

export default function ProductRange(props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 240px))',
        gridTemplateRows: 'auto',
        rowGap: 15,
        columnGap: 3,
        justifyContent: 'center',
        py: 12,
      }}
    >
      {props.products.length < 1 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {props.products
            .slice(0, props.limit)
            .sort(function (a) {
              if (a.collection_names[0] === 'New') {
                return -1
              }
              return 0
            })
            .map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
        </>
      )}
    </Box>
  )
}
