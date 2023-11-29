import * as React from 'react'
import {Box, Button, Popover, Typography, useTheme} from '@mui/material'
import {styled} from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import {hexToRgba} from '../../../utils/hexToRgba'
import {useRouter} from 'next/router'

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

export const NavItem = props => {
  const {data} = props
  const theme = useTheme()
  const router = useRouter()
  const [expanded, setExpanded] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const borderColor = hexToRgba(theme.palette.primary.main, 0.3)

  const open = Boolean(anchorEl)
  const id = open ? data.id : undefined

  const handleClick = url => {
    console.log('clicked::::', url)
    // if (url) {
    //   router.push(url)
    // }
  }

  const openPopover = event => {
    setAnchorEl(event.currentTarget)
  }

  const closePopover = e => {
    e.preventDefault()
    setAnchorEl(null)
  }

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const accordionSummaryOnClick = (subMenuLength, url) => {
    if (!subMenuLength) {
      router.push(url)
    }
  }

  const subMenuClickHandler = url => {
    router.push(url)
  }

  return (
    <Box sx={{zIndex: 5000}}>
      <Button
        key={data.id}
        onClick={() => handleClick(data.url)}
        onMouseEnter={openPopover}
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
        {data.name}
      </Button>
      {data.sub_menus.length ? (
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          disableRestoreFocus
          id={id}
          onClose={closePopover}
          open={open}
          slotProps={{
            paper: {
              sx: {
                boxShadow: 'none',
                backgroundColor: theme.palette.primary.light,
                zIndex: 100,
              },
            },
          }}
        >
          <Box
          // onMouseLeave={closePopover}
          >
            {data.sub_menus.map(item => (
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
                  onClick={() =>
                    accordionSummaryOnClick(item.sub_menus.length, item.url)
                  }
                >
                  <Typography
                    sx={{
                      color: '#333',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      textWrap: 'nowrap',
                      whiteSpace: 'nowrap',
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
                    <Box onClick={() => subMenuClickHandler(item.url)}>
                      <Button
                        sx={{
                          color: '#333',
                          fontSize: '14px',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          textWrap: 'nowrap',
                          minWidth: 'fit-content',
                          maxWidth: 'fit-content',
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
                          }}
                        >
                          {_item.name}
                        </Button>
                      </Box>
                    ))}
                  </AccordionDetails>
                ) : null}
              </Accordion>
            ))}
          </Box>
        </Popover>
      ) : null}
    </Box>
  )
}
