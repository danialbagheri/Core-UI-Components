import React from 'react'
import {DataType} from '../SpotlightBody'
import {Box, useTheme} from '@mui/material'
import {Column} from 'constants/spotlight'
import {renderProperComponent} from '../utils'

interface PropsType {
  data: DataType[]
}

export function DesktopView(props: PropsType) {
  const {data} = props
  const theme = useTheme()
  const columns = Object.values(Column)

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '70px',

        pt: '60px',
      }}
    >
      {columns.map(column => {
        const columnData = data.filter(_data => _data.position === column)
        return (
          <Box
            key={column}
            sx={{
              width: '50%',
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '56px',
              flexDirection: 'column',
            }}
          >
            {columnData.map(data =>
              renderProperComponent({
                data,
                primaryColor: theme.palette.primary.main,
              }),
            )}
          </Box>
        )
      })}
    </Box>
  )
}
