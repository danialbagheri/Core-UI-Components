import {Box} from '@mui/material'
import Image from 'next/image'
import React from 'react'

const iconsSrc = [
  {id: 'logo', src: '/footer/logo.png'},
  {id: 'visa', src: '/footer/visa.png'},
  {id: 'paypal', src: '/footer/paypal.png'},
  {id: 'applePay', src: '/footer/apple-pay.png'},
  {id: 'googlePay', src: '/footer/google-pay.png'},
]
export function PaymentMethods() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 484,

        py: '13px',
        px: {xs: '32px', md: '62px'},

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        m: '0 auto',
      }}
    >
      {iconsSrc.map(icon => (
        <Box key={icon.id} sx={{width: 44, height: 32, position: 'relative'}}>
          <Image
            alt={icon.id}
            fill
            sizes="(max-width: 600px) 20vw, 5vw"
            src={icon.src}
            style={{objectFit: 'cover'}}
          />
        </Box>
      ))}
    </Box>
  )
}
