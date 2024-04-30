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
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {DesktopMenu, MenuDrawer} from './localComponents'
import SearchModal from '../searchModal/SearchModal'
import {hideHeaderLogoOrInfoState} from 'utils'
/* -------------------------------------------------------------------------- */

/* ------------------------------- Local Icons ------------------------------ */
import logo from '../../public/logo.svg'
import {Burger, Remove, Search} from 'components/icons'
import {SpotlightNames} from 'constants/spotlight'
/* -------------------------------------------------------------------------- */

const WEBSITE = process.env.NEXT_PUBLIC_WEBSITE
const initialNavItems = [
  {
    id: 2,
    slug: 'sun-protection',
    name: 'Sun Protection',
    text: '',
    url: '/products/categories/sun-protection',
    image: null,
    svg_image: null,
    is_mega_menu: false,
    is_active: true,
    sub_menus: [],
    position: 0,
  },
  {
    id: 8,
    slug: 'after-sun',
    name: 'After Sun',
    text: '',
    url: '/products/categories/after-sun',
    image: null,
    svg_image: null,
    is_mega_menu: false,
    is_active: true,
    sub_menus: [],
    position: 1,
  },
  {
    id: 9,
    slug: 'kids',
    name: 'Kids',
    text: '',
    url: '/products/categories/kids',
    image: null,
    svg_image: null,
    is_mega_menu: false,
    is_active: true,
    sub_menus: [],
    position: 2,
  },
  {
    id: 10,
    slug: 'tanning',
    name: 'Tanning',
    text: '',
    url: '/products/categories/tanning',
    image: null,
    svg_image: null,
    is_mega_menu: false,
    is_active: true,
    sub_menus: [],
    position: 3,
  },
  {
    id: 11,
    slug: 'health-care',
    name: 'Health Care',
    text: '',
    url: '/products/categories/health-care',
    image: null,
    svg_image: null,
    is_mega_menu: false,
    is_active: true,
    sub_menus: [],
    position: 4,
  },
  {
    id: 12,
    slug: '',
    name: 'Discover',
    text: '',
    url: '#',
    image: null,
    svg_image: null,
    is_mega_menu: true,
    is_active: true,
    mega_menu_items: [
      {
        id: 'be_sun_ready',
        name: 'Be Sun Ready',
        url: '/be-sun-ready',
        linkPosition: 1,
        photoPosition: 3,
        imageSrc: '/menu/discover/be-sun-ready.jpg',
      },
      {
        id: 'sun_journals',
        name: 'Sun Journals',
        url: '/advice',
        linkPosition: 2,
        photoPosition: 2,
        imageSrc: '/menu/discover/journal.jpg',
      },
      {
        id: 'sunshine_spotlight',
        name: 'Sunshine Spotlight',
        url: `/spotlight/${SpotlightNames.AALIYAH}`,
        imageSrc: '/menu/discover/spotlight.jpg',
        mobileImageSrc: 'menu/discover/spotlight-mobile.jpg',
        linkPosition: 3,
        photoPosition: 1,
      },
      {
        id: 'product_finder',
        name: 'Product Finder',
        url: '/product-finder',
        linkPosition: 4,
        photoPosition: 6,
        imageSrc: '/menu/discover/product-finder-mobile.jpg',
        mobileImageSrc: '/menu/discover/product-finder-mobile.jpg',
      },
      {
        id: 'about_us',
        name: 'About Us',
        url: '/about',
        linkPosition: 5,
        photoPosition: 4,
        imageSrc: '/menu/discover/about-us.jpg',
        mobileImageSrc: '/menu/discover/about-us-mobile.jpg',
      },
      {
        id: 'our_history',
        name: 'Our History',
        url: '/about/history',
        linkPosition: 6,
        photoPosition: 5,
        imageSrc: '/menu/discover/our-history-mobile.jpg',
        mobileImageSrc: '/menu/discover/our-history-mobile.jpg',
      },
    ],
    sub_menus: [],
    position: 5,
  },
  // {
  //   id: 12,
  //   slug: 'be-sun-ready',
  //   name: 'Be Sun Ready',
  //   text: '',
  //   url: '/be-sun-ready',
  //   image: null,
  //   svg_image: null,
  //   is_mega_menu: true,
  //   is_active: true,
  //   sub_menus: [],
  //   position: 5,
  // },
  // {
  //   id: 13,
  //   slug: 'advice',
  //   name: 'Advice',
  //   text: '',
  //   url: '/advice',
  //   image: null,
  //   svg_image: null,
  //   is_mega_menu: false,
  //   is_active: true,
  //   sub_menus: [],
  //   position: 6,
  // },
  // {
  //   id: 14,
  //   slug: 'about-us',
  //   name: 'About Us',
  //   text: '',
  //   url: '/about',
  //   image: null,
  //   svg_image: null,
  //   is_mega_menu: false,
  //   is_active: true,
  //   sub_menus: [],
  //   position: 7,
  // },
]

function Navigation() {
  const navItems = initialNavItems
  const router = useRouter()
  const {hideLogo} = hideHeaderLogoOrInfoState(router)
  const theme = useTheme()
  /* --------------------------------- States --------------------------------- */
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openSearchModal, setOpenSearchModal] = React.useState(false)
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
    url: '#',
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
      menuItemsEle.current?.getBoundingClientRect().width - 100 //100 is for padding of the element

    if (navItemsDetail.current.state === 'done' && containerWidth > 0) {
      let totalWidth = 50 //Initial padding
      let lastItemIndex = -1

      //Here we calculate the total width of all items and find the last item
      //ItemsWidth is calculated in the "useEffect" hook
      navItemsDetail.current.itemsWidth.forEach((width, i) => {
        if (totalWidth < containerWidth) {
          totalWidth += width
          lastItemIndex = i
        }
      })

      if (lastItemIndex > 0) {
        if (totalWidth > containerWidth) {
          //Here we shrink the nav items and put the overflowed items into "more" button
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

              // Logo styles in different situations
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

                zIndex: 10,
                cursor: 'pointer',

                '& #calypso_main_logo': {
                  width: {xs: 100, md: 150},
                },
              },
            }}
          >
            {/* ------------------------------ Website Logo ------------------------------ */}
            <Link href="/" id="nav_logo_container">
              <Image
                alt={WEBSITE}
                height="47"
                id="calypso_main_logo"
                src={logo}
                width="100"
              />
            </Link>

            {/* -------------------------------------------------------------------------- */}

            {/* ------------------------ Menu Icon for mobile view ----------------------- */}
            <Box className="centralize" gap={3}>
              {mobileOpen ? (
                <Box
                  onClick={handleDrawerToggle}
                  sx={{
                    position: 'absolute',
                    zIndex: '10',
                    display: {md: 'none'},
                  }}
                >
                  <Remove
                    sx={{
                      height: 40,
                      width: 40,
                      color: theme.palette.primary.main,
                    }}
                  />
                </Box>
              ) : (
                <Box
                  className="centralize"
                  sx={{
                    position: 'absolute',
                    gap: 3,
                    left: 0,
                    zIndex: '10',
                    display: {xs: 'flex', md: 'none !important'},
                  }}
                >
                  <Box className="centralize" onClick={handleDrawerToggle}>
                    <Burger
                      sx={{
                        height: 18,
                        width: 18,
                        color: theme.palette.primary.main,
                        display: 'inline',
                      }}
                    />
                  </Box>
                  <Box
                    className="centralize"
                    onClick={() => setOpenSearchModal(true)}
                  >
                    <Search
                      sx={{
                        width: 18,
                        height: 18,
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Box>
                </Box>
              )}
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
