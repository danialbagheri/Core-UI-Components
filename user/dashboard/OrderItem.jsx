import Image from 'next/image'

import {Box, Typography} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {priceHandler} from 'utils'

export function OrderItem(props) {
  const {item} = props

  return (
    <Box className="centralize" sx={{gap: '14px'}}>
      <Box
        sx={{
          width: 94,
          minWidth: 94,
          height: 110,
          position: 'relative',
        }}
      >
        <Image
          alt={item.name || 'Product image'}
          fill
          sizes="20vw"
          src={item.image_original_source || ''}
          styles={{objectFit: 'contain'}}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          sx={{
            fontSize: '26px',
            fontWeight: 700,
            color: '#226F61',
          }}
        >
          {priceHandler({
            price: item.total_price.amount,
            currency: item.total_price.currency,
          })}
        </Typography>
        <Typography>{item.name}</Typography>
        <Typography sx={{fontSize: '16px', fontWeight: 700}}>
          x{item.quantity}
        </Typography>
      </Box>
      <ArrowForwardIosIcon />
    </Box>
  )
}
