import * as React from 'react'

import {Box, Divider} from '@mui/material'
import {DashboardFavLink, ManageAccount, OrderHistory} from './components'
import {AppContext} from 'components/appProvider'

export function Body(props) {
  const {orders} = props
  const [appState] = React.useContext(AppContext)

  console.log('🚀 🙂  appState:::', appState)

  return (
    <Box
      sx={{
        py: {xs: 8, md: 20},
        px: {xs: 6, md: 0},
        display: 'flex',
        flexDirection: {xs: 'column', md: 'row'},
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: {xs: 0, md: '52px'},
        maxWidth: {xs: 400, md: '100%'},
        m: '0 auto',
      }}
    >
      <Box width="100%">
        <OrderHistory orders={orders} />
        <Divider
          sx={{
            borderColor: '#F1F1F1',
            mt: 11,
            mb: 8,
            width: 'calc(100%  - 28px)',
            mx: 'auto',
            display: {xs: 'block', md: 'none'},
          }}
        />
        <DashboardFavLink />
      </Box>
      <Divider
        sx={{
          borderColor: '#F1F1F1',
          mt: 11,
          mb: 8,
          width: 'calc(100%  - 28px)',
          mx: 'auto',
          display: {xs: 'block', md: 'none'},
        }}
      />
      <ManageAccount />
    </Box>
  )
}
