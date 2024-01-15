import {Box, Typography, useTheme} from '@mui/material'
import Image from 'next/image'
import {CustomButton} from '../localShared'
import {useRouter} from 'next/router'
import {assetsEndPoints} from '../../../utils'

export function AccountCreated(props) {
  const {assets} = props
  const {checkIcon, userAccountTopIcons} = assetsEndPoints

  const theme = useTheme()
  const router = useRouter()

  const greenCheckIcon = assets[checkIcon]?.items[0]
  const girlIcon = assets[userAccountTopIcons]?.items[0]

  return (
    <Box className="centralize" sx={{px: '18px', flexDirection: 'column'}}>
      <Box
        className="centralize"
        sx={{
          p: '28px',
          bgcolor: theme.palette.palm.main,
          borderRadius: '11px',
          gap: 5,
          maxWidth: 340,
        }}
      >
        <Box sx={{border: '2px solid #FFF', borderRadius: '50%'}}>
          <Image
            alt={greenCheckIcon?.name || ''}
            height={30}
            src={greenCheckIcon?.svg_icon || ''}
            width={30}
          />
        </Box>
        <Typography color="#FFF" sx={{fontSize: 20, fontWeight: 600}}>
          You have successfully created your account!
        </Typography>
      </Box>
      <Image
        alt={girlIcon?.name || ''}
        height={145}
        src={girlIcon?.svg_icon || ''}
        style={{marginTop: '50px'}}
        width={145}
      />
      <Typography sx={{fontSize: 18, fontWeight: 700, mt: 5}}>
        Please activate your account by clicking the link sent to your email.
      </Typography>
      {/* <Title>Get 10% OFF</Title>

      <CustomButton sx={{width: 260, mt: '13px'}} variant="contained">
        Complete your profile
      </CustomButton> */}
      <CustomButton
        onClick={() => router.push('./')}
        sx={{width: 260, mt: '13px'}}
        variant="outlined"
      >
        Go to website
      </CustomButton>
    </Box>
  )
}
