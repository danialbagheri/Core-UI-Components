import * as React from 'react'

import {useSearchParams} from 'next/navigation'

import Box from '@mui/material/Box'
import {useTheme} from '@mui/material'

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

  const renderStyles = ({isInStock, isSelected, isAllVarSPF, variant}) => {
    let outerBoxStyles = {}
    let innerBoxStyles = {}
    const isSpfVariant = renderVariantDetails({
      isAllVarSPF,
      variant,
    }).isSpfVariant

    if (isInStock) {
      if (isSelected) {
        innerBoxStyles = {
          width: isSpfVariant ? 28 : 'unset',
          height: 28,
          color: '#FFF',
          bgcolor: theme.palette.primary.main,
          cursor: 'initial',
          p: 0,
        }
        outerBoxStyles = {
          p: '2px',
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: '20px',
        }
      } else {
        innerBoxStyles = {
          minWidth: 30,
          maxWidth: isSpfVariant ? 28 : 'unset',
          height: 30,
          color: '#000',
          bgcolor: '#FFF',
          border: '1px solid #CCC',
          cursor: 'pointer',
        }
      }
    } else {
      innerBoxStyles = {
        minWidth: 30,
        maxWidth: isSpfVariant ? 28 : 'unset',
        height: 30,
        color: '#FFF',
        bgcolor: '#E8E2D6',
        border: 'none',
        cursor: 'initial',
      }
    }

    return {outerBoxStyles, innerBoxStyles}
  }

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

        const {innerBoxStyles, outerBoxStyles} = renderStyles({
          isSelected,
          isInStock,
          isAllVarSPF,
          variant,
        })
        return (
          <Box className="centralize" key={variant.id} sx={{...outerBoxStyles}}>
            <Box
              className="centralize"
              onClick={() => {
                if (isInStock) {
                  setSelectedVariant(variant)
                }
              }}
              sx={{
                fontWeight: 400,
                fontSize: 16,
                borderRadius: '15px',
                ...innerBoxStyles,
                p: renderVariantDetails({isAllVarSPF, variant}).isSpfVariant
                  ? 0
                  : '6px 10px',
              }}
              textAlign={'center'}
            >
              {renderVariantDetails({isAllVarSPF, variant}).variantName}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
