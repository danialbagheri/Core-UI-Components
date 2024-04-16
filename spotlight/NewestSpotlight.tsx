import {Box, Typography} from '@mui/material'

import {spotlight} from 'constants/spotlight'
import NewSpotlight from './components/NewSpotlight'

interface PropsType {
  currentSpotlight: string
}

export function NewestSpotlight(props: PropsType) {
  const {currentSpotlight} = props
  const otherSpotlights = Object.keys(spotlight).filter(
    item => item !== currentSpotlight,
  )

  return (
    <Box className="centralize" sx={{flexDirection: 'column', gap: '71px'}}>
      <Typography
        fontSize={{xs: 32, md: 42}}
        fontWeight={600}
        lineHeight={{xs: '40px', md: '60px'}}
      >
        View newest Spotlights
      </Typography>
      <Box
        className="centralize"
        sx={{gap: '30px', mb: '100px', maxWidth: 750, flexWrap: 'wrap'}}
      >
        {otherSpotlights.map(item => (
          <NewSpotlight item={item} key={item} />
        ))}
      </Box>
    </Box>
  )
}
