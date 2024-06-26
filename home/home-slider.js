import {useEffect, useState} from 'react'

import Image from 'next/image'
import {useRouter} from 'next/router'

import {Box, Skeleton} from '@mui/material'

import Slider from 'react-slick'

import {getCollectionBanner} from 'services'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const height = {xs: 350, ssm: 450, msm: 300, sm: 350, md: 400}
const settings = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 500,
  lazyLoad: 'progressive',
  slidesToScroll: 1,
  dotsClass: 'dot',
}

const SliderItem = slide => {
  const [imgSrc, setImgSrc] = useState('xl_image')
  const router = useRouter()

  useEffect(() => {
    if (window) {
      const imgSrcHandler = () => {
        const windowWidth = window.innerWidth
        if (windowWidth < 400) {
          setImgSrc('xs_image')
          return
        } else if (windowWidth < 500) {
          setImgSrc('sm_image')
          return
        } else if (windowWidth < 750) {
          setImgSrc('md_image')
          return
        } else if (windowWidth < 1200) {
          setImgSrc('lg_image')
          return
        }
        setImgSrc('xl_image')
      }

      imgSrcHandler()
      window.addEventListener('resize', imgSrcHandler)
    }
  }, [])

  const clickHandler = () => {
    router.push(slide.slide.slide.link || '/about')
  }

  if (slide.slide.custom_slide) {
    return (
      <Box onClick={clickHandler}>
        <div
          dangerouslySetInnerHTML={{__html: slide.slide.custom_code}}
          itemProp="articleBody"
        />
      </Box>
    )
  }

  return (
    <Box
      index={slide.id}
      onClick={clickHandler}
      sx={{
        position: 'relative',
        height,
        cursor: 'pointer',
      }}
    >
      <Image
        alt={slide.slide.image_alt_text}
        fill
        lazy
        sizes="100vw"
        src={slide.slide[imgSrc]}
        style={{objectFit: 'cover'}}
      />
    </Box>
  )
}

export default function HomeSlider(props) {
  const {banner} = props

  const isHomeBanner = Boolean(banner)
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)

  const renderProperBanner = () => {
    if (isHomeBanner) {
      return (
        <Slider {...settings}>
          {banner?.map(slide => (
            <SliderItem key={slide.id} slide={slide} />
          ))}
        </Slider>
      )
    }
    if (loading) {
      return <Skeleton sx={{height}} variant="rectangular" width="100%" />
    }
    return (
      <Slider {...settings}>
        {slides.map(slide => (
          <SliderItem key={slide.id} slide={slide} />
        ))}
      </Slider>
    )
  }

  const getBannerHandler = async () => {
    try {
      const response = await getCollectionBanner('secondary')

      setSlides(response.results[0]?.slides)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!banner) {
      getBannerHandler()
    }
  }, [])

  return (
    <Box
      sx={{
        height,
        mt: isHomeBanner ? 0 : '5rem',
        '& button.slick-arrow': {
          display: 'none !important',
        },
      }}
    >
      {renderProperBanner()}
    </Box>
  )
}
