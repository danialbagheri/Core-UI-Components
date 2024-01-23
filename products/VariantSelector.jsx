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

  // const isSingleVariant = variants.length === 1

  const renderVariant = variant => {
    const isInStock = variant.inventory_quantity > 0
    const isSelected = selectedVariant.sku === variant.sku
    const isAllVarSPF = variants.every(variant =>
      variant.name?.startsWith('SPF'),
    )

    const renderProperName = () => {
      if (isAllVarSPF) {
        return variant.name.split(' ')[1]
      } else if (variant.name.toLowerCase().includes('size')) {
        return variant.size
      }
      return variant.name
    }

    const renderStyles = () => {
      if (isInStock) {
        if (isSelected) {
          return {
            minWidth: 31,
            height: 31,
            color: '#FFF',
            bgcolor: theme.palette.primary.main,
            border: '2px solid #FFF',
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
            cursor: 'initial',
          }
        }
        return {
          minWidth: 30,
          height: 30,
          color: '#000',
          bgcolor: '#FFF',
          border: '1px solid #CCC',
          boxShadow: 'none',
          cursor: 'pointer',
        }
      }
      return {
        minWidth: 30,
        height: 30,
        color: '#FFF',
        bgcolor: '#E8E2D6',
        border: 'none',
        boxShadow: 'none',
        cursor: 'initial',
      }
    }

    return (
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

          p: isAllVarSPF ? 0 : '6px 10px',
          ...renderStyles(),
        }}
        textAlign={'center'}
      >
        {renderProperName()}
      </Box>
    )
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
      {variants.map(variant => renderVariant(variant))}
    </Box>
  )
}
