import * as React from 'react'

export const COMPARE_AT_PRICE = 'compare_at_price'
export const EURO_COMPARE_AT_PRICE = 'euro_compare_at_price'
export const PRICE = 'price'
export const EURO_PRICE = 'euro_price'

export function useCurrency(variant = {}) {
  const [currency, setCurrency] = React.useState('GBP')

  const symbol = currency === 'EUR' ? '€' : '£'
  const isGBP = currency === 'GBP'

  const isOnSale =
    variant[COMPARE_AT_PRICE] || variant[EURO_COMPARE_AT_PRICE] || ''
  const price = Number(isGBP ? variant[PRICE] : variant[EURO_PRICE])
  const compareAtPrice = Number(
    isGBP ? variant[COMPARE_AT_PRICE] : variant[EURO_COMPARE_AT_PRICE],
  )
  const discountPercent = Math.round(
    ((compareAtPrice - price) / compareAtPrice) * 100,
  )

  React.useEffect(() => {
    if (localStorage.getItem('currency')) {
      setCurrency(localStorage.getItem('currency'))
    }
  }, [])

  return {
    isGBP,
    symbol,
    currency,
    isOnSale,
    price,
    compareAtPrice,
    discountPercent,
  }
}
