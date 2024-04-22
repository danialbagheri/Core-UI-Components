import * as React from 'react'
import {Container} from '@mui/material'
import {spotlight, SpotlightNames} from 'constants/spotlight'
import {Header} from 'components/spotlight'
import Link from 'next/link'

interface DataType {
  info: {id: string; imageSrc: string; alt: string; title: string}
  person: SpotlightNames
}

export function SpotlightHomePageBanner() {
  const [data, setData] = React.useState<DataType>({
    info: {id: '', alt: '', imageSrc: '', title: ''},
    person: SpotlightNames.AALIYAH,
  })
  const randomSelectSpotlight = () => {
    const spotlightKeys = Object.keys(spotlight)
    const spotlightCount = Object.keys(spotlight).length
    const randomKeyIndex = Math.floor(Math.random() * spotlightCount)
    const person = spotlightKeys[randomKeyIndex] as SpotlightNames

    setData({info: spotlight[person].header, person})
  }

  React.useEffect(randomSelectSpotlight, [])

  return (
    <Container>
      <Link href={`/spotlight/${data.person}`}>
        <Header data={data.info} page="homePage" />
      </Link>
    </Container>
  )
}
