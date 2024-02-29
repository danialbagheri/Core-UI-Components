import * as React from 'react'

import {Box} from '@mui/material'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'loaders.css/loaders.min.css'

import {TrendingItem} from './trendingItem'
import {getTrendingUrls} from 'services'

const settings = {
  slidesToShow: 5,
  arrows: true,
  dots: false,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: 350,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 599,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
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
    <Box sx={{maxWidth: 'min(1400px , 90%)', margin: '0 auto', mt: '5rem'}}>
      <h1>Trending</h1>

      {loading ? (
        <Box className="centralize" sx={{width: {xs: '100%', md: '60%'}}}>
          <TrendingItem key={'1'} loading />
          <TrendingItem key={'2'} loading />
        </Box>
      ) : (
        <Slider {...settings}>
          {topSeller?.map(({item}) => (
            <TrendingItem item={{...item}} key={item?.id} />
          ))}
        </Slider>
      )}
    </Box>
  )
}
