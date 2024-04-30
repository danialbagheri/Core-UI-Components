import * as React from 'react'
import {Box, Button, Popper, Typography, useTheme} from '@mui/material'
import {styled} from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import {useRouter} from 'next/router'
import Link from 'next/link'
import MegaMenu from './MegaMenu'

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

export const NavItem = props => {
  const {data} = props
  const theme = useTheme()
  const router = useRouter()
  const [expanded, setExpanded] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState(null)

  const slug = router.query.slug
  const open = Boolean(anchorEl)
  const openSubMegaMenu = Boolean(subMenuAnchorEl)
  const id = open ? data.id : undefined
  const isMegaMenu = data.is_mega_menu
  const isHoveredOnMegaMenu =
    (open && isMegaMenu) || (openSubMegaMenu && isMegaMenu)

  const openPopover = (e, isSubmenu = false) => {
    if (e.currentTarget) {
      if (isSubmenu) {
        setSubMenuAnchorEl(e.currentTarget)
      } else {
        setAnchorEl(e.currentTarget)
      }
    }
  }

  const closePopover = (e, isSubmenu = false) => {
    if (isSubmenu) {
      setSubMenuAnchorEl(null)
    } else {
      setAnchorEl(null)
      setSubMenuAnchorEl(null)
    }
  }

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <Box onMouseLeave={() => closePopover(false)}>
      <Button
        key={data.id}
        onMouseEnter={openPopover}
        sx={{
          color: '#333',
          fontSize: '16px',
          fontWeight: 'regular',
          textTransform: 'capitalize',
          textWrap: 'nowrap',
          minWidth: 'fit-content',
          maxWidth: 'fit-content',
          '& a': {
            textDecoration: 'none',
            fontWeight:
              slug === data.slug || isHoveredOnMegaMenu ? 'bold' : 'regular',
          },
          '&::before': !isMegaMenu
            ? {
                content: "''",
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 0,
                height: '2px',
                backgroundColor: theme.palette.primary.main,
                transition: 'width 0.4s ease',
              }
            : {},
          background: isHoveredOnMegaMenu ? theme.palette.beige.main : 'none',
          '&:hover': {
            background: isHoveredOnMegaMenu ? theme.palette.beige.main : 'none',
          },
          '&:hover::before': {
            width: '100%',
          },
          '&:active': {
            bgcolor: theme.palette.beige.main,
          },
        }}
      >
        <Link href={data.url}>{data.name}</Link>
      </Button>
      {data.is_mega_menu ? (
        <MegaMenu
          anchorEl={anchorEl}
          closePopover={closePopover}
          megaMenuItems={data.mega_menu_items}
          open={open}
        />
      ) : null}
      {data.sub_menus.length ? (
        <Popper
          anchorEl={anchorEl}
          id={id}
          open={open}
          placement="bottom"
          sx={{
            zIndex: 2000,
            boxShadow: '0 1px 7px 0 rgba(0, 0, 0, 0.15)',
            bgcolor: '#FFF',
            p: '20px',
          }}
        >
          <Box
            sx={{
              '&>.MuiPaper-root:not(:first-of-type)': {
                borderTop: '1px solid ',
                borderColor: 'rgba(255, 107, 0, 0.10)',
              },
            }}
          >
            {data.sub_menus.map(item => (
              <Accordion
                expanded={expanded === item.id}
                key={item.id}
                onChange={handleChange(item.id)}
                onMouseEnter={() => {
                  if (item.is_mega_menu) {
                    openPopover(true)
                  }
                }}
                onMouseLeave={() => {
                  if (item.is_mega_menu) {
                    closePopover(true)
                  }
                }}
                sx={{
                  mx: 3,
                }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  hasAnchor={item.sub_menus.length}
                  id="panel1d-header"
                  sx={{'& a': {textDecoration: 'none'}}}
                >
                  <Link href={item.url}>
                    <Typography
                      sx={{
                        color: '#333',
                        fontSize: '16px',
                        fontWeight: 'regular',
                        textTransform: 'capitalize',
                        textWrap: 'nowrap',
                        whiteSpace: 'nowrap',
                        minWidth: 'fit-content',
                        maxWidth: 'fit-content',
                        position: 'relative',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                </AccordionSummary>
                {item.is_mega_menu ? (
                  <MegaMenu
                    anchorEl={subMenuAnchorEl}
                    closePopover={closePopover}
                    megaMenuItems={item.mega_menu_items}
                    open={openSubMegaMenu}
                  />
                ) : null}
                {item.sub_menus.length ? (
                  <AccordionDetails sx={{pl: 5, bgcolor: '#FFF', py: 0}}>
                    <Box>
                      <Button
                        sx={{
                          color: '#333',
                          fontSize: '14px',
                          fontWeight: 'regular',
                          textTransform: 'capitalize',
                          textWrap: 'nowrap',
                          minWidth: 'fit-content',
                          maxWidth: 'fit-content',
                          position: 'relative',
                          p: '5px 8px',
                          pt: 0,
                          '& a': {
                            textDecoration: 'none',
                          },
                        }}
                      >
                        <Link href={item.url}>{item.name}</Link>
                      </Button>
                    </Box>
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
                            position: 'relative',
                            p: 2,
                          }}
                        >
                          <Link href={_item.url}>{_item.name}</Link>
                        </Button>
                      </Box>
                    ))}
                  </AccordionDetails>
                ) : null}
              </Accordion>
            ))}
          </Box>
        </Popper>
      ) : null}
    </Box>
  )
}
