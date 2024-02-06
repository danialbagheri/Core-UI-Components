import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import Image from 'next/image'
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import {Link, useScrollTrigger, useTheme} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {DesktopMenu, MenuDrawer} from './localComponents'
import {getRetrieveMenu} from '../../services'
import SearchModal from '../searchModal/SearchModal'
import logo from '../../public/logo.svg'
import {hideHeaderLogoOrInfoState} from 'utils'
import {AppContext} from '../appProvider'
import {assetsEndPoints, BURGER_ICON_ID, SEARCH_ICON_ID} from '../../utils'
import {ApiSvgIcon} from '../shared'
/* -------------------------------------------------------------------------- */

const WEBSITE = process.env.NEXT_PUBLIC_WEBSITE

function Navigation() {
  const router = useRouter()
  const {hideLogo} = hideHeaderLogoOrInfoState(router)
  /* --------------------------------- States --------------------------------- */
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openSearchModal, setOpenSearchModal] = React.useState(false)
  const [navItems, setNavItems] = React.useState([])
  const [shrinkNavItems, setShrinkNavItems] = React.useState([])
  const [moreButton, setMoreButton] = React.useState({
    id: 'more',
    image: null,
    is_active: true,
    is_mega_menu: false,
    name: 'More',
    position: 0,
    slug: '',
    sub_menus: [],
    svg_image: null,
    text: 'More',
    url: '',
  })
  const [appState] = React.useContext(AppContext)
  /* -------------------------------------------------------------------------- */

  /* ---------------------------------- Refs ---------------------------------- */
  const menuItemsEle = React.useRef(null)
  const navItemsDetail = React.useRef({state: null, itemsWidth: []})
  /* -------------------------------------------------------------------------- */
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: undefined,
  })

  const searchIcon = appState.icons[assetsEndPoints.userAccount]?.items.find(
    item => item.id === SEARCH_ICON_ID,
  )

  const menuIcon = appState.icons[assetsEndPoints.userAccount]?.items.find(
    item => item.id === BURGER_ICON_ID,
  )

  const setNavItemsHandler = () => {
    const containerWidth =
      menuItemsEle.current?.getBoundingClientRect().width - 100 //50 is for padding of the element

    if (navItemsDetail.current.state === 'done' && containerWidth > 0) {
      let widthSum = 50
      let lastItemIndex = -1
      navItemsDetail.current.itemsWidth.forEach((width, i) => {
        if (widthSum < containerWidth) {
          widthSum += width
          lastItemIndex = i
        }
      })

      if (lastItemIndex > 0) {
        if (widthSum > containerWidth) {
          const newNavItemsArr = navItems.slice(0, lastItemIndex)
          const newMoreBtnArr = moreButton
          newMoreBtnArr.sub_menus = navItems.slice(lastItemIndex)
          newNavItemsArr.push(newMoreBtnArr)
          setShrinkNavItems(newNavItemsArr)
          setMoreButton(newMoreBtnArr)
        } else {
          setShrinkNavItems(navItems)
        }
      }
    }
  }

  React.useEffect(() => {
    //To Do:::: This api doesn't work for cabana
    //    getMegaMenuProducts()
    //      .then(res => setProductsPageMegaMenu(res.items))
    //      .catch(err => console.error(err))

    getRetrieveMenu()
      .then(res => {
        setNavItems(res.sub_menus)
      })
      .catch(err => console.error(err))
  }, [])

  React.useEffect(() => {
    //Here we looking in app bar items and find which items is
    //overflowed from it's container and put them into "more" button.
    const container = menuItemsEle.current
    if (container && navItems.length) {
      const buttons = container.querySelectorAll('button')

      //Add all buttons width to "navItemsDetail" so we can use it on size changes
      if (navItemsDetail.current.state !== 'done') {
        buttons.forEach(btn => {
          const buttonRect = btn.getBoundingClientRect()
          navItemsDetail.current.itemsWidth.push(buttonRect.width)
        })
        navItemsDetail.current.state = 'done'
      }

      setNavItemsHandler()
    }
  }, [navItems, trigger])

  React.useEffect(() => {
    window.addEventListener('resize', setNavItemsHandler)
  }, [navItems])

  return (
    <>
      <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} />
      <Box sx={{display: 'flex'}}>
        <AppBar
          component="nav"
          sx={{
            bgcolor: '#FFF',
            boxShadow: trigger ? '0 1px 7px 0 rgba(0, 0, 0, 0.15)' : 'none',
            p: {xs: '0 10px', md: trigger ? '5px 30px' : '20px 30px'},
          }}
        >
          <Toolbar
            sx={{
              flexDirection: {
                xs: 'row',
                md: trigger ? 'row' : 'column',
              },
              maxWidth: '1400px',
              margin: '0 auto',
              width: '100%',
              minHeight: '55px !important',

              position: 'relative',

              //Calypso icon styles in different situations
              '&>#nav_logo_container': {
                position: {
                  xs: 'absolute',
                  md: trigger ? 'relative' : 'absolute',
                },
                left: {xs: '50%', md: trigger ? 0 : '50%'},
                top: '50%',
                transform: {
                  xs: 'translate(-50%,-50%)',
                  md: trigger ? 'unset' : 'translate(-50%,-100%)',
                },

                display: {
                  xs: hideLogo && !trigger ? 'none' : 'block',
                  md: 'block',
                },

                '&:hover': {boxShadow: 'none', bgcolor: 'unset'},
                '&>span': {display: 'none'},

                px: 0,

                '&>img': {width: {xs: 100, md: 150}},
              },
            }}
          >
            {/* ------------------------------ Calypso Logo ------------------------------ */}
            <Link href="/" id="nav_logo_container" sx={{}}>
              <Image alt={WEBSITE} height="47" src={logo} width="100" />
            </Link>

            {/* -------------------------------------------------------------------------- */}

            {/* ------------------------ Menu Icon for mobile view ----------------------- */}
            <Box className="centralize" gap={3}>
              {mobileOpen ? (
                <CloseIcon
                  color="primary"
                  onClick={handleDrawerToggle}
                  sx={{
                    width: 20,
                    height: 20,
                    fill: theme.palette.primary.main,
                  }}
                />
              ) : (
                <ApiSvgIcon
                  className="centralize"
                  htmlContent={menuIcon?.svg_icon_text}
                  onClick={handleDrawerToggle}
                  sx={{
                    width: 18,
                    height: 18,
                    fill: theme.palette.primary.main,
                    display: {md: 'none'},
                  }}
                />
              )}

              <ApiSvgIcon
                className="centralize"
                htmlContent={searchIcon?.svg_icon_text}
                onClick={() => setOpenSearchModal(true)}
                sx={{
                  width: 25,
                  height: 25,
                  display: {xs: 'block', md: 'none'},
                  fill: theme.palette.primary.main,
                  mr: 2,
                  px: 1,
                  position: 'relative',
                  cursor: 'pointer',
                }}
              />
            </Box>
            {/* -------------------------------------------------------------------------- */}

            {/* -------------------------- Desktop Size App bar -------------------------- */}
            <DesktopMenu
              menuItemsEle={menuItemsEle}
              navItems={navItems}
              setOpenSearchModal={setOpenSearchModal}
              shrinkNavItems={shrinkNavItems}
              trigger={trigger}
            />
            {/* -------------------------------------------------------------------------- */}
          </Toolbar>
        </AppBar>
        <MenuDrawer
          mobileOpen={mobileOpen}
          navItems={navItems}
          setMobileOpen={setMobileOpen}
        />
      </Box>
    </>
  )
}

export default Navigation
