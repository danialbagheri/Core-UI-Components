import {Box, Typography} from '@mui/material'

export function VariantSize(props) {
  const {selectedVariant, sx = {}} = props
  return (
    <Box sx={{display: 'flex', gap: 2, ...sx}}>
      {selectedVariant.size ? (
        <Typography variant="h6">Size: {selectedVariant.size} | </Typography>
      ) : null}

      {selectedVariant.price_per_100ml ? (
        <Typography variant="h6">
          £{selectedVariant.price_per_100ml} per 100ml
        </Typography>
      ) : null}
    </Box>
  )
}
