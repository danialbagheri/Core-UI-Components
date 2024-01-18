import {Box, Typography, useTheme} from '@mui/material'
import Image from 'next/image'
import React from 'react'

export function Header(props) {
  const {image, name} = props

  const theme = useTheme()
  return (
    <Box
      className="centralize"
      sx={{
        bgcolor: {xs: theme.palette.primary.light, md: '#FFF'},
        pt: {xs: 7, md: 3},
        flexDirection: 'column',
        '&>img': {width: {xs: 215, md: 246}, height: {xs: 245, md: 280}},
      }}
    >
      <Image
        alt={image?.name || ''}
        height={280}
        src={image?.svg_icon || ''}
        width={246}
      />
      <Box
        backgroundColor="primary.light"
        sx={{width: '100%', py: {xs: 5, md: 9}, borderRadius: {xs: 0, md: 5}}}
        textAlign="center"
      >
        <Typography color="primary" sx={{fontSize: '24px', fontWeight: 700}}>
          Nice to see you{name.trim() ? `, ${name}!` : null}
        </Typography>
        <Typography sx={{fontSize: '15px', fontWeight: 700, mt: 2}}>
          You’re part of the Calypso family!
        </Typography>
      </Box>
    </Box>
  )
}
