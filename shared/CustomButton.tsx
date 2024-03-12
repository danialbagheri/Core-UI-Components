import * as React from 'react'

import {Button, CircularProgress, SxProps, useTheme} from '@mui/material'

interface PropsTypes {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'outlined' | 'contained'
  sx?: SxProps
  loading?: boolean
  error?: boolean
  disabled?: boolean
  loadingSize?: number
}

export function CustomButton(props: PropsTypes) {
  const {
    onClick,
    variant,
    sx,
    children,
    loading,
    error,
    disabled,
    loadingSize = 30,
  } = props

  const theme = useTheme()

  const renderBorderColor = () => {
    if (error) {
      return '#d32f2f'
    } else if (disabled || loading) {
      return '#e0e0e0'
    }
    return theme.palette.primary.main
  }

  return (
    <Button
      disabled={disabled || loading}
      onClick={e => {
        onClick && !disabled ? onClick(e) : e.preventDefault()
      }}
      sx={{
        position: 'relative',

        textAlign: 'center',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        textTransform: 'none',

        ...(variant === 'contained' ? {color: '#FFF !important'} : {}),

        p: '8px 50px',

        borderRadius: '78px',

        boxShadow: 'none',

        whiteSpace: 'nowrap',

        border: `1px solid ${renderBorderColor()}`,

        '&:hover': {
          bgcolor:
            variant === 'contained'
              ? theme.palette.primary.main
              : '#FFF !important',
          boxShadow: 'none !important',
        },

        ...sx,
      }}
      variant={variant}
    >
      {loading ? (
        <CircularProgress
          size={loadingSize}
          sx={{
            color:
              variant === 'contained' ? '#FFF' : theme.palette.primary.main,
            position: 'absolute',
          }}
        />
      ) : (
        children
      )}
    </Button>
  )
}
