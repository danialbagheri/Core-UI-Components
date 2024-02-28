import * as React from 'react'

/* ---------------------------- Nextjs Components --------------------------- */
import Image from 'next/image'
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ------------------------- Material UI components ------------------------- */
import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import {Skeleton} from '@mui/material'
/* -------------------------------------------------------------------------- */

function TrendingItem({item = {}, loading}) {
  const {
    main_image,
    name,
    secondary_image,
    sub_title,
    review_average_score,
    lowest_variant_price,
    slug,
  } = item

  const [imageSrc, setImageSrc] = React.useState(main_image)

  const router = useRouter()

  const mouseHoverHandler = (e, state) => {
    e.preventDefault()
    switch (state) {
      case 'enter':
        setImageSrc(secondary_image)
        break
      case 'leave':
        setImageSrc(main_image)
        break
      default:
        setImageSrc(main_image)
    }
  }

  const clickHandler = e => {
    e.preventDefault()
    router.push(`/products/${slug}`)
  }

  return (
    <Box
      onClick={e => clickHandler(e)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 4,
        width: {xs: '150px', sm: '240px', lg: '260px'},
        margin: '0 auto',

        cursor: 'pointer',
      }}
    >
      <Box
        onMouseEnter={e => mouseHoverHandler(e, 'enter')}
        onMouseLeave={e => mouseHoverHandler(e, 'leave')}
        sx={{
          position: 'relative',

          width: {xs: '150px', sm: '240px', lg: '260px'},
          height: {xs: '230px', sm: '360px', lg: '400px'},

          borderRadius: 1,

          overflow: 'hidden',

          backgroundColor: '#E7EBEE',
        }}
      >
        {loading ? (
          <Skeleton height="100%" variant="rectangular" width="100%" />
        ) : (
          <Image
            alt={name}
            fill
            objectFit="cover"
            sizes="(max-width: 600px) 50vw,  33vw"
            src={imageSrc || ''}
          />
        )}
      </Box>

      {loading ? (
        <Skeleton width="100%" />
      ) : (
        <Box>
          <Typography variant={'h4'}>{name}</Typography>
          <Typography mt={1}>{sub_title}</Typography>
        </Box>
      )}

      {loading ? (
        <Skeleton width="80%" />
      ) : (
        <Typography className="trending-box-price">
          From £{lowest_variant_price}
        </Typography>
      )}
      {loading ? (
        <Skeleton width="50%" />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Rating
            defaultValue={Number(review_average_score)}
            name="size-medium"
            precision={0.5}
            readOnly
          />
          <Typography>{review_average_score}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default TrendingItem
