import {Box, Typography, useTheme} from '@mui/material'
import type {SpotlightNames} from 'constants/spotlight'
import Image from 'next/image'
import Link from 'next/link'

interface PropsType {
  data: {
    id: string
    imageSrc: string
    alt: string
    title: string
  }
  page?: 'homePage' | 'spotlightPage'
  person?: SpotlightNames
}

export function Header(props: PropsType) {
  const {data, page = 'spotlightPage', person} = props
  const theme = useTheme()
  //This component is used in both spotlight page and home page
  const isSpotlightPage = page === 'spotlightPage'

  return (
    <Box
      sx={{
        height: isSpotlightPage ? 570 : 365,
        position: 'relative',
        borderRadius: isSpotlightPage ? 0 : '10px',
        overflow: 'hidden',
        mb: isSpotlightPage ? 0 : '60px',

        //Read more link styles:
        '& a': {
          position: 'absolute',
          left: {xs: '7%', md: '10%'},
          top: 271,
          color: '#FFF',
          fontSize: 16,
          fontWeight: 600,
          textUnderlineOffset: '6px',
        },
      }}
    >
      {/* ---------------------------- Background image ---------------------------- */}
      <Image
        alt={data.alt}
        fill
        src={data.imageSrc}
        style={{objectFit: 'cover'}}
      />
      {/* -------------------------------------------------------------------------- */}

      {/* ------------------------------ Dark overlay ------------------------------ */}
      <Box
        sx={{
          width: {xs: '100%', md: '45%'},
          height: {
            xs: isSpotlightPage ? 283 : 180,
            md: isSpotlightPage ? 570 : 365,
          },
          bottom: 0,
          left: 0,
          position: 'absolute',
          background: {
            xs: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
            md: 'linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
          },
        }}
      />
      {/* -------------------------------------------------------------------------- */}

      {/* ------------------------- Spotlight header icon -------------------------- */}
      <Box
        sx={{
          position: 'absolute',
          top: isSpotlightPage ? {xs: '42px', md: '118px'} : '71px',
          left: isSpotlightPage
            ? {xs: '50%', md: '20%'}
            : {xs: '7%', md: '10%'},
          transform: isSpotlightPage
            ? {xs: 'translateX(-50%)', md: 'translateX(0)'}
            : 'unset',
          textAlign: 'center',
          scale: isSpotlightPage ? '1' : '0.85',
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
      {/* -------------------------------------------------------------------------- */}

      {/* ----------------------------- Spotlight text ----------------------------- */}
      <Box
        className="centralize"
        sx={{
          position: 'absolute',
          left: isSpotlightPage
            ? {xs: '50%', md: '20%'}
            : {xs: '7%', md: '10%'},
          transform: isSpotlightPage
            ? {xs: 'translateX(-50%)', md: 'translateX(0)'}
            : 'unset',
          top: isSpotlightPage ? {xs: 426, md: 260} : '155px',
          width: '100%',
          maxWidth: 'min(409px , calc(100% - 40px))',
          '& q': {
            color: '#FFF',
            fontSize: isSpotlightPage ? {xs: 26, md: 40} : {xs: 22, md: 30},
            fontWeight: 700,
            lineHeight: isSpotlightPage
              ? {xs: '31px', md: '56px'}
              : {xs: '28;x', md: '38px'},
            position: 'relative',
          },
        }}
      >
        <q>{data.title}</q>
      </Box>
      {/* -------------------------------------------------------------------------- */}

      {/* -------- Read more button which is available only on the home page ------- */}
      {isSpotlightPage ? null : (
        <Link href={`/spotlight/${person}`} target="_blank">
          Read more
        </Link>
      )}
      {/* -------------------------------------------------------------------------- */}
    </Box>
  )
}
