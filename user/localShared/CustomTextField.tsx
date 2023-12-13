import {SxProps, TextField, useTheme} from '@mui/material'
import * as React from 'react'

interface PropsTypes {
  id: string
  label: string
  type: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  sx?: SxProps
}

export function CustomTextField(props: PropsTypes) {
  const {id, label, type, onChange, sx} = props
  const theme = useTheme()

  return (
    <TextField
      id={id}
      label={label}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
      size="small"
      sx={{
        '& legend': {
          fontSize: '16px',
        },
        '& label': {
          color: '#D4D4D4',
          fontSize: '18px',
          fontWeight: 500,
        },
        '& .MuiInputBase-root:hover': {
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
        },
        '& fieldset': {
          border: '1px solid',
          borderColor: theme.palette.primary.main,
        },

        '& input': {
          p: '13px 20px',
        },
        ...sx,
      }}
      type={type}
      variant="outlined"
    />
  )
}
