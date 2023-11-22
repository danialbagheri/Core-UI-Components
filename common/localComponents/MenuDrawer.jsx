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
import {hexToRgba} from '../../../utils/hexToRgba'

const drawerWidth = 300

const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  width: 300,

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
  backgroundColor: theme.palette.primary.light,

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
  const theme = useTheme()
  const borderColor = hexToRgba(theme.palette.primary.main, 0.3)

  const container =
    window !== undefined ? () => window().document.body : undefined

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  const handleChange = panel => (event, newExpanded) => {
    event.stopPropagation()
    setExpanded(newExpanded ? panel : false)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
      <List
        sx={{'& li:not(:first-child)': {borderTop: `1px solid ${borderColor}`}}}
      >
        {navItems.map(item => (
          <ListItem disablePadding key={item.id}>
            <Accordion
              expanded={expanded === item.id}
              key={item.id}
              onChange={handleChange(item.id)}
              sx={{
                '&:not(:first-child)': {
                  borderTop: '1px solid',
                  borderColor,
                },
                mx: 3,
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                hasAnchor={item.sub_menus.length}
                id="panel1d-header"
              >
                <Typography
                  sx={{
                    color: '#333',
                    fontSize: '16px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    textWrap: 'nowrap',
                    minWidth: 'fit-content',
                    maxWidth: 'fit-content',
                  }}
                >
                  {item.name}
                </Typography>
              </AccordionSummary>
              {item.sub_menus.length ? (
                <AccordionDetails
                  sx={{pl: 5, bgcolor: theme.palette.primary.light, py: 0}}
                >
                  {item.sub_menus.map(_item => (
                    <Box key={_item.id}>
                      <Button
                        sx={{
                          color: '#333',
                          fontSize: '14px',
                          textTransform: 'capitalize',
                          textWrap: 'nowrap',
                          minWidth: 'fit-content',
                          maxWidth: 'fit-content',
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
          display: {xs: 'block', sm: 'none'},
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: theme.palette.primary.light,
          },
        }}
        variant="temporary"
      >
        {drawer}
      </Drawer>
    </nav>
  )
}
