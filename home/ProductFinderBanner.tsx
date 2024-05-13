import * as React from 'react'

import {Box, Container} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import {SlidesType} from 'types'

interface PropsType {
  banner: SlidesType
}

export function ProductFinderBanner(props: PropsType) {
  const {banner} = props

  const [imgSrc, setImgSrc] = React.useState<string>(banner.sm_image)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const setProperImageSrc = (containerWidth: number) => {
    if (containerWidth < 600) {
      setImgSrc(banner.sm_image)
    } else if (containerWidth < 900) {
      setImgSrc(banner.md_image)
    } else {
      setImgSrc(banner.lg_image)
    }
  }

  React.useEffect(() => {
    if (containerRef.current) {
      setProperImageSrc(containerRef.current.clientWidth)
    }
    if (window) {
      window.addEventListener('resize', () => {
        if (containerRef.current) {
          setProperImageSrc(containerRef.current.clientWidth)
        }
      })
    }
  }, [])

  return (
    <Container ref={containerRef} sx={{mb: '40px'}}>
      <Box
        sx={{
          position: 'relative',
          height: {xs: 250, sm: 135},

          cursor: 'pointer',
          '& img': {
            objectFit: 'cover',
          },
        }}
      >
        <Link href="/product-finder">
          <Image
            alt="Product finder"
            fill
            sizes="(max-width: 600px) 90vw, 33vw"
            src={imgSrc}
            style={{objectFit: 'contain'}}
          />
        </Link>
      </Box>
    </Container>
  )
}
