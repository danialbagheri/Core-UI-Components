import {Alert, Box, Snackbar, Typography} from '@mui/material'
import * as React from 'react'
import {userSubscription} from 'services'
import {CustomButton, CustomOutlinedInput} from 'components/shared'
import {Container} from './Container'

export function SubscribeForm({sx = {}}) {
  const [fieldData, setFieldData] = React.useState({
    email: '',
  })
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [apiResponse, setApiResponse] = React.useState({
    success: true,
    message: '',
  })
  const [snackBarOpen, setSnackBarOpen] = React.useState(false)

  const emailValidator = value =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)

  const handleClose = () => {
    setSnackBarOpen(false)
  }

  const submitHandler = async e => {
    e.preventDefault()

    if (!fieldData.email) {
      setError('Email is required.')
      return
    } else if (!emailValidator(fieldData.email)) {
      setError('Please enter a correct email address.')
      return
    }
    setLoading(true)
    setError('')
    const data = {
      firstName: fieldData.firstName,
      lastName: fieldData.lastName,
      email: fieldData.email,
    }

    try {
      await userSubscription(data)
      setApiResponse({
        message: <span>Thank you for subscribing &#128522;</span>,
        success: true,
      })
      setSnackBarOpen(true)
      setTimeout(() => setSnackBarOpen(false), 2000)
    } catch (err) {
      console.error(err)
      setApiResponse({
        message: 'Subscription was unsuccessful',
        success: false,
      })
      setSnackBarOpen(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container sx={{...sx}}>
      <Typography
        color="primary"
        fontSize={34}
        fontWeight={700}
        textAlign="center"
      >
        GET 10% off
      </Typography>
      <Typography
        fontSize={16}
        fontWeight={500}
        mt="7px"
        sx={{color: '#7F2E00'}}
        textAlign="center"
      >
        Join our Sun-Safe family
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          mt: 5,
        }}
      >
        <CustomOutlinedInput
          error={error}
          id="outlined-required"
          onChange={e => setFieldData({email: e.target.value})}
          placeholder="Email address"
          sx={{
            width: 181,
            height: 32,
            '& input': {bgcolor: '#FFF', py: '5px'},
          }}
          type="email"
          value={fieldData.email}
        />
        <CustomButton
          loading={loading}
          onClick={submitHandler}
          sx={{width: 112, height: 36, borderRadius: '4px', ml: -2}}
          variant="contained"
        >
          Subscribe
        </CustomButton>
      </Box>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={handleClose}
        open={snackBarOpen}
      >
        <Alert
          onClose={handleClose}
          severity={apiResponse.success ? 'success' : 'error'}
          sx={{width: '100%'}}
        >
          {apiResponse.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
