import * as React from 'react'
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
/* -------------------------------------------------------------------------- */

/* -------------------------------- CSS Files ------------------------------- */
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
/* -------------------------------------------------------------------------- */

export default function InfoBar() {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const theme = useTheme()

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
          // centerMode: true,
          // vertical: true,
          // verticalSwiping: true,
        },
      },
    ],
  }

  //TO DO::: We should import icons from backend
  const icons = [<Place key={1} />, <LocalShipping key={2} />, <Star key={3} />]

  //@Danial::: It gets 404 on this API call
  React.useEffect(() => {
    getInfoBarStatus()
      .then(res => {
        setItems(res[0].items)
        setIsLoaded(true)
      })
      .catch(err => console.error(err))
  }, [])

  if (isLoaded) {
    const infoBarItems = items.map((item, i) => {
      const ItemIcon = icons[i]
      return (
        <Box
          className="info-bar-item"
          key={item.id}
          sx={{alignItems: 'center'}}
        >
          <Box className="info-bar-icon">
            <ItemIcon color="primary" />
          </Box>
          <Typography className="text-centre">{item.text}</Typography>
        </Box>
      )
    })
    return (
      <>
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
      </>
    )
  }
  return null
}
