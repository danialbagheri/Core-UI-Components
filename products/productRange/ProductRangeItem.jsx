import * as React from 'react'

/* ----------------------------- Next Components ---------------------------- */
import Image from 'next/image'
import {useRouter} from 'next/navigation'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {StarRating} from '../StarRating'
import {AddToBasketWithDropDown} from '../detail'
import {ShowPrice} from 'sharedComponents'
/* -------------------------------------------------------------------------- */

export default function ProductRangeItem(props) {
  const {product} = props

  console.log('🚀 🙂  product:::', product)

  const router = useRouter()
  const [activeVariant, setActiveVariant] = React.useState(product.variants[0])

  const imageSrcHandler = (data, mainImage) => {
    if (data) {
      if (data.image) {
        return data.image
      } else if (mainImage) {
        return mainImage
      }
      return ''
    }
    return ''
  }

  return (
    <Box
      key={product.id}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 3,
        height: '100%',
        flexGrow: 1,
      }}
    >
      <Box
        onClick={e => {
          e.preventDefault()
          router.push(`/products/${product.slug}`)
        }}
        sx={{
          height: 369,
          background:
            'linear-gradient(180deg, #FAF5EB 0%, rgba(250, 245, 235, 0.00) 100%)',

          position: 'relative',

          pt: '26px',
          // pb: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        {product.collection_names.length > 0 ? (
          <Box
            sx={{
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: 700,
              zIndex: 2,
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'black',
              backgroundColor: '#fff',
              padding: '3px 10px',
            }}
          >
            {product.collection_names[0]}
          </Box>
        ) : null}
        <Box
          sx={{
            width: '100%',
            height: '300px',
            maxHeight: '300px',
            minHeight: '300px',
            margin: '0 auto',
            position: 'relative',
            transition: 'all 200ms',
            bgcolor: 'red',
            borderRadius: 1,
            '&:hover': {
              background:
                'linear-gradient(180deg, rgba(252,245,236,1) 100%, rgba(255,255,255,1) 100%)',
            },
          }}
        >
          <Image
            alt={product.name}
            fill
            src={imageSrcHandler(
              activeVariant.image_list[0],
              product.main_image,
            )}
            style={{objectFit: 'contain'}}
          />
        </Box>
        <Box className="centralize" gap="10px">
          <StarRating
            name={product.name}
            score={product.review_average_score}
          />
          <Typography color="#333">{product.total_review_count}</Typography>
        </Box>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <Typography variant="h5">{product.name}</Typography>
        <Typography>{product.sub_title}</Typography>

        <hr className="m-0" />
        <ShowPrice selectedVariant={activeVariant} />
        <AddToBasketWithDropDown
          activeVariant={activeVariant}
          product={product}
          setActiveVariant={setActiveVariant}
        />
      </Box>
    </Box>
  )
}
