import {Box, Typography} from '@mui/material'
import React from 'react'
import {DesktopView, MobileView} from './components'
import {Column} from 'constants/spotlight'
import Image from 'next/image'

export interface ContentType {
  data: string
  id: string
  type: string
  url?: string
}

export interface DataType {
  id: string
  type: string
  typeDetail?: string
  content: ContentType[]
  position: Column.COLUMN_1 | Column.COLUMN_2
  order: number
}

interface PersonDataType {
  alt: string
  id: string
  name: string
  photo: string
  profession: string
  social_id: string
}

export interface SpotlightBodyType {
  data: DataType[]
  personData: PersonDataType
}

export function SpotlightBody(props: SpotlightBodyType) {
  const {data, personData} = props
  const [view, setView] = React.useState<'mobile' | 'desktop'>('mobile')

  const onResize = React.useCallback(() => {
    const windowWidth = window.innerWidth

    if (windowWidth < 900) {
      setView('mobile')
    } else {
      setView('desktop')
    }
  }, [])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      onResize()
      window.addEventListener('resize', onResize)
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: {xs: 'center', md: 'flex-start'},
        flexDirection: 'column',
        pt: {xs: 0, md: '112px'},
        pb: '141px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: {xs: 'column', md: 'row'},
          gap: '43px',
          maxWidth: 450,
          mt: {xs: -8, md: 0},
        }}
      >
        <Box
          sx={{
            width: 124,
            height: 124,
            minWidth: 124,
            position: 'relative',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <Image alt={personData.alt} fill src={personData.photo} />
        </Box>
        <Box>
          <Typography
            fontSize={{xs: 24, md: 28}}
            fontWeight={700}
            lineHeight="33px"
          >
            {personData.name}
          </Typography>
          <Typography
            fontSize={{xs: 20, md: 22}}
            fontWeight={400}
            lineHeight="36px"
          >
            {personData.social_id}
          </Typography>
          <Typography
            color="primary"
            fontSize={{xs: 17, md: 18}}
            fontWeight={700}
            mt="15px"
          >
            {personData.profession}
          </Typography>
        </Box>
      </Box>

      {view === 'mobile' ? (
        <MobileView data={data} />
      ) : (
        <DesktopView data={data} />
      )}
    </Box>
  )
}
