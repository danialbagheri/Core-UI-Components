import {Box, Typography} from '@mui/material'
import {spotlight} from 'constants/spotlight'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NewSpotlight(props: {item: string}) {
  const {item} = props
  const data = spotlight[item].specifications
  return (
    <Link
      className="centralize"
      href={`/spotlight/${item}`}
      style={{flexDirection: 'column', gap: '19px', textDecoration: 'none'}}
    >
      <Box
        sx={{
          position: 'relative',
          width: 156,
          height: 156,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <Image
          alt={data.alt}
          fill
          src={data.photo}
          style={{objectFit: 'cover'}}
        />
      </Box>
      <Typography fontSize={22} fontWeight={600}>
        {data.name}
      </Typography>
    </Link>
  )
}
