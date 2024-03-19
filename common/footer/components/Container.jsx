import {Box} from '@mui/material'
import React from 'react'

export function Container(props) {
  return (
    <Box {...props} sx={{px: {xs: '23px', sm: '38px', slg: 0}, ...props.sx}} />
  )
}
