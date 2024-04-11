import Image from 'next/image'

import {Box, Typography} from '@mui/material'

import {DataType} from './SpotlightBody'
import {
  BUTTON,
  IMAGE,
  PARAGRAPH,
  PRODUCT_IMAGE,
  QUOTE,
  SOURCE,
  TITLE,
} from 'constants/spotlight'
import {QuoteEnd, QuoteStart} from 'components/icons'
import {CustomButton} from 'components/shared'

interface PropsType {
  data: DataType
  primaryColor: string
}

export const renderProperComponent = (props: PropsType) => {
  const {data, primaryColor} = props

  switch (data.type) {
    case PARAGRAPH:
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '28px',
            px: {xs: '30px', lg: 0},
          }}
        >
          {data.content.map(content => (
            <Typography
              fontSize={{xs: 18, lg: 28}}
              fontWeight={400}
              key={content.id}
              lineHeight={{xs: '25px', lg: '39px'}}
            >
              {content.data}
            </Typography>
          ))}
        </Box>
      )
    case QUOTE:
      return (
        <Box sx={{px: {xs: '30px', lg: 0}}}>
          {data.content.map(content => (
            <Box key={content.id}>
              <QuoteStart
                sx={{
                  fill: primaryColor,
                  width: {xs: 45, lg: 64},
                  height: {xs: 39, lg: 56},
                  mb: {xs: '24px', lg: '28px'},
                }}
              />
              <Typography
                color="#80A8C7"
                fontSize={{xs: 32, lg: 50}}
                fontWeight={800}
                lineHeight={{xs: '39px', lg: '60.45px'}}
              >
                {content.data}
              </Typography>
              <QuoteEnd
                sx={{
                  fill: primaryColor,
                  width: {xs: 45, lg: 64},
                  height: {xs: 39, lg: 56},
                  mx: 'calc(100% - 56px)',
                  mt: {xs: '18px', lg: '22px'},
                }}
              />
            </Box>
          ))}
        </Box>
      )
    case IMAGE:
      return (
        <Box
          className="centralize"
          sx={{flexDirection: 'column', gap: '22px', width: '100%'}}
        >
          {data.content.map(content => {
            if (content.type === SOURCE) {
              const isProductImage = data.typeDetail === PRODUCT_IMAGE

              return (
                <Box
                  key={content.id}
                  sx={{
                    width: {xs: isProductImage ? 291 : '100%', lg: '100%'},
                    height: {xs: isProductImage ? 291 : 364, lg: 536},
                    position: 'relative',
                    borderRadius: {
                      xs: isProductImage ? 10 : 0,
                      lg: 10,
                    },
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    alt={content.id}
                    fill
                    src={content.data}
                    style={{objectFit: 'cover'}}
                  />
                </Box>
              )
            } else if (content.type === TITLE) {
              return (
                <Typography
                  fontSize={{xs: 24, lg: 32}}
                  fontWeight={700}
                  key={content.id}
                  lineHeight="45px"
                >
                  {content.data}
                </Typography>
              )
            } else if (content.type === BUTTON) {
              return (
                <CustomButton
                  key={content.id}
                  onClick={() => {}}
                  sx={{borderRadius: 1}}
                  variant="contained"
                >
                  {content.data}
                </CustomButton>
              )
            }
          })}
        </Box>
      )
    default:
      return <Box></Box>
  }
}
