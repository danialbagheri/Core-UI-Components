import * as React from 'react'
import {Button, CircularProgress, SxProps, useTheme} from '@mui/material'

interface PropsTypes {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'outlined' | 'contained'
  sx?: SxProps
  loading?: boolean
  error?: boolean
}

export function CustomButton(props: PropsTypes) {
  const {onClick, variant, sx, children, loading, error} = props

  const theme = useTheme()

  return (
    <Button
      onClick={e => onClick(e)}
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

        border: `1px solid ${error ? '#d32f2f' : theme.palette.primary.main}`,

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
          size={30}
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
