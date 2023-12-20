import {Box, Typography, useTheme} from '@mui/material'
import Image from 'next/image'

export function AccountCreated(props) {
  const {data} = props
  const greenCheckIcon = data.icons.items[0]
  const theme = useTheme()

  return (
    <>
      <Box
        className="centralize"
        sx={{
          p: '28px',
          bgcolor: theme.palette.palm.main,
          borderRadius: '11px',
          gap: 5,
          maxWidth: 340,
        }}
      >
        <Box sx={{border: '2px solid #FFF', borderRadius: '50%'}}>
          <Image
            alt={greenCheckIcon.name}
            height={30}
            src={greenCheckIcon.svg_icon}
            width={30}
          />
        </Box>
        <Typography color="#FFF" sx={{fontSize: 20, fontWeight: 600}}>
          You have successfully created your account!
        </Typography>
      </Box>
      <Box></Box>
    </>
  )
}
