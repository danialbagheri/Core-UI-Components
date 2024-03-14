import * as React from 'react'

import Popover from '@mui/material/Popover'
import {Box} from '@mui/material'

import {Title} from '../localShared'
import {InfoIcon} from 'components/icons'
import {popUpPasswordItems} from './UserDetails'

export function InfoPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <InfoIcon
        aria-haspopup="true"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{position: 'absolute', left: 'calc(100% + 7px)', top: '34px'}}
      />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableRestoreFocus
        id="mouse-over-popover"
        onClose={handlePopoverClose}
        open={open}
        sx={{
          pointerEvents: 'none',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'flex-start',
            p: '20px',
          }}
        >
          <Title subTitle sx={{fontSize: 14, mb: 3}}>
            Please provide the following details
          </Title>
          {popUpPasswordItems.map(item => (
            <Title key={item.id} subTitle sx={{fontSize: 14}}>
              {item.text}
            </Title>
          ))}
        </Box>
      </Popover>
    </div>
  )
}
