import {Box, Typography, useTheme} from '@mui/material'
import Image from 'next/image'
import React from 'react'

export function Banner(props) {
  const {icon, children, sx = {}} = props
  const theme = useTheme()
  return (
    <Box
      className="centralize"
      sx={{
        p: {xs: 4, md: 7},
        bgcolor: theme.palette.palm.main,
        borderRadius: '11px',
        gap: {xs: 2, md: 5},
        mt: 8,
        ...sx,
      }}
    >
      <Box sx={{border: '2px solid #FFF', borderRadius: '50%'}}>
        <Image
          alt={icon?.name || 'Icon'}
          height={30}
          src={
            icon?.svg_icon ||
            'https://calypso-static.s3.amazonaws.com/media/svg-icon-groups/Check-icon-green.svg'
          }
          width={30}
        />
      </Box>
      <Typography color="#FFF" sx={{fontSize: 20, fontWeight: 600}}>
        {children}
      </Typography>
    </Box>
  )
}
