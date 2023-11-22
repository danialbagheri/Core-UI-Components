import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import SearchIcon from '@mui/icons-material/Search'

import Image from 'next/image'
import logo from '../../public/logo.svg'
import {Typography, useScrollTrigger} from '@mui/material'
import {MenuDrawer, MenuIcons, NavItem} from './localComponents'
import {useRouter} from 'next/router'
import {getRetrieveMenu} from '../../services'
import SearchModal from '../searchModal/SearchModal'

const website = process.env.NEXT_PUBLIC_WEBSITE

function Navigation(props) {
  const {window} = props
  const router = useRouter()
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
  const menuItemsEle = React.useRef(null)
  const navItemsDetail = React.useRef({state: null, itemsWidth: []})

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: window ? window() : undefined,
  })

  const renderNavItems = () => {
    if (shrinkNavItems.length) {
      return shrinkNavItems.map(item => <NavItem data={item} key={item.key} />)
    }
    return navItems.map(item => <NavItem data={item} key={item.key} />)
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
      const containerWidth = container.getBoundingClientRect().width - 50 //50 is for padding of the element

      //Add all buttons width to "navItemsDetail" so we can use it on size changes
      if (navItemsDetail.current.state !== 'done') {
        buttons.forEach(btn => {
          const buttonRect = btn.getBoundingClientRect()
          navItemsDetail.current.itemsWidth.push(buttonRect.width)
        })
        navItemsDetail.current.state = 'done'
      }

      if (navItemsDetail.current.state === 'done') {
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
  }, [navItems, trigger])

  return (
    <>
      <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} />
      <Box sx={{display: 'flex'}}>
        <AppBar
          component="nav"
          sx={{
            bgcolor: '#FFF',
            boxShadow: 'none',
            p: trigger ? '10px 30px' : '20px 30px',
          }}
        >
          <Toolbar
            sx={{
              flexDirection: {
                xs: 'row',
                sm: trigger ? 'row' : 'column',
              },
              maxWidth: '1400px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            <IconButton
              aria-label="open drawer"
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mr: 2, display: {sm: 'none'}}}
            >
              <MenuIcon />
            </IconButton>
            <Box
              onClick={() => router.push('/')}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: {xs: '100%', sm: trigger ? 'unset' : '100%'},
                '&>img': {
                  transform: {
                    xs: 'none',
                    sm: trigger ? 'none' : 'translate(-50px)',
                  },
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
                  width: {xs: '120px', md: '176px'},
                  p: '8px 16px',
                  borderRadius: '27px',
                  display: {xs: 'none', sm: trigger ? 'none' : 'flex'},
                  cursor: 'pointer',
                  height: '32px',
                }}
              >
                <Typography color="primary">Search</Typography>
                <SearchIcon color="primary" />
              </Box>
              {/* -------------------------------------------------------------------------- */}

              {/* ---------------------------------- LOGO ---------------------------------- */}
              <Image alt={website} height="47" src={logo} width="150" />
              {/* -------------------------------------------------------------------------- */}

              {/* ---------------------------------- Icons --------------------------------- */}
              <MenuIcons
                sx={{display: {xs: 'flex', sm: trigger ? 'none' : 'flex'}}}
                trigger={trigger}
              />
              {/* -------------------------------------------------------------------------- */}
            </Box>
            <Box
              ref={menuItemsEle}
              sx={{
                display: {xs: 'none', sm: 'flex'},
                mt: '10px',
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
            <MenuIcons
              setOpenSearchModal={setOpenSearchModal}
              sx={{display: {xs: 'none', sm: trigger ? 'flex' : 'none'}}}
              trigger={trigger}
            />
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
