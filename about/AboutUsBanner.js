import Image from 'next/image'
import {Box} from '@mui/material'
export default function AboutUsBanner() {
  return (
    <Box>
      <Image
        alt="Frequently Asked Questions"
        src="/about-us/about-us-banner.jpg"
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
