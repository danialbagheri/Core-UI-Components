import * as React from 'react'
import {useShopify} from '../components/hooks'

import Cart from './shopify/cart'
import Navigation from './common/Navigation'

// import store from "../redux/store";
export default function Header() {
  const {createShop, createCheckout, fetchProducts} = useShopify()
  //   const { search, showSearch } = useState(false);

  React.useEffect(() => {
    createShop()
    fetchProducts()
    createCheckout()
  }, [])

  return (
    <header>
      <Navigation />
      <Cart />
    </header>
  )
}
