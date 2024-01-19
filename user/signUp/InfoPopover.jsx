import * as React from 'react'

import Image from 'next/image'

import Popover from '@mui/material/Popover'
import {Box} from '@mui/material'

import {Title} from '../localShared'

export function InfoPopover(props) {
  const {popUpPasswordItems, infoIcon} = props
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
      <Image
        alt={infoIcon.name || ''}
        aria-haspopup="true"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        height={20}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        src={infoIcon.svg_icon || ''}
        style={{position: 'absolute', left: 'calc(100% + 7px)', top: '34px'}}
        width={20}
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
