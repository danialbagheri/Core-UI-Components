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
    <Stack>
      <Typography fontSize={32} fontWeight={700} lineHeight="39px">
        {product.name}
      </Typography>

      <Typography fontSize={22} fontWeight={600} lineHeight="26.8px" mt="7px">
        {product.sub_title}
      </Typography>

      <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 2, mt: '7px'}}>
        <StarRating name={product.name} score={product.review_average_score} />
        <a href="#readReviews">
          {product.total_review_count >= 1 ? (
            <span>Read {product.total_review_count} reviews</span>
          ) : (
            <span>Be the first to review this product</span>
          )}
        </a>
      </Box>

      <VariantSize selectedVariant={selectedVariant} sx={{mt: '12px'}} />

      <ShowPrice selectedVariant={selectedVariant} sx={{mt: '18px'}} />

      <VariantSelector
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        slug={product.slug}
        sx={{mt: '24px'}}
        variants={product.variants}
      />

      {selectedVariant.inventory_quantity > 0 ? (
        <AddButton
          product={product}
          selectedVariant={selectedVariant}
          sx={{mt: '22px'}}
        />
      ) : (
        <OutOfStock selectedVariant={selectedVariant} sx={{mt: '22px'}} />
      )}

      <Policies sx={{mt: '42px'}} />

      <ProductTab
        product={product}
        selectedVariant={selectedVariant}
        sx={{mt: '44px'}}
      />

      <ProductDropDown
        product={product}
        productDescription={product.description}
        selectedVariant={selectedVariant}
        sx={{mt: '44px'}}
      />
    </Stack>
  )
}

export default ProductDescription
