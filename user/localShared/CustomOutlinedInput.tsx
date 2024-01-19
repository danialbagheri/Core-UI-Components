import * as React from 'react'
import {Box, OutlinedInput, SxProps, Typography, useTheme} from '@mui/material'

interface PropsTypes {
  label?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: React.HTMLInputTypeAttribute
  value: string | number
  sx?: SxProps
  error?: string[] | string
  disabled?: boolean
}

const ErrorMessage = (props: {error: string | string[] | undefined}) => {
  const {error} = props
  if (error) {
    if (Array.isArray(error)) {
      return (
        <>
          {error.map((err, i) => (
            <Typography color="#d32f2f" key={i}>
              {err}
            </Typography>
          ))}
        </>
      )
    }
    return <Typography color="#d32f2f">{error}</Typography>
  }
}

export function CustomOutlinedInput(props: PropsTypes) {
  const {label, placeholder, onChange, sx, type, value, error, disabled} = props
  const theme = useTheme()
  return (
    <Box sx={{...sx}}>
      {label ? (
        <Typography
          sx={{
            color: error ? '#d32f2f' : '#000',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>
      ) : null}
      <OutlinedInput
        disabled={disabled}
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
            borderColor: disabled
              ? '#E0E0E0'
              : `${error ? '#d32f2f' : theme.palette.primary.main} !important`,
          },
        }}
        type={type}
        value={value}
      />
      <ErrorMessage error={error} />
    </Box>
  )
}
