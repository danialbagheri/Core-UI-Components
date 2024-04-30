import * as React from 'react'
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {styled} from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

const drawerWidth = '100%'

const hoverStyle = bgcolor => {
  return {
    position: 'relative',
    '&::before': {
      content: "''",
      position: 'absolute',
      bottom: -5,
      left: 0,
      width: 0,
      height: '2px',
      minHeight: '2px',
      backgroundColor: bgcolor,
      transition: 'width 0.4s ease',
    },
    '&:hover': {background: 'none', fontWeight: 'bold'},
    '&:hover::before': {
      width: '100%',
    },
  }
}

const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  width: '100%',

  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled(props => (
  <MuiAccordionSummary
    expandIcon={props.hasAnchor ? <ExpandMoreIcon /> : null}
    {...props}
  />
))(({theme}) => ({
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
}))

export function MenuDrawer(props) {
  const {setMobileOpen, mobileOpen, navItems, window} = props
  const [expanded, setExpanded] = React.useState(null)
  const [megaMenu, setMegaMenu] = React.useState(null)
  const [showMegaMenu, setShowMegaMenu] = React.useState(false)

  const theme = useTheme()
  const router = useRouter()

  const container =
    window !== undefined ? () => window().document.body : undefined

  const handleDrawerToggle = e => {
    e?.stopPropagation()
    setMobileOpen(prevState => !prevState)
    setMegaMenu(null)
    setShowMegaMenu(false)
  }

  const handleChange = panel => (event, newExpanded) => {
    event?.stopPropagation()
    setExpanded(newExpanded ? panel : false)
  }

  const accordionSummaryClickHandler = ({
    isSubMenu,
    isMegaMenu,
    url,
    megaMenu,
  }) => {
    if (isMegaMenu) {
      setMegaMenu(megaMenu)
      setShowMegaMenu(true)
    } else if (!isSubMenu) {
      router.push(url)
      handleDrawerToggle()
    }
  }

  const subMenuClickHandler = url => {
    router.push(url)
    handleDrawerToggle()
  }

  const backHandler = e => {
    e.stopPropagation()
    setShowMegaMenu(false)
    setTimeout(() => setMegaMenu(null), 225)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
      <Box
        className="centralize"
        sx={{
          flexDirection: 'column',
          gap: '8px',
          pb: megaMenu ? '95px' : 0,
          transform: `translateX(${showMegaMenu ? '0' : '-100%'})`,
          transition: 'transform 225ms cubic-bezier(0, 0, 0.58, 1) 0ms',
        }}
      >
        {megaMenu?.map(item => (
          <Link
            href={item.url}
            key={item.id}
            style={{textDecoration: 'none', order: item.photoPosition}}
          >
            <Box
              sx={{
                width: 353,
                height: 103,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '10px',
              }}
            >
              <Image
                alt={item.name}
                fill
                src={item?.mobileImageSrc || ''}
                style={{objectFit: 'cover'}}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  left: '19px',
                  bottom: '5px',
                  color: '#FFF',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                {item.name}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>

      <List sx={{py: 0, ...(megaMenu ? {display: 'none'} : {})}}>
        {navItems.map(item => (
          <ListItem disablePadding key={item.id}>
            <Accordion
              expanded={expanded === item.id}
              key={item.id}
              onChange={handleChange(item.id)}
              sx={{
                mx: 3,
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                hasAnchor={item.sub_menus.length}
                id="panel1d-header"
                onClick={() =>
                  accordionSummaryClickHandler({
                    isSubMenu: item.sub_menus.length,
                    isMegaMenu: item.is_mega_menu,
                    url: item.url,
                    megaMenu: item.mega_menu_items,
                  })
                }
              >
                <Typography
                  sx={{
                    color: '#333',
                    fontSize: '16px',
                    fontWeight: 'regular',
                    textTransform: 'capitalize',
                    textWrap: 'nowrap',
                    minWidth: 'fit-content',
                    maxWidth: 'fit-content',
                    ...hoverStyle(theme.palette.primary.main),
                  }}
                >
                  {item.name}
                </Typography>
              </AccordionSummary>
              {item.sub_menus.length ? (
                <AccordionDetails sx={{pl: 5, py: 0}}>
                  <Box onClick={() => subMenuClickHandler(item.url)}>
                    <Button
                      sx={{
                        color: '#333',
                        fontSize: '14px',
                        fontWeight: 'regular',
                        textTransform: 'capitalize',
                        textWrap: 'nowrap',
                        minWidth: 'fit-content',
                        maxWidth: 'fit-content',
                        pb: 0,
                        pt: 2,
                        mb: 2,
                        ...hoverStyle(theme.palette.primary.main),
                      }}
                    >
                      {item.name}
                    </Button>
                  </Box>
                  {item.sub_menus.map(_item => (
                    <Box
                      key={_item.id}
                      onClick={() => subMenuClickHandler(_item.url)}
                    >
                      <Button
                        sx={{
                          color: '#333',
                          fontSize: '14px',
                          textTransform: 'capitalize',
                          textWrap: 'nowrap',
                          minWidth: 'fit-content',
                          maxWidth: 'fit-content',
                          pb: 0,
                          pt: 2,
                          mb: 2,
                          ...hoverStyle(theme.palette.primary.main),
                        }}
                      >
                        {_item.name}
                      </Button>
                    </Box>
                  ))}
                </AccordionDetails>
              ) : null}
            </Accordion>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <nav>
      <Drawer
        container={container}
        ModalProps={{
          keepMounted: true,
        }}
        onClick={handleDrawerToggle}
        onClose={handleDrawerToggle}
        open={mobileOpen}
        sx={{
          display: {xs: 'block', md: 'none'},
          pb: '95px',
          top: 100,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            height: 'fit-content',
          },

          '& .MuiBackdrop-root': {
            display: 'none',
          },
        }}
        variant="temporary"
      >
        <Box
          sx={{
            height: 66,
            minHeight: 66,
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: '18px',
          }}
        >
          <Box onClick={backHandler}>
            {megaMenu ? <KeyboardBackspaceIcon color="primary" /> : null}
          </Box>
          <Box>
            <CloseIcon color="primary" />
          </Box>
        </Box>
        {drawer}
      </Drawer>
    </nav>
  )
}
