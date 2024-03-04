import * as React from 'react'

import {Box, Typography} from '@mui/material'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'loaders.css/loaders.min.css'

import {ProductItem} from '../../products/ProductItem'
import {getTrendingUrls} from 'services'
import {TrendingItem} from './trendingItem'

const settings = {
  slidesToShow: 6,
  arrows: true,
  dots: false,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

export default function Trending() {
  const [topSeller, setTopSeller] = React.useState([])

  const [loading, setLoading] = React.useState(true)

  const getTrendingHandler = async () => {
    try {
      const response = await getTrendingUrls()
      setTopSeller(response.items)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getTrendingHandler()
  }, [])

  return (
    <Box sx={{px: 4}}>
      <Typography color="earth.main" sx={{mb: 4}} variant="h3">
        Trending
      </Typography>

      {loading ? (
        <Box className="centralize" sx={{width: {xs: '100%', md: '60%'}}}>
          <TrendingItem key={'1'} loading />
          <TrendingItem key={'2'} loading />
        </Box>
      ) : (
        <Slider {...settings}>
          {topSeller.map(({item}) => (
            <ProductItem key={item.item.id} product={item.item} />
          ))}
        </Slider>
      )}
    </Box>
  )
}
