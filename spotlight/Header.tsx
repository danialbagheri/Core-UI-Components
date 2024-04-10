import {Box, Typography} from '@mui/material'
import Image from 'next/image'

interface PropsType {
  data: {
    id: string
    imageSrc: string
    alt: string
    title: string
  }
}

export function Header(props: PropsType) {
  const {data} = props

  return (
    <Box sx={{height: 570, position: 'relative'}}>
      <Image
        alt={data.alt}
        fill
        src={`/spotlight/${data.imageSrc}`}
        style={{objectFit: 'cover'}}
      />
      <Box
        sx={{
          position: 'absolute',
          top: {xs: '42px', lg: '118px'},
          left: {xs: '50%', lg: '20%'},
          transform: {xs: 'translateX(-50%)', lg: 'translateX(0)'},
          textAlign: 'center',
        }}
      >
        <Typography color="primary" variant="h6" zIndex={20}>
          Sunshine
        </Typography>
        <Typography color="#FFF" fontWeight={700} variant="h1">
          Spotlight
        </Typography>
        <Box />
      </Box>
    </Box>
  )
}
