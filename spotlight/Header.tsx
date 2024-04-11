import {Box, Typography, useTheme} from '@mui/material'
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
  const theme = useTheme()

  return (
    <Box sx={{height: 570, position: 'relative'}}>
      <Image
        alt={data.alt}
        fill
        src={data.imageSrc}
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
        <Typography
          color="primary"
          ml={6}
          position="relative"
          variant="h6"
          zIndex={2}
        >
          Sunshine
        </Typography>
        <Typography
          color="#FFF"
          fontWeight={700}
          position="relative"
          variant="h1"
          zIndex={2}
        >
          Spotlight
        </Typography>
        <Box
          sx={{
            width: 61,
            height: 61,
            position: 'absolute',
            top: 4,
            left: -12,
            bgcolor: theme.palette.primary.main,
            borderRadius: '50%',
            zIndex: 1,
          }}
        />
      </Box>
      <Box
        className="centralize"
        sx={{
          position: 'absolute',
          left: {xs: '50%', lg: '20%'},
          transform: {xs: 'translateX(-50%)', lg: 'translateX(0)'},
          top: {xs: 426, lg: 285},

          maxWidth: 409,
          '& q': {
            color: '#FFF',
            fontSize: {xs: 26, lg: 48},
            fontWeight: 700,
            lineHeight: {xs: '31px', lg: '58px'},
            position: 'relative',
          },
        }}
      >
        <q>{data.title}</q>
      </Box>
    </Box>
  )
}
