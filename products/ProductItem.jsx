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

/* --------------------------------- Styles --------------------------------- */
import styles from './styles.module.css'
import {getProperVariantImageSrc} from 'utils'
import Link from 'next/link'
/* -------------------------------------------------------------------------- */

const LIFE_STYLE = 'LS'

const ProductTag = props => {
  const {product, isOnSale} = props
  const properTagName = product?.collection_names?.includes('New')
    ? 'New'
    : product?.collection_names?.[0]

  if (isOnSale || product?.collection_names?.length > 0) {
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
        {isOnSale ? 'SALE' : properTagName}
      </Box>
    )
  }
}

export function ProductItem(props) {
  const {product, sx = {}} = props

  const [activeVariant, setActiveVariant] = React.useState(
    product?.variants?.[0] || {},
  )
  const [isHovered, setIsHovered] = React.useState(false)
  const [imageIsHovered, setImageIsHovered] = React.useState(false)
  const [displayImage, setDisplayImage] = React.useState(false)
  const {addVariant, checkoutState, openCart} = useShopify()

  const router = useRouter()
  const theme = useTheme()

  const hasLifeStyleImage =
    product?.secondary_image_data?.image_type === LIFE_STYLE
  const isOnSale =
    activeVariant[COMPARE_AT_PRICE] || activeVariant[EURO_COMPARE_AT_PRICE]
  const isOutOfStock = activeVariant.inventory_quantity < 1
  const productPath = `/products/${product?.slug}?sku=${activeVariant.sku}`

  /**
   *
   * @param {string} variantImage - The image of the variant
   * @param {string} mainImage - The main image of the product
   * @returns {string} - Proper image source. If variant image is not available, main image is returned
   */
  const imageSrcHandler = (imageList, mainImage) => {
    const variantImage = getProperVariantImageSrc(imageList)

    if (variantImage) {
      return variantImage
    } else if (mainImage) {
      return mainImage
    }

    return ''
  }

  const renderButtonBgColor = () => {
    if (isOnSale) {
      return '#F00'
    } else if (isOutOfStock) {
      return '#C3C0B7'
    }
    return theme.palette.primary.main
  }

  const renderBoxBgColor = () => {
    if (isHovered && isOutOfStock) {
      return 'linear-gradient(180deg, #C3C0B7 0%, rgba(255, 255, 255, 0) 100%)'
    } else if (isHovered && !hasLifeStyleImage) {
      return 'linear-gradient(180deg, #FFE6C9 0%, rgba(255, 255, 255, 0.00) 100%)'
    }
    return 'linear-gradient(180deg, #FAF5EB 0%, rgba(250, 245, 235, 0.00) 100%)'
  }

  const addToCartHandler = (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ]

    addVariant(checkoutState.id, lineItemsToAdd)
    openCart()
  }

  const mouseMoveHandler = state => {
    setImageIsHovered(state)
    if (state) {
      setDisplayImage(true)
    } else {
      setTimeout(() => {
        setDisplayImage(state)
      }, 250)
    }
  }

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={e => {
        e.stopPropagation()
        setIsHovered(!isHovered)
      }}
      sx={{
        width: {xs: '100%', msm: 240},
        height: '100%',

        maxWidth: 240,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        gap: '10px',
        ...sx,
      }}
    >
      {/* --------------------- Image and add button container --------------------- */}
      <Box
        className={styles.fadeOut}
        onClick={e => {
          e.preventDefault()
          router.push(productPath)
        }}
        onMouseEnter={() => mouseMoveHandler(true)}
        onMouseLeave={() => mouseMoveHandler(false)}
        onTouchStart={() => mouseMoveHandler(!displayImage)}
        sx={{
          height: {xs: 300, msm: 365},
          width: '100%',

          borderRadius: '10px',
          overflow: 'hidden',

          background: renderBoxBgColor(),

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

        {/*Secondary image on hover */}
        {displayImage &&
        product?.secondary_image_resized &&
        hasLifeStyleImage ? (
          <Link href={productPath}>
            <Image
              alt={product?.name}
              className={imageIsHovered ? styles.fadeIn : styles.fadeOut}
              fill
              loading="eager"
              sizes="(max-width: 900px) 50vw, 20vw"
              src={product?.secondary_image_resized || ''}
              style={{
                objectFit: 'cover',
              }}
            />
          </Link>
        ) : (
          <Box
            sx={{
              width: {xs: '100%', msm: 212},

              height: 270,

              margin: '0 auto',
              position: 'relative',
              transition: 'all 200ms',

              border: 'none',
            }}
          >
            <Link href={productPath}>
              <Image
                alt={product?.name}
                fill
                priority
                sizes="(max-width: 900px) 50vw, 20vw"
                src={imageSrcHandler(
                  activeVariant.image_list,
                  product?.main_image,
                )}
                style={{objectFit: 'contain'}}
              />
            </Link>
          </Box>
        )}

        <FavIcon isHovered={isHovered} variant={activeVariant} />

        {/* Add to cart button which is hidden by default but shown on hover */}
        {isHovered ? (
          <Box
            className="centralize"
            onClick={e => {
              e.stopPropagation()
              if (!isOutOfStock) {
                addToCartHandler(activeVariant.graphql_id, 1)
              }
            }}
            sx={{
              height: 40,
              width: '100%',

              bgcolor: renderButtonBgColor(),

              position: 'absolute',
              bottom: 0,

              borderRadius: '0px 0px 10px 10px',
              zIndex: 2,
            }}
          >
            <Typography color="#FFF" fontSize={18} fontWeight={500}>
              {isOutOfStock ? 'Out of stock!' : 'Add to cart'}
            </Typography>
          </Box>
        ) : (
          <Box
            className="centralize"
            gap="10px"
            sx={{display: displayImage ? 'none !important' : 'flex !important'}}
          >
            <StarRating
              name={product?.name}
              score={product?.review_average_score}
            />
            <Typography color="#333">{product?.total_review_count}</Typography>
          </Box>
        )}
      </Box>
      {/* -------------------------------------------------------------------------- */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 3,

          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '2px',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
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
            {product?.name}
          </Typography>

          <Typography fontSize={13} fontWeight={400}>
            {product?.sub_title}
          </Typography>
          <Price variant={activeVariant} />
        </Box>
        <VariantSelector
          selectedVariant={activeVariant}
          setSelectedVariant={setActiveVariant}
          variants={product?.variants}
        />
      </Box>
    </Box>
  )
}
