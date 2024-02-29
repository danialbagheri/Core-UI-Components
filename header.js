import * as React from 'react'
import {useShopify} from '../components/hooks'

import Cart from './shopify/cart'
import Navigation from './common/Navigation'

// import store from "../redux/store";
export default function Header(props) {
  const {navItems} = props
  const {createShop, createCheckout, fetchProducts} = useShopify()

  React.useEffect(() => {
    createShop()
    fetchProducts()
    createCheckout()
  }, [])

  return (
    <header>
      <Navigation navItems={navItems} />
      <Cart />
    </header>
  )
}
