import {Box, IconButton, Typography} from '@mui/material'
import Image from 'next/image'
import {useRouter} from 'next/router'
import React from 'react'
import {CustomButton, Title} from './localShared'

export function NewMember() {
  const router = useRouter()

  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          md: '50%',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: {xs: 'column-reverse', md: 'column'},
        px: '75px',
        '&>img': {
          display: {xs: 'block', md: 'none'},
        },
      }}
    >
      <Title sx={{display: {xs: 'none', md: 'block'}}}>New member?</Title>

      <Box mt={{xs: '64px', md: '60px'}}>
        <Title subTitle> Sign in with your other accounts</Title>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            mt: 10,
          }}
        >
          <IconButton>
            <Image
              alt="Google icon"
              height={39}
              src="/icons/social-media/google-logo.svg"
              width={39}
            />
          </IconButton>
          <IconButton>
            <Image
              alt="Facebook icon"
              height={39}
              src="/icons/social-media/facebook-logo.svg"
              width={39}
            />
          </IconButton>
          <IconButton>
            <Image
              alt="Apple icon"
              height={39}
              src="/icons/social-media/apple-logo.svg"
              width={39}
            />
          </IconButton>
        </Box>
      </Box>
      <CustomButton
        onClick={e => {
          e.preventDefault()
          router.push('/sign-up')
        }}
        sx={{mt: {xs: '20px', md: '90px'}}}
        variant="outlined"
      >
        Sign up now
      </CustomButton>
      <Typography
        sx={{
          color: '#226F61',
          textAlign: 'center',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          display: {xs: 'block', md: 'none'},
          mt: '50px',
        }}
      >
        New member?
      </Typography>
      <Image alt="logo" height={32} src="/logo.svg" width={161} />
    </Box>
  )
}
