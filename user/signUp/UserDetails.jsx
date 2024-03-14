import * as React from 'react'
import {BASE_URL} from '../../../constants/servicesConstants'
import {Box} from '@mui/material'
import {CustomLink, Title} from '../localShared'
import {SignUpFields} from './SignUpFields'
import {AppContext} from '../../appProvider/AppProvider'
import {CustomButton} from 'components/shared'

const INITIAL_STATE = {
  email: '',
  password: '',
  re_password: '',
  first_name: '',
  last_name: '',
}

export const popUpPasswordItems = [
  {id: 1, text: '8-16 characters'},
  {id: 2, text: 'lower case characters'},
  {id: 3, text: 'upper case characters'},
  {id: 4, text: 'digits(0 - 9)'},
]

export function UserDetails({setSteps}) {
  const [data, setData] = React.useState({
    ...INITIAL_STATE,
  })
  const [error, setError] = React.useState({
    ...INITIAL_STATE,
  })
  const [loading, setLoading] = React.useState(false)
  const [, setAppState] = React.useContext(AppContext)

  const signUpHandler = async () => {
    const newData = {...data, re_password: data.password}

    setLoading(true)
    const response = await window.fetch(BASE_URL + 'users/', {
      method: 'POST',
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
    const fetchedData = await response.json()
    if (response.ok) {
      setError({...INITIAL_STATE})
      setLoading(false)
      setSteps(1)
      setAppState(prev => ({...prev, signUpEmail: data.email}))
    } else {
      setError({...fetchedData})
      setLoading(false)
    }
  }

  return (
    <Box className="centralize" sx={{flexDirection: 'column', px: 4}}>
      <Title>Sign up</Title>
      <Title subTitle sx={{mt: 3}}>
        Create your account
      </Title>

      <SignUpFields
        data={data}
        error={error}
        popUpPasswordItems={popUpPasswordItems}
        setData={setData}
      />

      <CustomButton
        loading={loading}
        onClick={signUpHandler}
        sx={{mt: '42px', width: 162, height: 42}}
        variant="contained"
      >
        Sign up
      </CustomButton>

      <Box className="centralize" mt={7}>
        <Title subTitle>Already have an account?</Title>
        <CustomLink href="/user/sign-in" sx={{ml: 3}}>
          Login
        </CustomLink>
      </Box>
    </Box>
  )
}
