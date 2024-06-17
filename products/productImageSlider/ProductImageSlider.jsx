import {Box} from '@mui/material'
import Image from 'next/image'
import Slider from 'react-slick'

function ProductImageSlider(props) {
  const {selectedVariant} = props

  const onZoom = e => {
    const parentNode = e.target.parentNode.parentNode.parentNode.parentNode

    const x = 0.5 * e.clientX - e.target.offsetLeft
    const y = 0.8 * e.clientY - e.target.offsetTop

    parentNode.style.transformOrigin = `${x}px ${y}px`
    parentNode.style.transform = 'scale(2)'
  }

  const offZoom = e => {
    const parentNode = e.target.parentNode.parentNode.parentNode.parentNode

    parentNode.style.transform = 'scale(1)'
    parentNode.style.transformOrigin = 'center center'
  }

  const settings = {
    customPaging: function (i) {
      return (
        <Image
          alt={selectedVariant.image_list[i]?.alternate_text}
          fill={true}
          sizes="100vw"
          src={selectedVariant.image_list[i]?.image}
          style={{objectFit: 'cover'}}
        />
      )
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Box
      sx={{
        position: 'relative',
        top: {xs: 0, md: 0},
        overflow: 'scroll',

        paddingRight:
          '17px' /* Increase/decrease this value for cross-browser compatibility */,
        boxSizing: 'content-box',

        '&::-webkit-scrollbar ': {
          display: 'none',
        },

        msOverflowStyle: 'none',
        scrollbarWidth: 'none',

        '& .slick-arrow': {
          top: '40%',
          display: 'none !important',
        },

        '& .slick-arrow:before': {
          display: 'none !important',
        },

        '&>.slick-initialized>ul': {
          position: 'relative',
          bottom: 0,
          display: 'flex !important',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mb: 2,

          '&>.slick-active': {
            boxShadow: ' 0 0 0 2px #ff6b00',
            borderColor: 'transparent',
          },
          li: {
            position: 'relative',
            width: 66,
            height: 84,
            border: '2px solid transparent',
            borderRadius: '10%',
            overflow: 'hidden',
            mt: 5,
          },
        },
      }}
    >
      <Slider {...settings}>
        {selectedVariant.image_list.map((img, i) => {
          const isGif = img.image.includes('.gif')
          return (
            <Box key={i}>
              <Box
                sx={{
                  width: '100%',
                  position: 'relative',
                  height: {xs: 450, md: 722},
                }}
              >
                <Image
                  alt={img.alternate_text}
                  fill
                  onMouseLeave={isGif ? null : offZoom}
                  onMouseMove={isGif ? null : onZoom}
                  onMouseOver={isGif ? null : onZoom}
                  sizes="100vw"
                  src={img.image}
                  style={{
                    objectFit: isGif ? 'cover' : 'contain',
                  }}
                />
              </Box>
            </Box>
          )
        })}
      </Slider>
    </Box>
  )
}

export default ProductImageSlider
