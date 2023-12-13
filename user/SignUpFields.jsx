import {Box} from '@mui/material'
import {CustomOutlinedInput} from './localShared'

export function SignUpFields() {
  return (
    <Box sx={{width: '100%', mt: '36px', maxWidth: 280}}>
      <CustomOutlinedInput
        label="First name"
        onChange={e => console.log(e.target.value)}
        placeholder="First name"
        type="text"
      />
      <CustomOutlinedInput
        label="Last name"
        onChange={e => console.log(e.target.value)}
        placeholder="Last name"
        sx={{mt: 5}}
        type="text"
      />
      <CustomOutlinedInput
        label="Phone number"
        onChange={e => console.log(e.target.value)}
        placeholder="Phone number"
        sx={{mt: 5}}
        type="tel"
      />
      <CustomOutlinedInput
        label="Email address"
        onChange={e => console.log(e.target.value)}
        placeholder="Email address"
        sx={{mt: 5}}
        type="email"
      />
      <CustomOutlinedInput
        onChange={e => console.log(e.target.value)}
        placeholder="Re-Email address"
        sx={{mt: 2}}
        type="email"
      />
    </Box>
  )
}
