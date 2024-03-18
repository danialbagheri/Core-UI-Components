import {Box, Typography} from '@mui/material'
import Image from 'next/image'
import React from 'react'

export function TeenageCancer() {
  return (
    <Box sx={{width: '100%', maxWidth: 1200, m: '0 auto', mt: '120px'}}>
      <Box
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: '#FBF3EA',
        }}
      />
      <Box
        className="centralize"
        sx={{
          maxWidth: 575,
          gap: '42px',
          alignItems: 'flex-end !important',
          m: '0 auto',
          py: 15,
        }}
      >
        <Image
          alt="teenage-cancer-support"
          height={120}
          src="/footer/teenage-cancer-icon.png"
          width={195}
        />
        <Typography color="#7F2E00" fontSize={12}>
          Every day, seven young people aged 13-24 hear the words “your you can
          help us be there for every one of them. Every day, seven young people
          aged 13-24 hear the words “your you can help us be there for every one
          of them.
        </Typography>
      </Box>
    </Box>
  )
}
