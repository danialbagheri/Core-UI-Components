import * as React from 'react'
/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {NavItem} from './NavItem'
import {AppBarIcons} from './AppBarIcons'
import {ApiSvgIcon} from '../../shared'
import {AppContext} from '../../appProvider'
import {assetsEndPoints, SEARCH_ICON_ID} from '../../../utils'

/* -------------------------------------------------------------------------- */

export function DesktopMenu(props) {
  const {trigger, setOpenSearchModal, shrinkNavItems, menuItemsEle, navItems} =
    props
  const [appState] = React.useContext(AppContext)
  const theme = useTheme()

  const searchIcon = appState.icons[assetsEndPoints.userAccount]?.items.find(
    item => item.id === SEARCH_ICON_ID,
  )

  const renderNavItems = () => {
    if (shrinkNavItems.length) {
      return shrinkNavItems.map(item => <NavItem data={item} key={item.key} />)
    }
    return navItems.map(item => <NavItem data={item} key={item.key} />)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: {xs: 'flex-end', md: 'space-between'},
          alignItems: 'center',
          width: {xs: '100%', md: trigger ? 'unset' : '100%'},
          position: 'relative',
          '&>img': {
            display: {xs: 'none', md: trigger ? 'block' : 'none'},
          },
        }}
      >
        {/* ------------------------------ Search field ------------------------------ */}
        <Box
          bgcolor="primary.light"
          onClick={() => setOpenSearchModal(true)}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '170px',
            p: '8px 16px',
            borderRadius: '27px',
            display: {xs: 'none', md: trigger ? 'none' : 'flex'},
            cursor: 'pointer',
            height: '32px',
          }}
        >
          <Typography color="primary">Search</Typography>
          <ApiSvgIcon
            className="centralize"
            htmlContent={searchIcon?.svg_icon_text}
            sx={{
              width: 15,
              height: 15,
              fill: theme.palette.primary.main,

              position: 'relative',
            }}
          />
        </Box>
        {/* -------------------------------------------------------------------------- */}

        {/* ---------------------------------- Icons --------------------------------- */}
        <AppBarIcons
          setOpenSearchModal={setOpenSearchModal}
          sx={{display: {xs: 'flex', md: trigger ? 'none' : 'flex'}}}
          trigger={trigger}
        />
        {/* -------------------------------------------------------------------------- */}
      </Box>
      <Box
        ref={menuItemsEle}
        sx={{
          display: {xs: 'none', md: 'flex'},
          mt: trigger ? 0 : '15px',
          px: '20px',
          flexGrow: 1,
          textAlign: 'center',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: {xs: '10px', lg: '20px'},
        }}
      >
        {renderNavItems()}
      </Box>
      <AppBarIcons
        setOpenSearchModal={setOpenSearchModal}
        sx={{display: {xs: 'none', md: trigger ? 'flex' : 'none'}}}
        trigger={trigger}
      />
    </>
  )
}
