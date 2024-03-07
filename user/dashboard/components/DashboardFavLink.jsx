import {Box, Typography, useTheme} from '@mui/material'
import {AppContext} from 'components/appProvider'
import {CustomButton} from 'components/shared'
import Link from 'next/link'
import * as React from 'react'
import {assetsEndPoints, WISH_LIST_FILL_ICON_ID} from 'utils'

export function DashboardFavLink() {
  const [appState] = React.useContext(AppContext)
  const theme = useTheme()
  const {userAccount} = assetsEndPoints

  const heartIcon = appState.icons?.[userAccount]?.items.find(
    icon => icon.id === WISH_LIST_FILL_ICON_ID,
  )

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
        <Box
          dangerouslySetInnerHTML={{
            __html: heartIcon?.svg_icon_text,
          }}
          sx={{
            height: 24,
            '& svg': {width: 26, height: 24, fill: theme.palette.primary.main},
          }}
        />
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
        <Link href="/user/dashboard/favorite-products">Go to My Wishlist</Link>
      </CustomButton>
    </Box>
  )
}
