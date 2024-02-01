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
import {AppContext} from '../appProvider'
import {
  assetsEndPoints,
  FREE_DELIVERY_ICON_ID,
  MADE_IN_UK_ICON_ID,
  STAR_RATE_ICON_ID,
} from '../../utils'
import {ApiSvgIcon} from '../shared'
/* -------------------------------------------------------------------------- */

export default function InfoBar() {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const [appState] = React.useContext(AppContext)

  const apiIcons = appState.icons?.[assetsEndPoints.infoBar]?.items
  const madeInUkIcon = apiIcons?.find(
    icon => icon.id === MADE_IN_UK_ICON_ID,
  )?.svg_icon_text
  const freeDeliveryIcon = apiIcons?.find(
    icon => icon.id === FREE_DELIVERY_ICON_ID,
  )?.svg_icon_text
  const starRateIcon = apiIcons?.find(
    icon => icon.id === STAR_RATE_ICON_ID,
  )?.svg_icon_text

  const iconsHtml = [madeInUkIcon, freeDeliveryIcon, starRateIcon]

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
          <ApiSvgIcon
            className="centralize"
            htmlContent={iconsHtml[i]}
            sx={{fill: theme.palette.primary.main, width: 23, height: 23}}
          />
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
