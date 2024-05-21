import * as React from 'react'

import {Box, Skeleton, Typography} from '@mui/material'

import Slider from 'react-slick'

import {CollectionType} from 'types'
import {getBestSellerResults} from 'services'
import {ProductItem} from 'components/products'

const settings = {
  slidesToShow: 2,
  arrows: true,
  dots: false,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: 3500,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const ProductItemSkeleton = () => {
  return (
    <Box>
      <Skeleton
        height={300}
        sx={{borderRadius: 1}}
        variant="rectangular"
        width={240}
      />
      <Skeleton variant="text" width={240} />
      <Skeleton variant="text" width={240} />
      <Skeleton variant="text" width={240} />
    </Box>
  )
}

export default function BestSellerSlider() {
  const [topSeller, setTopSeller] = React.useState<CollectionType | null>(null)

  const [loading, setLoading] = React.useState(true)

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
    <Box sx={{px: 4, maxWidth: 1600, margin: '0 auto', mt: 5, mb: 15}}>
      <Typography color="earth.main" sx={{mb: 4}} variant="h3">
        {topSeller?.name}
      </Typography>

      {loading ? (
        <Box sx={{display: 'flex', gap: 5, flexWrap: 'wrap'}}>
          <ProductItemSkeleton />
          <ProductItemSkeleton />
          <ProductItemSkeleton />
        </Box>
      ) : (
        <Slider {...settings}>
          {topSeller?.items?.map((item, index) => (
            <ProductItem key={index} product={item.item} sx={{m: '0 auto'}} />
          ))}
        </Slider>
      )}
    </Box>
  )
}
