import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import Image from 'next/image'
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import {Link, useScrollTrigger} from '@mui/material'
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

  console.log('appState.icons::::', appState.icons)

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
            p: trigger
              ? {xs: '0 10px', md: '5px 30px'}
              : {xs: '10px 10px', md: '20px 30px'},
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
              <Box
                aria-label="open drawer"
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{
                  display: {md: 'none'},
                  height: '30px',
                  width: '30px',
                }}
              >
                {mobileOpen ? (
                  <CloseIcon color="primary" />
                ) : (
                  <Image
                    alt={menuIcon?.name}
                    height={30}
                    src={menuIcon?.svg_icon}
                    style={{
                      contentFit: 'cover',
                      filter:
                        'invert(43%) sepia(75%) saturate(2599%) hue-rotate(2deg) brightness(112%) contrast(84%)',
                    }}
                    width={30}
                  />
                )}
              </Box>

              <Box
                onClick={() => setOpenSearchModal(true)}
                sx={{
                  display: {xs: 'block', md: 'none'},
                  height: '30px',
                  width: '30px',
                  mr: 2,
                  px: 1,
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <Image
                  alt={searchIcon?.name}
                  fill
                  src={searchIcon?.svg_icon}
                  style={{
                    contentFit: 'cover',
                    filter:
                      'invert(43%) sepia(75%) saturate(2599%) hue-rotate(2deg) brightness(112%) contrast(84%)',
                  }}
                />
              </Box>
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
          trigger={trigger}
        />
      </Box>
    </>
  )
}

export default Navigation
