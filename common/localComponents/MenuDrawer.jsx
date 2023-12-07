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
import {styled} from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import {useRouter} from 'next/router'
import {hoverStyle} from './NavItem'

const drawerWidth = '100%'

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
  const {setMobileOpen, mobileOpen, navItems, window, trigger} = props
  const [expanded, setExpanded] = React.useState(null)
  const theme = useTheme()
  const router = useRouter()

  const container =
    window !== undefined ? () => window().document.body : undefined

  const handleDrawerToggle = e => {
    e.stopPropagation()
    setMobileOpen(prevState => !prevState)
  }

  const handleChange = panel => (event, newExpanded) => {
    event.stopPropagation()
    setExpanded(newExpanded ? panel : false)
  }

  const accordionSummaryClickHandler = (subMenuLength, url) => {
    if (!subMenuLength) {
      router.push(url)
    }
  }

  const subMenuClickHandler = url => {
    router.push(url)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
      <List>
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
                  accordionSummaryClickHandler(item.sub_menus.length, item.url)
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
          top: 100,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            height: 'fit-content',
          },

          '&>.MuiPaper-root': {
            top: trigger ? 63 : 80,
          },

          '& .MuiBackdrop-root': {
            display: 'none',
          },
        }}
        variant="temporary"
      >
        {drawer}
      </Drawer>
    </nav>
  )
}
