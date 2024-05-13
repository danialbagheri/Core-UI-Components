import * as React from 'react'

import {Box, Typography} from '@mui/material'
import {CalypsoGirlDashboard} from 'components/icons'
import Link from 'next/link'
import Image from 'next/image'
// import {DashboardFavLink, ManageAccount, OrderHistory} from './components'

export function DashboardBody(props) {
  const {name} = props
  return (
    <Box
      className="centralize"
      sx={{flexDirection: 'column', gap: '17px', maxWidth: 355}}
    >
      <CalypsoGirlDashboard
        sx={{width: {xs: 145, md: 249}, height: {xs: 145, md: 249}}}
      />
      <Typography color="secondary" fontSize={24} fontWeight={700}>
        Nice to see you{name ? `, ${name}!` : ''}
      </Typography>
      <Typography color="secondary" fontSize={14} fontWeight={500}>
        If you&apos;re new to Calypso, you can enjoy a 10% discount on your
        first purchase. Plus, why not stay in the loop by subscribing to our
        newsletter and know about our newest products and sweet deals?
      </Typography>
      <Link href="/product-finder">
        <Box
          sx={{
            position: 'relative',
            height: {xs: 140, md: 152},
            width: {xs: '100%', md: 353},
            mt: '20px',
          }}
        >
          <Image
            alt="product-finder"
            fill
            sizes="(max-width: 600px) 90vw, 33vw"
            src="/productFinder/link.png"
            style={{objectFit: 'contain'}}
          />
        </Box>
      </Link>
    </Box>
  )
}
