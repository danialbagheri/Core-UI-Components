import {Box, Typography} from '@mui/material'
import React from 'react'
import SocialIcon from './SocialIcon'
import {getIcons} from 'services'
import {Container} from './Container'

export function SocialMedia({sx = {}}) {
  const [socialIcons, setSocialIcons] = React.useState([])
  React.useEffect(() => {
    getIcons('social').then(res => {
      setSocialIcons(res)
    })
  }, [])
  return (
    <Container sx={{...sx}}>
      <Typography
        color="primary"
        fontSize={34}
        fontWeight={700}
        textAlign="center"
      >
        #FindTheFeeling
      </Typography>
      <Typography
        fontSize={16}
        fontWeight={500}
        mt="7px"
        sx={{color: '#7F2E00'}}
        textAlign="center"
      >
        Share your moments with us on social media
      </Typography>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {socialIcons?.items?.length
          ? socialIcons.items.map((item, index) => (
              <SocialIcon index={index} item={item} key={index} />
            ))
          : null}
      </Box>
    </Container>
  )
}
