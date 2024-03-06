import Image from 'next/image'
import {Box} from '@mui/material'

export default function HistoryBanner() {
  // Declare a new state variable, which we'll call "count"
  return (
    <Box>
      <Image
        alt="Calypso Brand History product range"
        height={300}
        sizes="100vw"
        src="/history/historybanner.jpg"
        style={{
          width: '100%',
          height: 'auto',
        }}
        width={500}
      />
    </Box>
  )
}
