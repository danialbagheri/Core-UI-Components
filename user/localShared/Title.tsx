import * as React from 'react'

import {SxProps, Typography} from '@mui/material'

interface PropsTypes {
  children: React.ReactNode
  sx?: SxProps
  subTitle?: boolean | string
}

export function Title(props: PropsTypes) {
  const {children, sx, subTitle} = props
  const isSubtitle = Boolean(subTitle)
  return (
    <Typography
      sx={{
        color: isSubtitle ? '#226F61' : '#000',
        textAlign: 'center',
        fontSize: isSubtitle ? '18px' : '32px',
        fontStyle: 'normal',
        fontWeight: isSubtitle ? 500 : 700,
        lineHeight: 'normal',
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}
