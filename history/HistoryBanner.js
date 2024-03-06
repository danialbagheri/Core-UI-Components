import Image from 'next/image'
import {Box} from '@mui/material'

export default function HistoryBanner() {
  // Declare a new state variable, which we'll call "count"
  return (
    <Box>
      <Image
        alt="Calypso Brand History product range"
        src="/history/historybanner.jpg"
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        width={500}
        height={300}
      />
    </Box>
  )
}
