import * as React from 'react'
import {BASE_URL} from '../../../constants/servicesConstants'
import {Box} from '@mui/material'
import {CustomButton, CustomLink, Title} from '../localShared'
import {SignUpFields} from './SignUpFields'

const DATA = {
  email: '',
  password: '',
  re_password: '',
  first_name: '',
  last_name: '',
}

export function UserDetails({setSteps}) {
  const [data, setData] = React.useState({
    ...DATA,
  })
  const [error, setError] = React.useState({
    ...DATA,
  })
  const [loading, setLoading] = React.useState(false)

  const signUpHandler = async () => {
    const newData = {...data, re_password: data.password}

    // postCreateUser(newData)
    //   .then(res => console.log('RES::::', res))
    //   .catch(err => console.log('ERROR::::', err))

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
      setError({...DATA})
      setLoading(false)
      setSteps(1)
    } else {
      setError({...fetchedData})
      setLoading(false)
    }
  }

  return (
    <>
      <Title>Sign up</Title>
      <Title subTitle sx={{mt: 3}}>
        Create your account
      </Title>

      <SignUpFields data={data} error={error} setData={setData} />

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
        <CustomLink href="/user" sx={{ml: 3}}>
          Login
        </CustomLink>
      </Box>
    </>
  )
}
