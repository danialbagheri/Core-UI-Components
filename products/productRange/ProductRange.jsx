import * as React from 'react'

import {Box, CircularProgress} from '@mui/material'

import {ProductItem} from '../ProductItem'
import Image from 'next/image'
import Link from 'next/link'

const COLUMN_MAX_WIDTH = 240
const COLUMN_GAP = 12

export default function ProductRange(props) {
  const {products, limit, banner} = props

  console.log('🚀 🙂  banner:::', banner)

  const [bannerSpecs, setBannerSpecs] = React.useState({
    columnsCount: 2,
    bannerHeight: 212,
    bannerSrc: banner.mobile,
  })
  const productsContainer = React.useRef(null)

  const columnCountHandler = container => {
    const containerWidth =
      container.current?.getBoundingClientRect().width ?? 1000
    const columnWidth = COLUMN_MAX_WIDTH + COLUMN_GAP
    const columnsCount =
      containerWidth / columnWidth > 2
        ? Math.floor(containerWidth / columnWidth)
        : 2
    const bannerHeight = columnsCount > 2 ? 113 : 212
    let bannerSrc = banner.mobile
    if (columnsCount > 3) {
      bannerSrc = banner.lg
    } else if (columnsCount === 3) {
      bannerSrc = banner.md
    }

    setBannerSpecs({columnsCount, bannerHeight, bannerSrc})
  }

  React.useEffect(() => {
    window.addEventListener('resize', () =>
      columnCountHandler(productsContainer),
    )
    columnCountHandler(productsContainer)
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
        py: 12,
      }}
    >
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
            .slice(0, limit)
            .sort(function (a) {
              if (a.collection_names[0] === 'New') {
                return -1
              }
              return 0
            })
            .map(product => (
              <>
                <ProductItem key={product.id} product={product} />
              </>
            ))}
        </>
      )}
      <Box
        sx={{
          position: 'relative',
          height: bannerSpecs.bannerHeight,
          gridColumn: `1 / span ${bannerSpecs.columnsCount}`, // Ensure the image spans across all columns
          gridRow: '3',
          cursor: 'pointer',
        }}
      >
        <Link href="/product-finder">
          <Image
            alt="Product finder"
            fill
            src={bannerSpecs?.bannerSrc || ''}
            style={{objectFit: 'cover'}}
          />
        </Link>
      </Box>
    </Box>
  )
}
