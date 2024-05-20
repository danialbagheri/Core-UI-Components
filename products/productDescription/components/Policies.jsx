import {Box, Typography} from '@mui/material'
import {Contact, Return, Shipping} from 'components/icons'
import Link from 'next/link'
import React from 'react'

export function Policies() {
  return (
    <Box
      sx={{
        pt: '21px',
        px: '26px',
        pb: '31px',

        bgcolor: '#F2F9F8',

        borderRadius: '10px',

        display: 'grid',
        gridTemplateColumns: 'repeat(28px, auto)',
        columnGap: '10px',
        rowGap: '21px',

        justifyContent: 'flex-start',
      }}
    >
      <Shipping
        sx={{
          gridColumn: '1/2',
          gridRow: '1/2',
          width: 28,
        }}
      />
      <Box sx={{gridColumn: '2/3', gridRow: '1/2'}}>
        <Typography color="#226F61" fontSize={16} fontWeight={700}>
          Free Shipping
        </Typography>
        <Typography
          color="#226F61"
          fontSize={14}
          fontWeight={500}
          lineHeight="17px"
        >
          1 - 2 day free shipping on all orders above £25. UK postage and
          packaging £4.50
        </Typography>
      </Box>
      <Return sx={{gridColumn: '1/2', gridRow: '2/3', width: 28, height: 27}} />
      <Box
        sx={{
          gridColumn: '2/3',
          gridRow: '2/3',
          '& a': {color: '#226F61', fontWeight: 600, ml: 2},
        }}
      >
        <Typography color="#226F61" fontSize={16} fontWeight={700}>
          Return Policy
        </Typography>
        <Typography
          color="#226F61"
          fontSize={14}
          fontWeight={500}
          lineHeight="17px"
        >
          We offer a 30 day return & refund policy with a 100% money back
          guarantee
          <Link href="/returns-policy">Read more</Link>
        </Typography>
      </Box>
      <Contact sx={{gridColumn: '1/2', gridRow: '3/4', width: 28}} />
      <Box
        sx={{
          gridColumn: '2/3',
          gridRow: '3/4',
          alignSelf: 'center',
          '& a': {color: '#226F61', fontWeight: 600, ml: 2},
        }}
      >
        <Typography
          color="#226F61"
          fontSize={14}
          fontWeight={500}
          lineHeight="17px"
        >
          Contact our customer service team
          <Link href="/contact-us">Contact us</Link>
        </Typography>
      </Box>
    </Box>
  )
}
