import * as React from 'react'
import {
  Box,
  OutlinedInput,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'

interface PropsTypes {
  label?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: React.HTMLInputTypeAttribute
  value: string | number
  sx?: SxProps
  error?: string[] | string
  success?: string
  disabled?: boolean
}

const Message = (props: {
  error: string | string[] | undefined
  success: string
}) => {
  const {error, success} = props
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
  } else if (success) {
    return <Typography color="#4CAF50">{success}</Typography>
  }
}

const renderProperBorderColor = ({
  disabled,
  error,
  success,
  theme,
}: {
  disabled?: boolean
  error?: string[] | string
  success?: string
  theme: Theme
}) => {
  if (disabled) {
    return '#E0E0E0'
  } else if (error) {
    return '#d32f2f'
  } else if (success) {
    return '#4CAF50'
  }
  return theme.palette.primary.main
}

export function CustomOutlinedInput(props: PropsTypes) {
  const {
    label,
    placeholder,
    onChange = () => {},
    sx,
    type,
    value,
    error,
    disabled,
    success,
  } = props

  const theme = useTheme()
  const borderColor = renderProperBorderColor({disabled, error, success, theme})

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
            borderColor,
          },

          '&:hover': {
            '& fieldset': {
              borderColor: `${borderColor} !important`,
            },
          },
        }}
        type={type}
        value={value}
      />
      <Message error={error} success={success} />
    </Box>
  )
}
