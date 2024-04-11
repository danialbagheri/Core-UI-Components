import React from 'react'
import {DataType} from '../SpotlightBody'
import {Box, useTheme} from '@mui/material'

import {renderProperComponent} from '../utils'

interface PropsType {
  data: DataType[]
}

export function MobileView(props: PropsType) {
  const {data} = props
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

        maxWidth: 500,
        gap: '25px',
        pt: '60px',
      }}
    >
      {data.map(item => {
        return (
          <Box key={item.id} sx={{order: item.order, width: '100%'}}>
            {renderProperComponent({
              data: item,
              primaryColor: theme.palette.primary.main,
            })}
          </Box>
        )
      })}
    </Box>
  )
}
