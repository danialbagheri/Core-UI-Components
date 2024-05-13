import * as React from 'react'
import {Box, Popper, Typography} from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'

interface PropsType {
  anchorEl: HTMLElement | null | undefined
  open: boolean
  closePopover: () => void
  megaMenuItems: {
    id: string
    name: string
    url: string
    linkPosition: number
    photoPosition: number
    imageSrc: string
  }[]
}

export default function MegaMenu(props: PropsType) {
  const {anchorEl, open, megaMenuItems, closePopover} = props
  const desktopPhotoItems = megaMenuItems.filter(item => item.photoPosition < 5)

  return (
    <Popper
      anchorEl={anchorEl}
      open={open}
      placement="bottom"
      sx={{
        zIndex: 2000,
        boxShadow: '0 1px 7px 0 rgba(0, 0, 0, 0.15)',
        bgcolor: '#FFF',
        p: '33px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '920px',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            '& a': {textDecoration: 'none'},
          }}
        >
          {megaMenuItems.map(item => (
            <Link href={item.url} key={item.id} onClick={closePopover}>
              <Typography
                fontSize={16}
                fontWeight={400}
                sx={{'&:hover': {fontWeight: 700}}}
              >
                {item.name}
              </Typography>
            </Link>
          ))}
        </Box>
        <Box className="centralize" sx={{gap: '10px'}}>
          {desktopPhotoItems.map(item => (
            <Link
              href={item.url}
              key={item.id}
              style={{order: item.photoPosition, textDecoration: 'none'}}
            >
              <Box
                className="centralize"
                sx={{
                  flexDirection: 'column',
                  gap: '14px',
                  '&:hover': {
                    '& img': {
                      transform: 'scale(1.05)',
                      transition: 'ease-in-out 0.3s',
                    },
                    '& p': {
                      fontWeight: 700,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 158,
                    height: 166,
                    borderRadius: '10px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    alt={item.name}
                    fill
                    sizes="33vw"
                    src={item.imageSrc || '/images/placeholder.png'}
                    style={{objectFit: 'cover'}}
                  />
                </Box>
                <Typography
                  sx={{textAlign: 'center', fontSize: 16, fontWeight: 400}}
                >
                  {item.name}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Popper>
  )
}
