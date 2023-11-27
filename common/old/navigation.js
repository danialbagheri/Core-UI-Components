import {useEffect, useState} from 'react'
import {useShopify} from '../../hooks'
import logo from '../../public/logo.svg'
import SearchBar from '../../general/searchbar'
// import Link from 'next/link'
import ActiveLink from '../active-link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBars,
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'

// import MegaMenu from '../megaMenu'
import {SearchModal} from 'components/searchModal'
import {getMegaMenuProducts} from 'services'
import {getRetrieveMenu} from '../../../services'
import {Box} from '@mui/material'
import Image from 'next/image'

const website = process.env.NEXT_PUBLIC_WEBSITE

function Navigation() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [openSearchModal, setOpenSearchModal] = useState(false)
  // const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [
    // productsPageMegaMenu,
    setProductsPageMegaMenu,
  ] = useState([])
  const {openCart} = useShopify()

  useEffect(() => {
    const navbar = document.getElementsByClassName('navbar-fixed-top')[0]

    window.onscroll = () => {
      if (window.scrollY >= 10) {
        navbar.style.position = 'fixed'
        navbar.style.top = '0'
        navbar.style.boxShadow = '0 0 4px 2px rgba(0,0,0,0.3)'
      } else {
        navbar.style.position = 'relative'
        navbar.style.marginTop = '0'
        navbar.style.boxShadow = 'none'
      }
    }
  }, [])

  useEffect(() => {
    //To Do:::: This api doesn't work for cabana
    getMegaMenuProducts()
      .then(res => setProductsPageMegaMenu(res.items))
      .catch(err => console.error(err))

    getRetrieveMenu()
      .then(res => {
        setMenuItems(res.sub_menus)
      })
      .catch(err => console.error(err))
  }, [])

  const openResponsiveMenu = () => {
    setMobileMenu(!mobileMenu)
  }

  function CloseMobileMenu() {
    setMobileMenu(false)
  }

  return (
    <>
      <SearchBar visibilitySetter={setSearch} visible={search} />
      <nav
        className="navbar navbar-fixed-top"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div className="navbar-content">
          <Box className="navbar-brand" href="/">
            <Image alt={website} height="47" src={logo} width="150" />
          </Box>

          <ul
            className={
              mobileMenu ? 'navbar-nav responsive fade-in' : 'navbar-nav'
            }
          >
            {menuItems.length
              ? menuItems.map(item => (
                  <ActiveLink
                    className="nav-link"
                    href={item.url}
                    itemProp="url"
                    key={item.id}
                    onClick={() => CloseMobileMenu()}
                  >
                    {item.name}
                  </ActiveLink>
                ))
              : null}
          </ul>
          <div className="icon-holder">
            <button
              aria-label="Search"
              className="search-icon"
              onClick={() => setOpenSearchModal(true)}
            >
              <FontAwesomeIcon
                className="calypso-orange-text"
                icon={faSearch}
              />
              {openSearchModal ? (
                <SearchModal setOpenSearchModal={setOpenSearchModal} />
              ) : null}
            </button>
            <button
              aria-label="open Cart"
              className="basket-icon"
              onClick={openCart}
            >
              <FontAwesomeIcon
                className="calypso-orange-text"
                icon={faShoppingCart}
              />
            </button>

            <button
              aria-label="Menu"
              className="burgerMenu"
              onClick={openResponsiveMenu}
            >
              {/* <i className="fa fa-bars" /> */}
              <FontAwesomeIcon className="calypso-orange-text" icon={faBars} />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

// WithRouter enables React Router state management
export default Navigation
