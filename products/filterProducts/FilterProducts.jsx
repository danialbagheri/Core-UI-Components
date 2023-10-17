import {useEffect, useState} from 'react'
import _ from 'lodash'

import Styles from './filterProducts.module.css'
import {useRouter} from 'next/router'
import {FilterMenu} from './FilterMenu'

export const TOP_PRODUCT_FILTERS = [
  'All',
  'Sun Protection',
  'After Sun',
  'Kids',
  'Tanning',
  'Health Care',
]

export function FilterProducts(props) {
  const router = useRouter()
  const [topProductFiltersLimit, setTopProductFiltersLimit] = useState(6)
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [category, setCategory] = useState(router.query.category || 'All')
  const [filterToggle, setFilterToggle] = useState(false)

  function filterProductsByCategory(productType) {
    setSelectedFilter(productType)
    const filteredProducts = props.products.filter(product => {
      if (productType != 'All') {
        return _.find(product.types, function (o) {
          return o == productType
        })
      }
      return props.products
    })
    props.setProducts(filteredProducts)
    props.setLimit(filteredProducts.length)
  }

  function clearAllFilters() {
    setSelectedFilter(null)
    setCategory('All')
    props.setLimit(10)
    props.setProducts(props.products)
  }
  useEffect(() => {
    filterProductsByCategory(category)
    const limit = props.limit == 0 ? 10 : props.limit
    router.push(
      `/products?limit=${limit}&category=${encodeURIComponent(category)}`,
      null,
      {
        shallow: true,
      },
    )
  }, [category])

  useEffect(() => {
    function titledCaseConvertor(category) {
      const decodedCat = decodeURIComponent(category).split(' ')
      const titledCase = decodedCat
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return titledCase
    }
    //   checks if conditions are met for category type
    function validatedCategory(category, queryCategory) {
      const titledCase = titledCaseConvertor(queryCategory)
      return !!(
        TOP_PRODUCT_FILTERS.includes(titledCase) &&
        titledCase != category &&
        typeof router.query.category == 'string'
      )
    }

    if (validatedCategory(category, router.query.category)) {
      setCategory(titledCaseConvertor(router.query.category))
    }

    if (
      typeof router.query.limit == 'number' &&
      router.query.limit != props.limit
    ) {
      props.setLimit(router.query.limit)
    }
  }, [router.asPath])

  return (
    <>
      <div className={Styles.Centralize}>
        <div className={Styles.ProductCategories}>
          {TOP_PRODUCT_FILTERS.slice(0, topProductFiltersLimit).map(
            (item, index) => (
              <button key={index} onClick={() => setCategory(item)}>
                {item}
              </button>
            ),
          )}
          {topProductFiltersLimit < TOP_PRODUCT_FILTERS.length ? (
            <button
              onClick={() =>
                setTopProductFiltersLimit(TOP_PRODUCT_FILTERS.length)
              }
            >
              Load More
            </button>
          ) : null}
        </div>
        <span>
          Showing {props.limit} of {props.products.length} results.
        </span>
      </div>
      <div className={Styles.FilterWrapper}>
        <button
          className={Styles.FilterButton}
          onClick={() => setFilterToggle(!filterToggle)}
        >
          Filter
        </button>
        {selectedFilter && selectedFilter != 'All' ? (
          <div className={Styles.SelectedFilterWrapper}>
            Selected filter{' '}
            <div className={Styles.SelectedFilter}>{selectedFilter}</div>
            <button
              className={Styles.ClearButton}
              onClick={() => clearAllFilters()}
            >
              Clear All X
            </button>
          </div>
        ) : null}
      </div>
      <div>
        {filterToggle ? (
          <>
            <FilterMenu
              limit={props.limit}
              products={props.products}
              setCategory={setCategory}
              setFilterToggle={setFilterToggle}
              setLimit={props.setLimit}
              setMaxLimit={props.setMaxLimit}
              setProducts={props.setProducts}
              setSelectedFilter={setSelectedFilter}
            />
            <div
              className={Styles.SlideMenuBackground}
              onClick={() => setFilterToggle(false)}
            ></div>
          </>
        ) : null}
      </div>
    </>
  )
}
