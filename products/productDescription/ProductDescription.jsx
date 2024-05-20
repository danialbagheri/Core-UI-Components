import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Stack} from '@mui/material'

import {ProductTab} from './productTab'
import {ShowPrice} from 'sharedComponents'
import {ProductDropDown} from './productDropDown'

import StarRating from '../StarRating/StarRating'
import {VariantSelector} from '../VariantSelector'

import {AddButton, OutOfStock, Policies, VariantSize} from './components'

const ProductDescription = props => {
  const {product, selectedVariant, setSelectedVariant} = props

  return (
    <Stack gap={4}>
      <Typography color="primary.main" variant={'h2'}>
        {product.name}
      </Typography>

      <Typography variant={'h3'}>{product.sub_title}</Typography>

      <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 2, mt: 2}}>
        <StarRating name={product.name} score={product.review_average_score} />
        <a href="#readReviews">
          {product.total_review_count >= 1 ? (
            <span>Read {product.total_review_count} reviews</span>
          ) : (
            <span>Be the first to review this product</span>
          )}
        </a>
      </Box>

      <VariantSize selectedVariant={selectedVariant} />

      <ShowPrice selectedVariant={selectedVariant} />

      <VariantSelector
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        slug={product.slug}
        variants={product.variants}
      />

      {selectedVariant.inventory_quantity > 0 ? (
        <AddButton product={product} selectedVariant={selectedVariant} />
      ) : (
        <OutOfStock selectedVariant={selectedVariant} />
      )}

      <Policies />

      {/* <Box
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
        sx={{textAlign: 'justify'}}
      /> */}
      <ProductTab product={product} selectedVariant={selectedVariant} />

      {/* {selectedVariant.inventory_quantity > 0 ? (
        <Box mt={10}>
          <Typography>
            FREE 1 - 2 day shipping on all orders above £25
          </Typography>
        </Box>
      ) : null} */}

      <ProductDropDown product={product} selectedVariant={selectedVariant} />
    </Stack>
  )
}

export default ProductDescription
