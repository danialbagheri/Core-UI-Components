import {Box} from '@mui/material'
import {InfoPopover} from './InfoPopover'
import {CustomOutlinedInput} from 'components/shared'

export function SignUpFields({
  data,
  setData,
  error,
  infoIcon,
  popUpPasswordItems,
}) {
  const changeHandler = (value, field) => {
    setData(prev => ({...prev, [field]: value}))
  }

  const fullNameChangeHandler = e => {
    const value = e.target.value
    const firstSpaceIndex = value.indexOf(' ')

    if (firstSpaceIndex !== -1) {
      const first_name = value.slice(0, firstSpaceIndex)
      const last_name = value.slice(firstSpaceIndex + 1)

      setData(prev => ({...prev, first_name, last_name}))
    }
  }

  return (
    <Box sx={{width: '100%', mt: '36px', maxWidth: 280}}>
      <CustomOutlinedInput
        error={error.first_name}
        label="Full name"
        onChange={fullNameChangeHandler}
        placeholder="Full name"
        type="text"
      />
      <Box sx={{position: 'relative'}}>
        <CustomOutlinedInput
          error={error.password}
          label="Password"
          onChange={e => changeHandler(e.target.value, 'password')}
          placeholder="Password"
          sx={{mt: 5}}
          type="password"
          value={data.password}
        />
        <InfoPopover
          infoIcon={infoIcon}
          popUpPasswordItems={popUpPasswordItems}
        />
      </Box>
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
