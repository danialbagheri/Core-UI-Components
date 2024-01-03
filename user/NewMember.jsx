import * as React from 'react'

import {Box, IconButton} from '@mui/material'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {CustomButton, Title} from './localShared'

const Benefit = props => {
  const {checkIconSrc, text} = props
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Image alt="Check" height={18} src={checkIconSrc} width={18} />
      <Title subTitle sx={{whiteSpace: 'nowrap'}}>
        {text}
      </Title>
    </Box>
  )
}

export function NewMember(props) {
  const {userAssets} = props
  const router = useRouter()

  const topIcon = userAssets?.userAccountTopIcons?.items[0]

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

      <Image
        alt={topIcon.name || ''}
        height={114}
        id="user_page_top_icon"
        src={topIcon.svg_icon || ''}
        style={{marginTop: '28px'}}
        width={114}
      />

      <Title sx={{display: {xs: 'none', md: 'block'}}}>New member?</Title>
      <Title sx={{display: {xs: 'block', md: 'none'}, mt: 1}}>
        Create an account
      </Title>

      <Box mt={{xs: '28px', md: '38px'}}>
        {userAssets?.creatingAccountBenefits?.items.map(benefit => (
          <Benefit
            checkIconSrc={userAssets?.checkIcon?.items[0]?.svg_icon}
            key={benefit.id}
            text={benefit.text}
          />
        ))}
      </Box>

      <CustomButton
        onClick={e => {
          e.preventDefault()
          router.push('/sign-up')
        }}
        sx={{mt: {xs: '35px', md: '38px'}, width: 200, boxSizing: 'border-box'}}
        variant="contained"
      >
        Sign up now
      </CustomButton>
      <CustomButton
        onClick={e => {
          e.preventDefault()
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

      <Title subTitle sx={{mt: {xs: '44px', md: '64px'}}}>
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
      </Box>
    </Box>
  )
}
