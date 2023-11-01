import React from 'react'
import {Box, Typography} from '@mui/material'
import {getIcons} from 'services'
import SocialIcon from './SocialIcon'

export default function SocialIconGroup() {
  const [socialIcons, setSocialIcons] = React.useState([])
  React.useEffect(() => {
    getIcons('social').then(res => {
      setSocialIcons(res)
    })
  }, [])

  const iconItems =
    socialIcons &&
    socialIcons.items?.map((item, index) => {
      return <SocialIcon item={item} index={index} />
    })
  return (
    <>
      <Typography
        varinat="h3"
        color="white"
        sx={{fontWeight: 600, textTransform: 'uppercase'}}
      >
        Follow us
      </Typography>
      <Box sx={{mt: 3, display: 'flex', gap: 2}}>{iconItems}</Box>
    </>
  )
}
