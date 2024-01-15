import Image from 'next/image'

import {Box, Divider, Typography} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import {monthArr, priceHandler} from '../../../../utils'

export function OrderHistory(props) {
  const {orders} = props

  const formatDate = date => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = monthArr[d.getMonth()]
    const day = d.getDate()
    return `${day} ${month} ${year}`
  }

  return (
    <Box sx={{width: '100%'}}>
      <Typography sx={{fontSize: '24px', fontWeight: 700, mb: {xs: 8, md: 6}}}>
        Your order history
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 6}}>
        {orders.length ? (
          orders.map(order => (
            <Box key={order.created_at}>
              <Typography
                color="primary.main"
                sx={{fontSize: 14, fontWeight: 700}}
              >
                {formatDate(order.created_at)}
              </Typography>
              <Box
                sx={{
                  p: '18px 30px',
                  border: '2px solid #F2F2F2',
                  borderRadius: '10px',
                  '&>hr:last-child': {
                    display: 'none',
                  },
                }}
              >
                {order.items.map((item, i) => (
                  <>
                    <Box
                      className="centralize"
                      key={item.sku + i}
                      sx={{gap: '14px'}}
                    >
                      <Image
                        alt={item.name || 'Product image'}
                        height={110}
                        src={item.image_original_source || ''}
                        width={94}
                      />
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
                    <Divider sx={{borderColor: '#F2F2F2', my: '12px'}} />
                  </>
                ))}
              </Box>
            </Box>
          ))
        ) : (
          <Box>Empty STATE</Box>
        )}
      </Box>
    </Box>
  )
}
