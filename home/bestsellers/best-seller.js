import * as React from 'react'

import Link from 'next/link'

import {Box, Skeleton, Typography} from '@mui/material'
// import BestSellerItems from './BestSellerItems'
import {ProductItem} from '../../products/ProductItem'
import {getBestSellerResults} from 'services'

const LoadingItem = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      <Skeleton height={400} variant="rectangular" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="70%" />
    </Box>
  )
}

export default function BestSeller() {
  const [topSeller, setTopSeller] = React.useState({})

  const [loading, setLoading] = React.useState(true)

  const hasBanner = topSeller.slider?.slides?.length > 0

  const getTopSellerHandler = async () => {
    try {
      const response = await getBestSellerResults()
      setTopSeller(response)
    } catch (error) {
      console.error('Error in getTopSellerHandler', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getTopSellerHandler()
  }, [])

  return (
    <Box
      sx={{
        maxWidth: '1600px',
        margin: '0 auto',
        mt: 10,
        mb: {xs: 10, sm: 20, my: 7},
        p: 5,
      }}
    >
      <Typography color="earth.main" sx={{textAlign: 'left'}} variant="h3">
        Top Seller products
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 5,
          flexDirection: {xs: 'column', lg: 'row'},
          mt: 5,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: hasBanner || loading ? 'block' : 'none',
          }}
        >
          {hasBanner && !loading ? (
            <Box className="banner">
              <Link
                href={
                  topSeller.slider.slides[0].link
                    ? topSeller.slider.slides[0].link
                    : '#'
                }
              >
                <picture>
                  <source
                    media="(min-width: 1536px)"
                    srcSet={topSeller.slider.slides[0].xl_image}
                    type="image/png"
                  />
                  <source
                    media="(min-width: 1200px)"
                    srcSet={topSeller.slider.slides[0].lg_image}
                    type="image/png"
                    width="1536"
                  />
                  <source
                    media="(min-width: 900px)"
                    srcSet={topSeller.slider.slides[0].md_image}
                    type="image/png"
                    width="1200"
                  />
                  <source
                    media="(min-width: 600px)"
                    srcSet={topSeller.slider.slides[0].sm_image}
                    type="image/png"
                    width="900"
                  />
                  <source
                    media="(min-width: 0px)"
                    srcSet={topSeller.slider.slides[0].xs_image}
                    type="image/png"
                    width="600"
                  />
                  <img
                    alt={topSeller.slider.slides[0].image_alt_text}
                    className="hero-image"
                    src={topSeller.slider.slides[0].md_image}
                  />
                </picture>
              </Link>
            </Box>
          ) : null}

          {loading ? (
            <Skeleton height="100%" variant="rectangular" width="100%" />
          ) : null}
        </Box>
        <Box
          sx={{
            width: '100%',

            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridTemplateRows: 'auto',
            rowGap: {xs: 20, md: 20, xl: 30},
            columnGap: 10,
          }}
        >
          {loading
            ? Array.from({length: 4}).map((_, index) => (
                <LoadingItem key={index} />
              ))
            : topSeller.items
                ?.slice(0, 6)
                .map((item, index) => (
                  <ProductItem
                    key={index}
                    product={item.item}
                    sx={{m: '0 auto', maxWidth: 'min(100% , 240px)'}}
                  />
                ))}
        </Box>
      </Box>
    </Box>
  )
}
