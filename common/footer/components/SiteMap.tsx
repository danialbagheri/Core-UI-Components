import {Box, Typography} from '@mui/material'
import Link from 'next/link'
import {Container} from './Container'

const siteMapData = [
  {
    id: 'site_map_col_1',
    items: [
      {
        id: 'sun_protection',
        text: 'Sun protection',
        link: '/products/categories/sun-protection',
      },
      {
        id: 'kids',
        text: 'Kids',
        link: '/products/categories/kids',
      },
      {
        id: 'health_care',
        text: 'Health care',
        link: '/products/categories/health-care',
      },
      {
        id: 'after_sun',
        text: 'After sun',
        link: '/products/categories/after-sun',
      },
      {
        id: 'tanning',
        text: 'Tanning',
        link: '/products/categories/tanning',
      },
    ],
  },
  {
    id: 'site_map_col_2',
    items: [
      {
        id: 'be_sun_reade',
        text: 'Be sun ready',
        link: '/be-sun-ready',
      },
      {
        id: 'advice',
        text: 'Advice',
        link: '/advice',
      },
      {
        id: 'about_us',
        text: 'About us',
        link: '/about',
      },
      {
        id: 'contact_us',
        text: 'Contact us',
        link: '/contact-us',
      },
    ],
  },
  {
    id: 'site_map_col_3',
    items: [
      {
        id: 'faq',
        text: 'FAQ',
        link: '/faq',
      },
      {
        id: 'terms_and_conditions',
        text: 'Terms & conditions',
        link: '/terms-conditions',
      },
      {
        id: 'privacy_policy',
        text: 'Privacy policy',
        link: '/privacy-policy',
      },
      {
        id: 'returns_policy',
        text: 'Returns policy',
        link: '/returns-policy',
      },
    ],
  },
]

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
