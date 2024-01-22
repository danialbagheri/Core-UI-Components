import * as React from 'react'

import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import {postContactUsSubmit} from '../services'

const recaptchaRef = React.createRef()

const NAME = 'name'
const ADDRESS = 'address'
const EMAIL = 'email'
const REASON = 'reason'
const MESSAGE = 'message'
const RECAPTCHA = 'recaptcha'

const REASON_OPTIONS = [
  'Product Question',
  'Urgent: Change Order detail or Address',
  'Wholesale, Discount, promo code query',
  'Question about order or Delivery',
  'Press Contact & Media',
  'Other',
]

const errorInitial = {
  [NAME]: null,
  [ADDRESS]: null,
  [EMAIL]: null,
  [MESSAGE]: null,
  [RECAPTCHA]: null,
}

const ContactUsForm = () => {
  const [data, setData] = React.useState({
    [NAME]: null,
    [ADDRESS]: null,
    [EMAIL]: null,
    [REASON]: REASON_OPTIONS[0],
    [MESSAGE]: null,
    [RECAPTCHA]: null,
  })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState({...errorInitial})
  const [hasError, setHasError] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const theme = useTheme()

  const onChangeHandler = (value, field) => {
    setData(prev => ({...prev, [field]: value}))
  }

  const errorHandler = async () => {
    setError({...errorInitial})
    setHasError(false)

    const schema = Yup.object().shape({
      [NAME]: Yup.string()
        .max(35, 'Name must be 35 characters or less')
        .required('Full name is required'),
      [ADDRESS]: Yup.string()
        .min(5, 'Address must be 5 characters or More')
        .required('Address is required'),
      [EMAIL]: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      [MESSAGE]: Yup.string()
        .min(5, 'Message must be 5 characters or More')
        .required('Message is required'),
      [RECAPTCHA]: Yup.string().required('Please verify you are human'),
    })

    const errorState = await schema
      .validate(data, {abortEarly: false})
      .then(() => false)
      .catch(err => {
        err.inner.forEach(e => {
          setError(prev => ({...prev, [e.path]: e.message}))
        })
        return true
      })
    return errorState
  }

  const submitHandler = async () => {
    setSuccess(false)
    const errorState = await errorHandler()

    setHasError(errorState)

    if (!errorState) {
      setLoading(true)
      try {
        await postContactUsSubmit(data)
        setSuccess(true)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&>div': {width: '100%'},
        gap: 3,
        mb: 10,
        alignItems: 'flex-start',
      }}
    >
      <Box>
        <Typography fontWeight="700">Full name</Typography>
        <TextField
          error={error[NAME]}
          fullWidth
          helperText={error[NAME]}
          onChange={e => onChangeHandler(e.target.value, NAME)}
          placeholder="Jane"
          size="small"
          type="text"
          value={data[NAME]}
        />
      </Box>
      <Box>
        <Typography fontWeight="700">Address (city,country)</Typography>
        <TextField
          error={error[ADDRESS]}
          fullWidth
          helperText={error[ADDRESS]}
          onChange={e => onChangeHandler(e.target.value, ADDRESS)}
          placeholder="Manchester, United Kingdom"
          size="small"
          type="text"
          value={data[ADDRESS]}
        />
      </Box>
      <Box>
        <Typography fontWeight="700">Email Address</Typography>
        <TextField
          error={error[EMAIL]}
          fullWidth
          helperText={error[EMAIL]}
          onChange={e => onChangeHandler(e.target.value, EMAIL)}
          placeholder="jane@email.com"
          size="small"
          type="email"
          value={data[EMAIL]}
        />
      </Box>
      <Box>
        <Typography fontWeight="700">Reason for contact</Typography>
        <Select
          fullWidth
          id="contact-us-reason"
          onChange={e => onChangeHandler(e.target.value, REASON)}
          size="small"
          value={data[REASON]}
        >
          {REASON_OPTIONS.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Typography fontWeight="700">Your message</Typography>
        <TextField
          error={error[MESSAGE]}
          fullWidth
          helperText={error[MESSAGE]}
          multiline
          onChange={e => onChangeHandler(e.target.value, MESSAGE)}
          placeholder="Dear Calypso team..."
          rows={6}
          size="small"
          type="email"
          value={data[MESSAGE]}
        />
      </Box>
      <ReCAPTCHA
        onChange={() => {
          onChangeHandler(recaptchaRef.current.getValue(), RECAPTCHA)
        }}
        ref={recaptchaRef}
        sitekey="6LfjPaEUAAAAAPGfkx7Nxp3glAdPGbLZE3lwY5c9"
      />

      {error[RECAPTCHA] ? (
        <Typography color="#d32f2f" fontSize={'1.2rem'} ml="14px" mt={-3}>
          {error[RECAPTCHA]}
        </Typography>
      ) : null}

      <Box mt={8}>
        {hasError ? (
          <Alert severity="error">
            <AlertTitle>Please resolve this errors:</AlertTitle>
            <ul>
              {Object.keys(error).map(key => {
                if (error[key]) {
                  return <li key={key}>{error[key]}</li>
                }
              })}
            </ul>
          </Alert>
        ) : null}
        {success ? (
          <Alert severity="success">
            Your message has been sent successfully
          </Alert>
        ) : null}

        <Button
          disabled={loading}
          onClick={submitHandler}
          sx={{
            position: 'relative',

            textAlign: 'center',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            textTransform: 'none',
            color: '#FFFFFF',
            width: 280,
            height: 40,
            mt: 2,

            p: '8px 50px',

            borderRadius: '78px',

            boxShadow: 'none',

            whiteSpace: 'nowrap',

            '&:hover': {
              bgcolor: theme.palette.primary.main,
              boxShadow: 'none !important',
            },
          }}
          variant="contained"
        >
          {loading ? (
            <CircularProgress
              size={30}
              sx={{
                color: '#FFF',
                position: 'absolute',
              }}
            />
          ) : (
            'SUBMIT'
          )}
        </Button>
      </Box>
    </Box>
  )
}

export default ContactUsForm
