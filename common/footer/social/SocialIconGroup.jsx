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
      return <SocialIcon index={index} item={item} key={index} />
    })
  return (
    <>
      <Typography
        color="white"
        sx={{fontWeight: 600, textTransform: 'uppercase'}}
        variant="h3"
      >
        Follow us
      </Typography>
      <Box sx={{mt: 3, display: 'flex', gap: 2}}>{iconItems}</Box>
    </>
  )
}
