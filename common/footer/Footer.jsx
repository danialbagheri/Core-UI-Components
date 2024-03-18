import {Box, useTheme} from '@mui/material'
import {
  CopyRight,
  Divider,
  PaymentMethods,
  SiteMap,
  SocialMedia,
  SubscribeForm,
} from './components'

export function Footer() {
  // const {showSubscription} = props
  const theme = useTheme()
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        bgcolor: theme.palette.calypsoBeige.main,
        py: 19,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1270,
          display: 'flex',
          flexWrap: {xs: 'wrap', lg: 'nowrap'},
          justifyContent: {xs: 'center', lg: 'space-between'},
          alignItems: 'center',
          flexDirection: {xs: 'column', lg: 'row'},
          gap: {xs: '60px', lg: '90px'},
          px: {xs: 0, sm: 8, lg: 10},
          m: '0 auto',
        }}
      >
        <SiteMap sx={{order: {xs: 5, lg: 1}}} />
        <SubscribeForm sx={{order: {xs: 1, lg: 2}}} />
        <Divider sx={{order: 2, display: {xs: 'block', lg: 'none'}}} />
        <SocialMedia sx={{order: {xs: 3, lg: 3}}} />
        <Divider sx={{order: 4, display: {xs: 'block', lg: 'none'}}} />
      </Box>
      <Box sx={{px: {xs: 0, sm: 8, lg: 10}}}>
        <Divider sx={{mx: 'auto', mt: {xs: 13, lg: 15}}} />
        <PaymentMethods />
        <Divider sx={{mx: 'auto'}} />
        <CopyRight />
      </Box>
    </Box>
  )
}
