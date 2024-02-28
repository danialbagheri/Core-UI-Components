import {Box, Typography} from '@mui/material'
import {useCurrency} from 'components/customHooks'
import React from 'react'

export function Price(props) {
  const {variant} = props
  const {price, compareAtPrice} = useCurrency(variant)

  return (
    <Box className="centralize" sx={{gap: 3}}>
      <Typography>{price}</Typography>
      <Typography>{compareAtPrice}</Typography>
    </Box>
  )
}
