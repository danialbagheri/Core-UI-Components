import * as React from 'react'

import {Box, Typography} from '@mui/material'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'loaders.css/loaders.min.css'

import {ProductItem} from '../../products/ProductItem'

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

export default function Trending(props) {
  const {items, name} = props

  return (
    <Box sx={{px: 4, maxWidth: 1600, margin: '0 auto', mt: 5}}>
      <Typography color="earth.main" sx={{mb: 4}} variant="h3">
        {name || 'Trending'}
      </Typography>

      <Slider {...settings}>
        {items?.map(item => (
          <ProductItem
            key={item.item?.id}
            product={item.item}
            sx={{m: '0 auto'}}
          />
        ))}
      </Slider>
    </Box>
  )
}
