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
  const containerRef = React.useRef<HTMLDivElement>(null)

  const onResize = React.useCallback(() => {
    const containerWidth = containerRef.current.clientWidth
    if (containerWidth < 1138) {
      setView('mobile')
    } else {
      setView('desktop')
    }
  }, [])

  React.useEffect(() => {
    onResize()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize)
    }
  }, [])

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: {xs: 'center', lg: 'flex-start'},
        flexDirection: 'column',
        pt: {xs: 0, lg: '112px'},
        pb: '141px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: {xs: 'column', lg: 'row'},
          gap: '43px',
          maxWidth: 560,
          mt: {xs: -8, lg: 0},
        }}
      >
        <Box
          sx={{
            width: {xs: 128, lg: 200},
            height: {xs: 128, lg: 200},
            minWidth: {xs: 128, lg: 200},
            position: 'relative',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <Image alt={personData.alt} fill src={personData.photo} />
        </Box>
        <Box>
          <Typography
            fontSize={{xs: 24, lg: 36}}
            fontWeight={700}
            lineHeight="33px"
          >
            {personData.name}
          </Typography>
          <Typography
            fontSize={{xs: 20, lg: 26}}
            fontWeight={400}
            lineHeight="36px"
          >
            {personData.social_id}
          </Typography>
          <Typography
            color="primary"
            fontSize={{xs: 17, lg: 24}}
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
