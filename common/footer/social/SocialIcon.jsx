import React from 'react'
import Image from 'next/image'
import {Box, Link} from '@mui/material'

export default function SocialIcon(props) {
  const {item} = props
  const [bgColor, setBgColor] = React.useState('transparent')

  const handleMouseOver = () => {
    setBgColor('golden.main')
  }
  return (
    <Box
      onMouseLeave={() => {
        setBgColor('transparent')
      }}
      onMouseOver={handleMouseOver}
      sx={{
        border: '1px solid white',
        borderRadius: '50%',
        p: 2,
        backgroundColor: `${bgColor}`,
        cursor: 'pointer',
      }}
    >
      <Link href={item.url} rel="noopener noreferrer" target="_blank">
        <Image alt={item.name} height={20} src={item.svg_icon} width={20} />
      </Link>
    </Box>
  )
}
