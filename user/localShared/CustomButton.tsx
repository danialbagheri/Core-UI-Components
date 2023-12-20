import * as React from 'react'
import {Button, CircularProgress, SxProps, useTheme} from '@mui/material'

interface PropsTypes {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant: 'outlined' | 'contained'
  sx?: SxProps
  loading?: boolean
}

export function CustomButton(props: PropsTypes) {
  const {onClick, variant, sx, children, loading} = props

  const theme = useTheme()

  return (
    <Button
      onClick={e => onClick(e)}
      sx={{
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
          sx={{color: '#FFF', position: 'absolute'}}
        />
      ) : (
        children
      )}
    </Button>
  )
}
