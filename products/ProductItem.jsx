import * as React from 'react'

/* ----------------------------- Next Components ---------------------------- */
import Image from 'next/image'
import {useRouter} from 'next/navigation'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {VariantSelector} from './VariantSelector'
import {StarRating} from './StarRating'
import {COMPARE_AT_PRICE, EURO_COMPARE_AT_PRICE, Price} from './Price'
import {useShopify} from '../hooks'
import {FavIcon} from './FavIcon'
/* -------------------------------------------------------------------------- */

const ProductTag = props => {
  const {product, isOnSale} = props

  if (isOnSale || product.collection_names.length > 0) {
    return (
      <Box
        className="centralize"
        sx={{
          borderRadius: '4px',

          fontSize: '11px',
          fontWeight: 500,
          color: isOnSale ? '#FFF' : '#000',

          zIndex: 2,

          position: 'absolute',
          top: 20,
          right: 13,

          boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.15)',
          backgroundColor: isOnSale ? '#F00' : '#fff',

          padding: '3px 13px',
        }}
      >
        {isOnSale ? 'SALE' : product.collection_names[0]}
      </Box>
    )
  }
}

export function ProductItem(props) {
  const {product} = props

  const [activeVariant, setActiveVariant] = React.useState(product.variants[0])
  const [isHovered, setIsHovered] = React.useState(false)
  const [imageIsHovered, setImageIsHovered] = React.useState(false)
  const {addVariant, checkoutState, openCart} = useShopify()
  const router = useRouter()
  const theme = useTheme()

  const isOnSale =
    activeVariant[COMPARE_AT_PRICE] || activeVariant[EURO_COMPARE_AT_PRICE]
  const isInStock = activeVariant.inventory_quantity > 0

  const imageSrcHandler = (variantImage, mainImage) => {
    if (variantImage) {
      if (variantImage.image) {
        return variantImage.image
      } else if (mainImage) {
        return mainImage
      }
      return ''
    }
    return ''
  }

  function addToCartHandler(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ]
    addVariant(checkoutState.id, lineItemsToAdd)
    openCart()
  }

  return (
    <Box
      key={product.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: 240,
        height: '100%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        gap: '10px',
        transition: 'all 1s',
      }}
    >
      <Box
        onClick={e => {
          e.preventDefault()
          router.push(`/products/${product.slug}`)
        }}
        onMouseEnter={() => setImageIsHovered(true)}
        onMouseLeave={() => setImageIsHovered(false)}
        sx={{
          height: 365,
          width: '100%',

          borderRadius: '10px',
          overflow: 'hidden',

          background: isHovered
            ? 'linear-gradient(180deg, #FFCFA3 0%, rgba(255, 255, 255, 0.00) 100%)'
            : 'linear-gradient(180deg, #FAF5EB 0%, rgba(250, 245, 235, 0.00) 100%)',

          position: 'relative',

          pt: '52px',
          pb: '10px',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '7px',

          cursor: 'pointer',
        }}
      >
        <ProductTag isOnSale={isOnSale} product={product} />

        {/* Show secondary image on hover */}
        {imageIsHovered && product.secondary_image_resized ? (
          <Image
            alt={product.name}
            fill
            src={product.secondary_image_resized}
            style={{
              objectFit: 'cover',
            }}
          />
        ) : (
          // Show primary image by default and if secondary image is not available
          <Box
            sx={{
              width: 212,

              height: 270,

              margin: '0 auto',
              position: 'relative',
              transition: 'all 200ms',
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
        )}

        <FavIcon isHovered={isHovered} product={product} slug={product.slug} />

        {/* Add to cart button which is hidden by default but shown on hover */}
        {isHovered ? (
          <Box
            className="centralize"
            onClick={e => {
              e.stopPropagation()
              if (isInStock) {
                addToCartHandler(activeVariant.graphql_id, 1)
              }
            }}
            sx={{
              height: 40,
              width: '100%',

              bgcolor: isOnSale ? '#F00' : theme.palette.primary.main,

              position: 'absolute',
              bottom: 0,

              borderRadius: '0px 0px 10px 10px',
              zIndex: 2,
            }}
          >
            <Typography color="#FFF" fontSize={18} fontWeight={500}>
              Add to cart
            </Typography>
          </Box>
        ) : (
          <Box className="centralize" gap="10px">
            <StarRating
              name={product.name}
              score={product.review_average_score}
            />
            <Typography color="#333">{product.total_review_count}</Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 3,

          minHeight: 140,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{display: 'flex', gap: 3, flexDirection: 'column', flexGrow: 1}}
        >
          <Typography
            fontSize={22}
            fontWeight={700}
            sx={{
              display: '-webkit-box',
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: 2 /* Number of lines to show */,
              textOverflow: 'ellipsis',
              lineHeight: '27px',
            }}
          >
            {product.name}
          </Typography>

          <Typography fontSize={14} fontWeight={400}>
            {product.sub_title}
          </Typography>
          <Price variant={activeVariant} />
        </Box>
        <VariantSelector
          selectedVariant={activeVariant}
          setSelectedVariant={setActiveVariant}
          variants={product.variants}
        />
      </Box>
    </Box>
  )
}
