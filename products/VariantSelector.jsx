import * as React from 'react'

import {useSearchParams} from 'next/navigation'

import Box from '@mui/material/Box'
import {Typography, useTheme} from '@mui/material'

export function VariantSelector({
  variants,
  selectedVariant,
  setSelectedVariant,
  ...props
}) {
  const searchParams = useSearchParams()
  const theme = useTheme()

  const urlSku = searchParams.get('sku')
  const isAllVarSPF = variants.every(variant => variant.name?.startsWith('SPF'))

  const renderStyles = ({isInStock, isSelected}) => {
    if (isSelected) {
      return {
        color: theme.palette.primary.main,
        fontWeight: 600,
        cursor: 'initial',
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      }
    } else if (!isInStock) {
      return {
        color: '#C6C6C6',
        cursor: 'initial',
        fontWeight: 400,
      }
    }
    return {
      color: '#000',
      fontWeight: 400,
      cursor: 'pointer',
    }
  }

  /**
   *
   * @param {boolean} isAllVarSPF - If all variants are SPF
   * @param {object} variant - The variant object
   * @returns {object} - The variant proper name and if it's an SPF variant
   * @example renderVariantDetails({isAllVarSPF, variant})
   * @returns {variantName: 'original', isSpfVariant: false}
   * @returns {variantName: 'spf30', isSpfVariant: true}
   */
  const renderVariantDetails = ({isAllVarSPF, variant}) => {
    if (isAllVarSPF) {
      return {variantName: variant.name.split(' ')[1], isSpfVariant: true}
    } else if (variant.name.toLowerCase().includes('size')) {
      return {variantName: variant.size, isSpfVariant: false}
    } else if (variant.name.toLowerCase().includes('original')) {
      return {variantName: 'original', isSpfVariant: false}
    } else if (variant.name.toLowerCase().includes('spf')) {
      return {
        variantName: variant.name.split(' ')[1].trim(),
        isSpfVariant: true,
      }
    }
    return {variantName: variant.name, isSpfVariant: false}
  }

  React.useEffect(() => {
    if (urlSku) {
      const variant = variants.find(variant => variant.sku === urlSku)

      if (variant) {
        setSelectedVariant(variant)
      }
    } else {
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i]

        if (variant.inventory_quantity > 0) {
          setSelectedVariant(variant)
          break
        } else if (i === variants.length - 1) {
          setSelectedVariant(variants[0])
        }
      }
    }
  }, [urlSku])

  if (variants.length === 1 && !isAllVarSPF) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}
      {...props}
    >
      {variants.map(variant => {
        const isInStock = variant.inventory_quantity > 0
        const isSelected = selectedVariant.sku === variant.sku

        return (
          <Box className="centralize" key={variant.id}>
            <Box
              className="centralize"
              onClick={() => {
                if (isInStock) {
                  setSelectedVariant(variant)
                }
              }}
              textAlign={'center'}
            >
              <Typography
                fontSize={16}
                px
                sx={{...renderStyles({isInStock, isSelected}), px: 1}}
              >
                {renderVariantDetails({isAllVarSPF, variant}).variantName}
              </Typography>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
