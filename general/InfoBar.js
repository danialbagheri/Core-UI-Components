import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Libraries ------------------------------- */
import Slider from 'react-slick'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography, useTheme} from '@mui/material'
import Place from '@mui/icons-material/Place'
import LocalShipping from '@mui/icons-material/LocalShipping'
import Star from '@mui/icons-material/Star'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import TopBar from './topbar'
import {getInfoBarStatus} from '../../services'
import {hideHeaderLogoOrInfoState} from 'utils'
/* -------------------------------------------------------------------------- */

/* -------------------------------- CSS Files ------------------------------- */
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
/* -------------------------------------------------------------------------- */

export default function InfoBar() {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const theme = useTheme()
  const router = useRouter()
  const {hideInfoBar} = hideHeaderLogoOrInfoState(router)

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    vertical: false,
    verticalSwiping: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 1500,
        },
      },
    ],
  }

  //TO DO::: We should import icons from backend
  const icons = [
    <Place color="primary" key={1} />,
    <LocalShipping color="primary" key={2} />,
    <Star color="primary" key={3} />,
  ]

  //@Danial::: It gets 404 in Cabana on this API call
  React.useEffect(() => {
    getInfoBarStatus()
      .then(res => {
        setItems(res.items)
        setIsLoaded(true)
      })
      .catch(err => console.error(err))
  }, [])

  if (isLoaded) {
    const infoBarItems = items.map((item, i) => {
      return (
        <Box
          className="info-bar-item"
          key={item.id}
          sx={{
            alignItems: 'center',
            display: {xs: hideInfoBar ? 'none' : 'block', md: 'block'},
          }}
        >
          <Box className="info-bar-icon">{icons[i]}</Box>
          <Typography className="text-centre">{item.text}</Typography>
        </Box>
      )
    })
    return (
      <Box sx={{display: {xs: hideInfoBar ? 'none' : 'block', md: 'block'}}}>
        <TopBar />
        <Box
          className="info-bar"
          sx={{
            backgroundColor: theme.palette.sand.main,
            padding: '10px 0',

            '& .slick-track': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          <Slider {...settings}>{infoBarItems}</Slider>
        </Box>
      </Box>
    )
  }
  return null
}
