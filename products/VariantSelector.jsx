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
  const isSpfVariant = React.useRef(false)

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
        isSpfVariant.current = true
        return variant.name.split(' ')[1]
      } else if (variant.name.toLowerCase().includes('size')) {
        isSpfVariant.current = false
        return variant.size
      } else if (variant.name.toLowerCase().includes('original')) {
        isSpfVariant.current = false
        return 0
      } else if (variant.name.toLowerCase().includes('spf')) {
        isSpfVariant.current = true
        return variant.name.split(' ')[1].trim()
      }
      isSpfVariant.current = false
      return variant.name
    }

    const renderStyles = () => {
      let outerBoxStyles = {}
      let innerBoxStyles = {}

      if (isInStock) {
        if (isSelected) {
          innerBoxStyles = {
            width: isSpfVariant.current ? 28 : 'unset',
            height: 28,
            color: '#FFF',
            bgcolor: theme.palette.primary.main,
            cursor: 'initial',
          }
          outerBoxStyles = {
            p: '2px',
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '20px',
          }
        } else {
          innerBoxStyles = {
            minWidth: 30,
            maxWidth: 30,
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
          maxWidth: isSpfVariant.current ? 28 : 'unset',
          height: 30,
          color: '#FFF',
          bgcolor: '#E8E2D6',
          border: 'none',
          cursor: 'initial',
        }
      }

      return {outerBoxStyles, innerBoxStyles}
    }

    return (
      <Box className="centralize" sx={{...renderStyles().outerBoxStyles}}>
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
            ...renderStyles().innerBoxStyles,
            p: isSpfVariant.current ? 0 : '6px 10px',
          }}
          textAlign={'center'}
        >
          {renderProperName()}
        </Box>
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
