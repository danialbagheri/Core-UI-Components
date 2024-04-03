import {Box, Typography} from '@mui/material'
import Link from 'next/link'
import {Container} from './Container'
import {siteMapData} from 'constants/footer'

export function SiteMap({sx = {}}) {
  return (
    <Container sx={{...sx}}>
      <Typography color="primary" fontSize={22} fontWeight={700} mb="18px">
        Sitemap
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '23px',
          flexWrap: {xs: 'wrap', lg: 'nowrap'},
        }}
      >
        {siteMapData.map(col => (
          <Box key={col.id} sx={{'& a': {textDecoration: 'none'}}}>
            {col.items.map(item => (
              <Link href={item.link} key={item.id}>
                <Typography
                  color="primary"
                  fontSize={14}
                  fontWeight={600}
                  lineHeight="30px"
                  noWrap
                >
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
  )
}
