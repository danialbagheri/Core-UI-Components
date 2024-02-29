import Button from '@mui/material/Button'
import {Alert, Box, CircularProgress, Snackbar, TextField} from '@mui/material'
import * as React from 'react'
import {userSubscription} from 'services'

function SubscribeForm() {
  const [fieldData, setFieldData] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
  })
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [apiResponse, setApiResponse] = React.useState({
    success: true,
    message: '',
  })
  const [snackBarOpen, setSnackBarOpen] = React.useState(false)

  const fieldStyle = {
    borderRadius: 1,
    width: '100%',

    '&>p.Mui-error': {
      marginTop: '0',
      marginBottom: '-6px',
      color: '#333',
    },
    '& input': {padding: '5px', backgroundColor: 'white', borderRadius: 1},
    '&>label': {
      top: '-11px',
      color: '#222',
      textShadow: '1px 1px 4px white, 1px 1px 1em white, -2px -2px 0.2em white',
    },
    '&>label.MuiFormLabel-filled': {top: 0},
    '&>label.Mui-focused': {
      top: 0,
      color: '#222',
      textShadow: '1px 1px 4px white, 1px 1px 1em white, -2px -2px 0.2em white',
    },
    '&>.Mui-focused>fieldset': {
      borderColor: '#333 !important',
    },
  }

  const emailValidator = value =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)

  const changeHandler = (type, value) => {
    setFieldData(prev => ({...prev, [type]: value}))
  }

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
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flexGrow: 1,
          maxWidth: '220px',
          alignItems: 'flex-start',
        }}
      >
        <TextField
          error={error}
          helperText={error}
          id="outlined-required"
          label="Email address"
          onChange={e => changeHandler('email', e.target.value)}
          required
          sx={{...fieldStyle}}
          type="email"
          value={fieldData.email}
        />
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            color="primary"
            onClick={e => submitHandler(e)}
            sx={theme => {
              return {
                border: 'none',
                color: '#FFF',
                background: `${theme.palette.golden.main}`,
                p: '4px 20px',
                fontWeight: '600',
                borderRadius: 3,
                '&:hover': {
                  background: `${theme.palette.golden.main}`,
                  boxShadow: 'none',
                },
              }
            }}
            variant="primary"
          >
            {loading ? <CircularProgress size={23} /> : 'SUBSCRIBE'}
          </Button>
        </Box>
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
    </>
  )
}

export default SubscribeForm
