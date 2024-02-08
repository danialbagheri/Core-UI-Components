import {Button as MuiButton} from '@mui/material'

export function Button(props) {
  const {sx = {}} = props
  return (
    <MuiButton
      {...props}
      sx={{
        py: 2,
        width: '100%',
        borderRadius: '78px',
        border: '1px solid #000',
        boxShadow: 'none',
        bgcolor: props.bgcolor,
        color: props.fontColor,
        textTransform: 'none',
        transition: '300ms',
        height: 42,
        '&:hover': {
          fontWeight: 700,
          boxShadow: 'none',
          bgcolor: props.bgcolor,
          borderColor: sx.borderColor ?? 'unset',
        },
        ...sx,
      }}
    >
      {props.children}
    </MuiButton>
  )
}
