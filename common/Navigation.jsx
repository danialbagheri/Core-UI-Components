import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import Image from 'next/image'
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import {useScrollTrigger} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {DesktopMenu, MenuDrawer} from './localComponents'
import {getRetrieveMenu} from '../../services'
import SearchModal from '../searchModal/SearchModal'
import logo from '../../public/logo.svg'
import {hideHeaderLogoState} from 'utils'
/* -------------------------------------------------------------------------- */

const WEBSITE = process.env.NEXT_PUBLIC_WEBSITE

function Navigation() {
  const router = useRouter()
  const hideLogo = hideHeaderLogoState(router)
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
              ? {xs: '0 30px', md: '5px 30px'}
              : {xs: '10px 30px', md: '20px 30px'},
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
              '&>img': {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: {
                  xs: 'translate(-50%,-50%)',
                  md: 'translate(-50%,-100%)',
                },
                display: {
                  xs: hideLogo && !trigger ? 'none' : 'block',
                  md: trigger ? 'none' : 'block',
                },
                width: {xs: 100, md: 150},
              },
            }}
          >
            {/* ------------------------ Menu Icon for mobile view ----------------------- */}
            <IconButton
              aria-label="open drawer"
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: {md: 'none'},
                height: '40px',
                width: '40px',
                px: 1,
              }}
            >
              {mobileOpen ? (
                <CloseIcon color="primary" />
              ) : (
                <MenuIcon color="primary" />
              )}
            </IconButton>
            <IconButton
              onClick={() => setOpenSearchModal(true)}
              sx={{
                display: {xs: 'block', md: 'none'},
                height: '40px',
                width: '40px',
                ml: -1,
                mr: 2,
                px: 1,
              }}
            >
              <SearchIcon color="primary" />
            </IconButton>
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

            {/* --------------------------- Logo in mobile view -------------------------- */}

            <Image
              alt={WEBSITE}
              height="47"
              onClick={() => router.push('./')}
              src={logo}
              width="100"
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
