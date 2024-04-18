import {Box, Container, Typography} from '@mui/material'
import Image from 'next/image'
import React from 'react'

export function TeenageCancer() {
  return (
    <Container sx={{mb: '80px'}}>
      <Box
        className="centralize"
        sx={{
          maxWidth: 575,
          gap: '42px',
          alignItems: {xs: 'center', md: 'flex-end !important'},
          m: '0 auto',
          flexDirection: {xs: 'column', md: 'row'},
        }}
      >
        <Image
          alt="teenage-cancer-support"
          height={120}
          src="/footer/teenage-cancer-icon.png"
          width={195}
        />
        <Typography color="#7F2E00" fontSize={12}>
          Together, we&apos;re raising awareness about sun protection for young
          people. We&apos;re proud to partner with Teenage Cancer Trust, a UK
          charity dedicated to supporting young people aged 13-24 facing cancer.
          Their specialised hospital units provide a positive and
          age-appropriate environment, making a real difference during a
          challenging time.
        </Typography>
      </Box>
    </Container>
  )
}
