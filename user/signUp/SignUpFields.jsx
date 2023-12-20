import {Box} from '@mui/material'
import {CustomOutlinedInput} from '../localShared'

export function SignUpFields({data, setData, error}) {
  const changeHandler = (value, field) => {
    setData(prev => ({...prev, [field]: value}))
  }

  return (
    <Box sx={{width: '100%', mt: '36px', maxWidth: 280}}>
      <CustomOutlinedInput
        error={error.first_name}
        label="First name"
        onChange={e => changeHandler(e.target.value, 'first_name')}
        placeholder="First name"
        type="text"
        value={data.first_name}
      />
      <CustomOutlinedInput
        error={error.last_name}
        label="Last name"
        onChange={e => changeHandler(e.target.value, 'last_name')}
        placeholder="Last name"
        sx={{mt: 5}}
        type="text"
        value={data.last_name}
      />
      <CustomOutlinedInput
        error={error.password}
        label="Password"
        onChange={e => changeHandler(e.target.value, 'password')}
        placeholder="Password"
        sx={{mt: 5}}
        type="password"
        value={data.password}
      />
      <CustomOutlinedInput
        error={error.email}
        label="Email address"
        onChange={e => changeHandler(e.target.value, 'email')}
        placeholder="Email address"
        sx={{mt: 5}}
        type="email"
        value={data.email}
      />
    </Box>
  )
}
