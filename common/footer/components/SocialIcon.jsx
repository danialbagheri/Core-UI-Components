import React from 'react'
import {Box, Link, useTheme} from '@mui/material'

export default function SocialIcon(props) {
  const {item} = props
  const theme = useTheme()

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '50%',
        p: 2,
        cursor: 'pointer',
        width: 35,
        height: 35,
        position: 'relative',
        '&:hover': {
          scale: '1.1',
        },
      }}
    >
      <Link href={item.url} target="_blank">
        <Box
          dangerouslySetInnerHTML={{__html: item.svg_icon_text}}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -40%)',
            '& path': {fill: `${theme.palette.primary.main} !important`},
            '& svg': {width: 22, height: 22},
          }}
        />
      </Link>
    </Box>
  )
}
