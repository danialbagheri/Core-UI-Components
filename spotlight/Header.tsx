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
          width: {xs: '100%', md: '45%'},
          height: {xs: 283, md: 570},
          bottom: 0,
          left: 0,
          position: 'absolute',
          background: {
            xs: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
            md: 'linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: {xs: '42px', md: '118px'},
          left: {xs: '50%', md: '20%'},
          transform: {xs: 'translateX(-50%)', md: 'translateX(0)'},
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
          left: {xs: '50%', md: '20%'},
          transform: {xs: 'translateX(-50%)', md: 'translateX(0)'},
          top: {xs: 426, md: 260},

          maxWidth: 409,
          '& q': {
            color: '#FFF',
            fontSize: {xs: 26, md: 40},
            fontWeight: 700,
            lineHeight: {xs: '31px', md: '56px'},
            position: 'relative',
          },
        }}
      >
        <q>{data.title}</q>
      </Box>
    </Box>
  )
}
