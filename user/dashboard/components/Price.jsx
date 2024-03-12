import {Box, Typography} from '@mui/material'
import {useCurrency} from 'components/customHooks'
import React from 'react'

export function Price(props) {
  const {variant, sx = {}} = props
  const {price, compareAtPrice, isOnSale, symbol} = useCurrency(variant)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5,

        ...sx,
      }}
    >
      <Typography
        color={isOnSale ? '#F00' : '#000'}
        fontSize={16}
        fontWeight={500}
      >
        {`${symbol}${price}`}
      </Typography>
      {isOnSale ? (
        <Typography
          color={'#B7B7B7'}
          fontSize={16}
          fontWeight={400}
          sx={{
            textDecoration: 'line-through',
          }}
        >{`${symbol}${compareAtPrice}`}</Typography>
      ) : null}
    </Box>
  )
}
