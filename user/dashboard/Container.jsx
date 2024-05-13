import {Box} from '@mui/material'

import {SideBar} from './SideBar'
import {DashboardBreadCrumbs} from './DashboardBreadCrumbs'

export function Container(props) {
  const {route, sx = {}, children, mobileFooter, breadcrumbs} = props

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: {xs: 280, md: 711},
        m: '0 auto',
        pt: {xs: 6, md: 21},
        pb: 21,
        gap: {xs: '38px', md: '77px'},

        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: {xs: 'center', md: 'flex-start'},
        flexDirection: {xs: 'column-reverse', md: 'row'},

        '&>#user_details_girl_icon': {
          width: {xs: 145, md: 290},
          height: {xs: 145, md: 290},
        },

        ...sx,
      }}
    >
      {mobileFooter}
      <SideBar route={route} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'column',
          gap: '36px',
          width: '100%',
        }}
      >
        <DashboardBreadCrumbs breadcrumbs={breadcrumbs} />
        {children}
      </Box>
    </Box>
  )
}
