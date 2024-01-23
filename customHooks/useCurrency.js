import * as React from 'react'

export function useCurrency() {
  const [currency, setCurrency] = React.useState('GBP')

  const symbol = currency === 'EUR' ? '€' : '£'
  const isGBP = currency === 'GBP'

  React.useEffect(() => {
    if (localStorage.getItem('currency')) {
      setCurrency(localStorage.getItem('currency'))
    }
  }, [])

  return {isGBP, symbol, currency}
}
