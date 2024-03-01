import * as React from 'react'

import {Box, Typography} from '@mui/material'

import {useRouter} from 'next/router'
import Image from 'next/image'

import {ShowPrice} from 'sharedComponents'
import {AddToBasketWithDropDown, StarRating} from 'components/products'

export default function BestSellerItems(props) {
  const i = props.item.item
  const router = useRouter()
  const [showButton, setShowButton] = React.useState(false)
  const [activeVariant, setActiveVariant] = React.useState(i.variants[0])
  const showBox = () => setShowButton(!showButton)

  return (
    <Box
      key={i.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box
        onClick={e => {
          e.preventDefault()
          router.push(`/products/${i.slug}`)
        }}
        onMouseEnter={showBox}
        onMouseLeave={showBox}
        sx={{display: 'flex', flexDirection: 'column', gap: 2}}
      >
        <Box
          sx={{
            background:
              'linear-gradient(180deg, #FAF5EB 0%, rgba(250, 245, 235, 0.00) 100%)',
            width: '100%',
            borderRadius: '10px',
            height: {xs: 300, msm: 365},
            margin: '0 auto',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <Image
            alt={activeVariant.image_list[0].alternate_text || ''}
            fill
            loading="eager"
            sizes="(max-width: 900px) 50vw, 20vw"
            src={
              showButton
                ? i.secondary_image_resized || ''
                : activeVariant.image_list[0].image || ''
            }
            style={{objectFit: showButton ? 'cover' : 'contain'}}
          />
        </Box>

        <Typography
          fontSize={{xs: 13, msm: 16}}
          fontWeight={600}
          sx={{
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 2 /* Number of lines to show */,
            textOverflow: 'ellipsis',
            lineHeight: '1.7rem',
          }}
        >
          {i.name}
        </Typography>
        <Typography fontSize={13} fontWeight={400}>
          {i.sub_title} {activeVariant.name}
        </Typography>
      </Box>
      <Box>
        <StarRating name={i.name} score={i.review_average_score} />
        <ShowPrice selectedVariant={activeVariant} />
        <AddToBasketWithDropDown
          activeVariant={activeVariant}
          product={i}
          setActiveVariant={setActiveVariant}
        />
      </Box>
    </Box>
  )
}
