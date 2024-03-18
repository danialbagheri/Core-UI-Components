import {Box, Typography} from '@mui/material'
import Image from 'next/image'
import React from 'react'

export function CopyRight() {
  const year = new Date().getFullYear()

  return (
    <Box
      className="centralize"
      sx={{py: 7, flexDirection: 'column', gap: '10px'}}
    >
      <Image alt="logo" height={24} src="/logo.svg" width={124} />
      <Typography color="#7F2E00" fontSize={14} fontWeight={500}>
        Copyright&#169; Linco Care Ltd {year} | United Kingdom
      </Typography>
    </Box>
  )
}
