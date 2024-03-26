import {Box, Typography, useTheme} from '@mui/material'
import {Heart} from 'components/icons'
import {CustomButton} from 'components/shared'
import Link from 'next/link'
import * as React from 'react'

export function DashboardFavLink() {
  const theme = useTheme()

  return (
    <Box
      className="centralize"
      sx={{
        flexDirection: 'column',
        gap: '18px',
        width: '100%',
        mt: {xs: 0, md: 11},
      }}
    >
      <Box className="centralize" gap={4}>
        <Heart sx={{fill: theme.palette.primary.main}} />
        <Typography fontSize="24px" fontWeight="700">
          My Wishlist
        </Typography>
      </Box>
      <CustomButton
        onClick={e => e.preventDefault()}
        sx={{
          fontSize: 14,
          fontWeight: 500,
          height: 36,
          width: 192,
          '& a': {textDecoration: 'none'},
        }}
        variant="contained"
      >
        <Link href="/user/dashboard/favorite-variants">Go to My Wishlist</Link>
      </CustomButton>
    </Box>
  )
}
