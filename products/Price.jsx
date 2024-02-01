import React from 'react'

import {useCurrency} from '../customHooks'
import {Box, Typography} from '@mui/material'

export const COMPARE_AT_PRICE = 'compare_at_price'
export const EURO_COMPARE_AT_PRICE = 'euro_compare_at_price'
export const PRICE = 'price'
export const EURO_PRICE = 'euro_price'

export function Price(props) {
  const {variant} = props
  const {isGBP, symbol} = useCurrency()

  const isOnSale = variant[COMPARE_AT_PRICE] || variant[EURO_COMPARE_AT_PRICE]
  const price = Number(isGBP ? variant[PRICE] : variant[EURO_PRICE])
  const compareAtPrice = Number(
    isGBP ? variant[COMPARE_AT_PRICE] : variant[EURO_COMPARE_AT_PRICE],
  )
  const discountPercent = Math.round(
    ((compareAtPrice - price) / compareAtPrice) * 100,
  )

  return (
    <Box>
      {isOnSale ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: {xs: 'flex-start', msm: 'flex-end'},
            gap: {xs: '4px', md: '15px'},
            flexDirection: {xs: 'column', msm: 'row'},
            mt: {xs: 2, msm: 0},
          }}
        >
          <Box sx={{bgcolor: '#FAF5EB', p: '2px 8px'}}>
            <Typography fontSize={{xs: 13, msm: 16}} fontWeight={600}>
              SALE {`-${discountPercent}%`}
            </Typography>
          </Box>
          <Box className="centralize" gap="15px">
            <Typography
              color="#F00"
              fontSize={{xs: 13, msm: 16}}
              fontWeight={600}
            >
              {symbol + price}
            </Typography>
            <Typography
              color="#A3A3A3"
              fontSize={{xs: 13, msm: 16}}
              fontWeight={400}
              sx={{textDecoration: 'line-through'}}
            >
              {symbol + compareAtPrice}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography fontSize={{xs: 13, msm: 16}} fontWeight={600}>
            {symbol + price}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
