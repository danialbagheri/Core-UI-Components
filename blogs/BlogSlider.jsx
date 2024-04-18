import * as React from 'react'

import {Box, Container, Typography} from '@mui/material'
import {getBlogs} from 'services'
import Slider from 'react-slick'
import BlogCard from './BlogCard'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function BlogSlider() {
  const BLOG = 'staff-picked'
  const [, setLoading] = React.useState(true)
  const [blogItems, setBlogItems] = React.useState([])
  const [, setError] = React.useState('')
  const sliderContainer = React.useRef()

  const settings = {
    className: 'center',
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    centerMode: false,
    swipeToSlide: true,
    centerPadding: 20,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: 0,
        },
      },
    ],
  }

  React.useEffect(() => {
    getBlogs(BLOG)
      .then(response => {
        setBlogItems(response.items)
        setLoading(false)
      })
      .catch(err => {
        if (err) {
          setError(err)
        } else {
          setError('Something went wrong with loading data')
        }
      })
  }, [])

  return (
    <Container>
      <Box>
        <Typography color="earth.main" variant="h3">
          Editor&#39;s picks
        </Typography>

        <Box
          ref={sliderContainer}
          sx={{
            margin: '50px auto',
            mb: '100px',
          }}
        >
          {blogItems.length ? (
            <Slider {...settings}>
              {blogItems.map((blogItem, i) => (
                <Box
                  className="centralize"
                  key={blogItem.item.id}
                  sx={{display: 'flex !important'}}
                >
                  <BlogCard blog={blogItem.item} index={i} />
                </Box>
              ))}
            </Slider>
          ) : null}
        </Box>
      </Box>
    </Container>
  )
}

export default BlogSlider
