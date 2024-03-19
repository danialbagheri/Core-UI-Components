import {Box} from '@mui/material'

export function Divider({sx}) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1270,
        height: '1px',
        bgcolor: 'rgba(255, 107, 0, 0.2)',
        ...sx,
      }}
    />
  )
}
