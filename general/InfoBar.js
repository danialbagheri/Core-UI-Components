import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Libraries ------------------------------- */
import Slider from 'react-slick'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import TopBar from './topbar'
import {assetsEndPoints, hideHeaderLogoOrInfoState} from 'utils'
import {AppContext} from '../appProvider'
import {ApiSvgIcon} from '../shared'
/* -------------------------------------------------------------------------- */

/* -------------------------------- CSS Files ------------------------------- */
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
/* -------------------------------------------------------------------------- */

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

export default function InfoBar() {
  const [appState] = React.useContext(AppContext)
  const theme = useTheme()
  const router = useRouter()

  const appBarItems = appState.icons?.[assetsEndPoints.infoBar]?.items
  const {hideInfoBar} = hideHeaderLogoOrInfoState(router)

  const infoBarItems = appBarItems?.map(item => {
    return (
      <Box
        className="info-bar-item"
        key={item.id}
        sx={{
          alignItems: 'center',
          display: {xs: hideInfoBar ? 'none' : 'block', md: 'block'},
        }}
      >
        <ApiSvgIcon
          className="centralize"
          htmlContent={item.svg_icon_text}
          sx={{width: 18, height: 18, fill: theme.palette.primary.main}}
        />
        <Typography className="text-centre">{item.name}</Typography>
      </Box>
    )
  })

  return (
    <Box
      sx={{
        display: {xs: hideInfoBar ? 'none' : 'block', md: 'block'},
      }}
    >
      <TopBar />
      <Box
        className="info-bar"
        sx={{
          backgroundColor: theme.palette.sand.main,
          padding: '10px 0',

          height: 43,

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
