import Image from 'next/image'
import {Box} from '@mui/material'
export default function AboutUsBanner() {
  return (
    <Box>
      <Image
        alt="Frequently Asked Questions"
        height={300}
        sizes="100vw"
        src="/about-us/about-us-banner.jpg"
        style={{
          width: '100%',
          height: 'auto',
        }}
        width={500}
      />
    </Box>
  )
}
