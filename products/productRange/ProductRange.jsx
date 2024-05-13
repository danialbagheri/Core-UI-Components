import * as React from 'react'

import _ from 'lodash'

/* ---------------------------- NextJs Components --------------------------- */
import Link from 'next/link'
import Image from 'next/image'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, CircularProgress} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {ProductItem} from '../ProductItem'
import {productFinderBannerSrcHandler} from 'utils'

/* -------------------------------------------------------------------------- */

const COLUMN_MAX_WIDTH = 240
const COLUMN_GAP = 12

export default function ProductRange(props) {
  const {banner, videoBanner, category} = props
  const productFinderBanner = productFinderBannerSrcHandler(banner)
  const [bannerSpecs, setBannerSpecs] = React.useState({
    columnsCount: 2,
    gridRow: 4,
    bannerHeight: 212,
    bannerSrc: productFinderBanner?.mobile,
  })
  const [initialized, setInitialized] = React.useState(false)
  const productsContainer = React.useRef(null)

  const videoCode = videoBanner?.[0]?.slides?.[0]?.slide?.custom_code
  const WEBSITE = process.env.NEXT_PUBLIC_WEBSITE
  const isCalypsoWebsite = WEBSITE === 'calypso'

  //This is to calculate the count of product columns and rows in order to set the banner's width.
  //and row
  const gridContainerSpecsHandler = (container, window) => {
    if (window && container.current) {
      const gridStyles = window?.getComputedStyle(container.current)
      const gridWidth = container.current?.clientWidth ?? 1000
      const gridHeight = container.current?.clientHeight ?? 1000

      // Calculate height and width of each element
      const gridRowHeight =
        parseInt(gridStyles.getPropertyValue('grid-auto-rows'), 10) ||
        parseInt(gridStyles.getPropertyValue('grid-template-rows'), 10)
      const gridColumnWidth =
        parseInt(gridStyles.getPropertyValue('grid-auto-columns'), 10) ||
        parseInt(gridStyles.getPropertyValue('grid-template-columns'), 10)

      //Get row gaps
      const gridRowGap = parseInt(gridStyles.getPropertyValue('row-gap'), 10)
      const gridColumnGap = parseInt(
        gridStyles.getPropertyValue('column-gap'),
        10,
      )

      const columnWidth = gridColumnWidth + gridColumnGap
      const rowHeight = gridRowHeight + gridRowGap

      const rowsCount = Math.floor(gridHeight / rowHeight)
      const gridRow = rowsCount < 3 ? rowsCount + 1 : 4

      const columnsCount =
        gridWidth / columnWidth > 2 ? Math.floor(gridWidth / columnWidth) : 2

      const bannerHeight = columnsCount > 2 ? 113 : 212

      //Set proper source of banner based on the columns counts
      let bannerSrc = productFinderBanner?.mobile
      if (columnsCount > 3) {
        bannerSrc = productFinderBanner?.lg
      } else if (columnsCount === 3) {
        bannerSrc = productFinderBanner?.md
      }

      setBannerSpecs({columnsCount, bannerHeight, bannerSrc, gridRow})
    }
  }

  const products = _.orderBy(
    // checks if product is in multiple collections meaning it's more popular than others
    props.products,
    [item => item.types[0].id, item => item.collection_names.length],
    ['asc', 'desc'],
  )

  /**
   *
   * @param {any} window
   * As nextJs works SSR, it is used inside useEffect function so after
   * initializing window object, the video will be rendered
   */
  const initializeWindowsHandler = window => {
    if (typeof window !== 'undefined') {
      setInitialized(true)
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', () =>
      gridContainerSpecsHandler(productsContainer, window),
    )
    gridContainerSpecsHandler(productsContainer, window)

    initializeWindowsHandler(window)
  }, [])

  return (
    <Box
      ref={productsContainer}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(2, minmax(160px, ${COLUMN_MAX_WIDTH}px))`,
          md: `repeat(auto-fit, minmax(180px, ${COLUMN_MAX_WIDTH}px))`,
        },
        gridTemplateRows: 'auto',
        rowGap: 12,
        columnGap: `${COLUMN_GAP}px`,
        justifyContent: 'center',
        pt: 12,
        pb: 40,
      }}
    >
      {/* ------------------------------ Video Banner ------------------------------ */}
      {initialized && category ? (
        <Box
          dangerouslySetInnerHTML={{
            __html: videoCode,
          }}
          id="product_page_video"
          sx={{
            gridColumn: `1 / span ${bannerSpecs.columnsCount}`,
            gridRow: 1,
            marginBottom: '-30px',
          }}
        />
      ) : null}

      {/* -------------------------------------------------------------------------- */}
      {products.length < 1 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {products
            .sort(function (a) {
              if (a.collection_names.includes('New')) {
                return -1
              }
              return 0
            })
            .map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
        </>
      )}
      {/* -------------------------- Product finder Banner ------------------------- */}
      {isCalypsoWebsite ? (
        <Box
          sx={{
            position: 'relative',
            height: {xs: 150, msm: bannerSpecs.bannerHeight},
            gridColumn: `1 / span ${bannerSpecs.columnsCount}`, // Ensure the image spans across all columns
            gridRow: bannerSpecs.gridRow,
            cursor: 'pointer',
            '& img': {
              objectFit: {xs: 'contain', msm: 'cover'},
            },
          }}
        >
          <Link href="/product-finder">
            <Image
              alt="Product finder"
              fill
              sizes="100vw"
              src={bannerSpecs?.bannerSrc || ''}
            />
          </Link>
        </Box>
      ) : null}
      {/* -------------------------------------------------------------------------- */}
    </Box>
  )
}
