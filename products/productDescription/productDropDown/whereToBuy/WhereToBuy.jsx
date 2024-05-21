import React from 'react'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Link from 'next/link'
export default class WhereToBuy extends React.Component {
  render() {
    const {stores, childProducts} = this.props

    let thisProductStore
    if (stores.length >= 1) {
      thisProductStore = stores.map((store, index) => {
        if (store.stockist.name === 'Amazon') {
          return null
        }
        return (
          <Box height={50} key={index} sx={{position: 'relative'}} width={100}>
            <Link href={store.url} target="_blank">
              <Image
                alt={store.stockist.name}
                fill
                sizes="100vw"
                src={store.stockist.logo}
                style={{objectFit: 'contain'}}
              />
            </Link>
          </Box>
        )
      })
    } else {
      thisProductStore = <li>All good pharmacies.</li>
    }

    const products = <p>{childProducts} is available from:</p>

    return (
      <div>
        <div>{products}</div>
        <Box sx={{display: 'flex', my: 5, gap: 2, flexWrap: 'wrap'}}>
          {thisProductStore}
        </Box>
      </div>
    )
  }
}
