import Slider from 'react-slick'
import Skeleton from '@mui/material/Skeleton'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {Box} from '@mui/material'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'

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
        height: {xs: 350, ssm: 450, msm: 300, sm: 350, md: 400},
        cursor: 'pointer',
      }}
    >
      <Image
        alt={slide.slide.image_alt_text}
        fill
        src={slide.slide[imgSrc]}
        style={{objectFit: 'cover'}}
      />
    </Box>
  )
}

export default function HomeSlider({second, slides}) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: 'progressive',
    slidesToScroll: 1,
    dotsClass: 'dot',
  }
  if (slides.length == 0) {
    return <Skeleton height={400} variant="rectangular" width={'100%'} />
  }
  return (
    <Box
      sx={{
        mt: second ? '5rem' : 0,
        '& button.slick-arrow': {
          display: 'none !important',
        },
      }}
    >
      <Slider {...settings}>
        {slides[0]?.slider_slides.map(slide => (
          <SliderItem key={slide.id} slide={slide} />
        ))}
      </Slider>
    </Box>
  )
}
