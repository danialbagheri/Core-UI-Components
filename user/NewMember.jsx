import * as React from 'react'

import {Box} from '@mui/material'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {Title} from './localShared'
import {CustomButton} from 'components/shared'
import {createAccountBenefits} from 'constants/user'
import {CalypsoGirlDashboard, GreenCheck} from 'components/icons'
import {IS_CALYPSO_WEBSITE} from 'constants/general'

const Benefit = props => {
  const {text} = props
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <GreenCheck alt="Check" sx={{width: 18, height: 18}} />
      <Title subTitle sx={{whiteSpace: 'nowrap'}}>
        {text}
      </Title>
    </Box>
  )
}

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
        flexDirection: 'column',
        px: '75px',
        '&>#new_member_sign_up_logo , &>#user_page_top_icon': {
          display: {xs: 'block', md: 'none'},
        },
      }}
    >
      <Image
        alt="logo"
        height={32}
        id="new_member_sign_up_logo"
        src="/logo.svg"
        width={161}
      />

      {IS_CALYPSO_WEBSITE ? (
        <CalypsoGirlDashboard sx={{width: 114, height: 114, mt: 7}} />
      ) : null}

      <Title sx={{display: {xs: 'none', md: 'block'}}}>New member?</Title>
      <Title sx={{display: {xs: 'block', md: 'none'}, mt: 1}}>
        Create an account
      </Title>

      <Box mt={{xs: '28px', md: '38px'}}>
        {createAccountBenefits.map(benefit => (
          <Benefit key={benefit.id} text={benefit.text} />
        ))}
      </Box>

      <CustomButton
        onClick={e => {
          e.preventDefault()
          router.push('/user/sign-up')
        }}
        sx={{mt: {xs: '35px', md: '38px'}, width: 200, boxSizing: 'border-box'}}
        variant="contained"
      >
        Sign up now
      </CustomButton>

      {/* This button will be shown only on mobile size and direct user to the 
        sing-in page
      */}
      <CustomButton
        onClick={e => {
          e.preventDefault()
          router.push('./user/sign-in')
        }}
        sx={{
          mt: '10px',
          width: 200,
          boxSizing: 'border-box',
          display: {xs: 'block', md: 'none'},
        }}
        variant="outlined"
      >
        Sign in
      </CustomButton>

      {/* <Title subTitle sx={{mt: {xs: '44px', md: '64px'}}}>
        Sign in with your other accounts
      </Title>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          mt: {xs: '30px', md: '40px'},
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
      </Box> */}
    </Box>
  )
}
