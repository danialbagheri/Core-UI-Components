import {useState} from 'react'

import ShareIcon from '@mui/icons-material/Share'
import {Box, IconButton, Typography} from '@mui/material'

import SharingSocialIcons from './SharingSocialIcons'

export default function ShareButton({text, media}) {
  const [displayIcon, setDisplayIcon] = useState(false)

  function showSharingIcons() {
    setDisplayIcon(!displayIcon)
  }

  const icons =
    displayIcon === false ? (
      <Box
        onClick={showSharingIcons}
        sx={{display: 'flex', alignItems: 'center'}}
      >
        <IconButton
          color="primary"
          sx={{'& svg': {width: {xs: 17, md: 25}, height: {xs: 18, md: 28}}}}
        >
          <ShareIcon />
        </IconButton>
        <Typography color="primary" sx={{display: {xs: 'block', md: 'none'}}}>
          Share
        </Typography>
      </Box>
    ) : (
      <SharingSocialIcons
        media={media}
        showSharingIcons={showSharingIcons}
        text={text}
      />
    )
  return <div>{icons}</div>
}
