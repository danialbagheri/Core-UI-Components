import {Box, Divider, Typography} from '@mui/material'
import {formatDate} from 'pages/user/dashboard/orders'
import {priceHandler} from 'utils'
import {OrderItem} from './OrderItem'
import Link from 'next/link'

const OrderInfo = props => {
  const {title, info} = props

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
          gap: 6,
        }}
      >
        <Typography fontSize={16} fontWeight={700}>
          {title}
        </Typography>
        <Typography fontSize={16}>{info}</Typography>
      </Box>
      <Divider />
    </>
  )
}

export function OrderDetails(props) {
  const {order, sx = {}} = props

  const renderProperPrice = ({price, currency}) => {
    if (price && currency) {
      return priceHandler({
        price,
        currency,
      })
    }
    return ''
  }

  const price = renderProperPrice({
    price: order?.total_price.amount,
    currency: order?.total_price.currency,
  })
  const refundPrice = renderProperPrice({
    price: order?.total_refunded?.amount,
    currency: order?.total_refunded?.currency,
  })
  const shippingPrice = renderProperPrice({
    price: order?.total_shipping_price?.amount,
    currency: order?.total_shipping_price?.currency,
  })
  const shippingRefundPrice = renderProperPrice({
    price: order?.total_refunded_shipping?.amount,
    currency: order?.total_refunded_shipping?.currency,
  })
  const tax = renderProperPrice({
    price: order?.total_tax?.amount,
    currency: order?.total_tax?.currency,
  })
  const date = formatDate(order?.created_at)

  const orderInformation = [
    {title: 'Date:', info: date},
    {title: 'Price:', info: price},
    {title: 'Tax:', info: tax},
    {title: 'Refund:', info: refundPrice},
    {title: 'Shipping price:', info: shippingPrice},
    {title: 'Shipping refund:', info: shippingRefundPrice},
  ]

  return (
    <Box
      sx={{
        ...sx,
        flexDirection: 'column',
        gap: 2,
        width: '100%',
      }}
    >
      {orderInformation.map((info, i) => (
        <OrderInfo info={info.info} key={i} title={info.title} />
      ))}
      <Box
        sx={{
          '& a': {textDecoration: 'none', mt: 5},
        }}
      >
        <Typography fontSize={16} fontWeight={700}>
          Order items:
        </Typography>
        <Box
          sx={{
            mt: 5,
            '&>hr:last-child': {
              display: 'none',
            },
          }}
        >
          {order?.items.map((item, i) => (
            <>
              <Link
                href={`/products/${item['product-slug']}?sku=${item.sku}`}
                key={i}
              >
                <OrderItem item={item} />
              </Link>
              <Divider sx={{borderColor: '#F2F2F2', my: '12px'}} />
            </>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
