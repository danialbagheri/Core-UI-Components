import {Box} from '@mui/material'
import {getBestSellerResults} from 'services'
import React from 'react'
import MySlider from '../MySlider'

export default function BestSellerSlider() {
  const [topSeller, setTopSeller] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  const getTopSellerHandler = async () => {
    try {
      const response = await getBestSellerResults()
      setTopSeller(response)
    } catch (error) {
      console.error('Error in getTopSellerHandler', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getTopSellerHandler()
  }, [])

  return (
    <Box sx={{mb: 15}}>
      {!loading && <MySlider items={topSeller?.items} title={'Best seller'} />}
    </Box>
  )
}
