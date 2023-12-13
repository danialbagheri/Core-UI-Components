import {Box, OutlinedInput, SxProps, Typography, useTheme} from '@mui/material'
import * as React from 'react'

interface PropsTypes {
  label?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: React.HTMLInputTypeAttribute
  sx?: SxProps
}

export function CustomOutlinedInput(props: PropsTypes) {
  const {label, placeholder, onChange, sx, type} = props
  const theme = useTheme()
  return (
    <Box sx={{...sx}}>
      {label ? (
        <Typography
          sx={{
            color: ' #000',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>
      ) : null}
      <OutlinedInput
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        placeholder={placeholder}
        size="small"
        sx={{
          color: '#D4D4D4',
          textAlign: 'center',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 500,

          '&>input': {color: '#000'},

          '& fieldset': {
            borderColor: `${theme.palette.primary.main} !important`,
          },
        }}
        type={type}
      />
    </Box>
  )
}
