import {useState} from 'react'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {TOP_PRODUCT_FILTERS} from './FilterProducts'
import _ from 'lodash'

import Styles from './filterProducts.module.css'
import {ProductsTypes} from '../../../types'

interface PropsTypes {
  setFilterToggle: (v: boolean) => void
  setCategory: (v: string) => void
  setLimit: (v: number) => void
  setMaxLimit: (v: boolean) => void
  limit: number
  setSelectedFilter: (v) => void
  products: ProductsTypes[]
  setProducts: (v: ProductsTypes[]) => void
}

export function FilterMenu(props: PropsTypes) {
  const {
    setFilterToggle,
    setCategory,
    setLimit,
    setMaxLimit,
    limit,
    setSelectedFilter,
    products,
    setProducts,
  } = props

  const [dropDownToggle, setDropDownToggle] = useState(true)
  const [spfDropDownToggle, setSpfDropDownToggle] = useState(false)
  const [productsToShowDropDownToggle, setProductsToShowDropDownToggle] =
    useState(false)

  function sortLimit(filteredProducts) {
    if (limit <= filteredProducts.length) {
      if (filteredProducts.length > 10) {
        setLimit(10)
        setMaxLimit(false)
      } else {
        setLimit(filteredProducts.length)
        setMaxLimit(true)
      }
    } else {
      setLimit(filteredProducts.length)
      setMaxLimit(true)
    }
  }

  function filterByProperties(value) {
    setSelectedFilter(value)
    const filteredProducts = products.filter(product => {
      const variants = _.find(product.variants, function (o) {
        if (o.name == value) {
          product.main_image = o.image_list[0].image // replaces the main image with variant image
          return o
        }
      })
      return variants
    })

    setProducts(filteredProducts)
    sortLimit(filteredProducts)
  }

  return (
    <div className={Styles.slideMenu}>
      <div className="">
        <button
          className={Styles.CloseSlider}
          onClick={() => setFilterToggle(false)}
        >
          X
        </button>
        <Link href="/search/">
          <button aria-label="Search" className={Styles.OptionsTitle}>
            Search for products{' '}
            <FontAwesomeIcon className={Styles.SearchIcon} icon={faSearch} />
          </button>
        </Link>
        <button
          className={Styles.OptionsTitle}
          onClick={() => setDropDownToggle(!dropDownToggle)}
        >
          Product Categories
        </button>
        <div
          className={Styles.Options}
          style={dropDownToggle ? {display: 'flex'} : {display: 'none'}}
        >
          {TOP_PRODUCT_FILTERS.map((item, index) => (
            <button key={index} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="">
        <button
          className={Styles.OptionsTitle}
          onClick={() => setSpfDropDownToggle(!spfDropDownToggle)}
        >
          Filter By SPF
        </button>
        <div
          className={Styles.SPFOptions}
          style={spfDropDownToggle ? {display: 'flex'} : {display: 'none'}}
        >
          <button onClick={() => filterByProperties('SPF 10')}>10</button>
          <button onClick={() => filterByProperties('SPF 15')}>15</button>
          <button onClick={() => filterByProperties('SPF 30')}>30</button>
          <button onClick={() => filterByProperties('SPF 40')}>40</button>
          <button onClick={() => filterByProperties('SPF 50')}>50+</button>
        </div>
      </div>
      <div className="">
        <button
          className={Styles.OptionsTitle}
          onClick={() =>
            setProductsToShowDropDownToggle(!productsToShowDropDownToggle)
          }
        >
          Products to Show
        </button>
        <div
          className={Styles.Options}
          style={
            productsToShowDropDownToggle ? {display: 'flex'} : {display: 'none'}
          }
        >
          <button onClick={() => setLimit(parseInt('10'))}>10</button>
          <button onClick={() => setLimit(parseInt('15'))}>15</button>
          <button onClick={() => setLimit(parseInt('20'))}>20</button>
          <button onClick={() => setLimit(parseInt('40'))}>40</button>
        </div>
      </div>
      <button
        className={Styles.ApplyFilter}
        onClick={() => setFilterToggle(false)}
      >
        Apply Filter
      </button>
    </div>
  )
}
