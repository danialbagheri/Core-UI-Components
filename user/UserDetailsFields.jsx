import * as React from 'react'

import {Box} from '@mui/material'

import {
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  MOBILE_NUMBER,
} from '../../pages/user/dashboard'
import {validateMobileNumber, validateName} from '../../utils'
import {CustomOutlinedInput} from 'components/shared'

export default function UserDetailsFields(props) {
  const {fieldData, setFieldData, error, isEdit, setError} = props

  const errorHandler = (value, field) => {
    switch (field) {
      case FIRST_NAME:
        if (value && !validateName(value)) {
          setError(prev => ({
            ...prev,
            [FIRST_NAME]: 'Please enter a valid name',
          }))
        } else {
          setError(prev => ({...prev, [FIRST_NAME]: false}))
        }
        break
      case LAST_NAME:
        if (value && !validateName(value)) {
          setError(prev => ({
            ...prev,
            [LAST_NAME]: 'Please enter a valid name',
          }))
        } else {
          setError(prev => ({...prev, [LAST_NAME]: false}))
        }
        break
      case MOBILE_NUMBER:
        if (value && !validateMobileNumber(value)) {
          setError(prev => ({
            ...prev,
            [MOBILE_NUMBER]: 'Please enter a valid mobile number',
          }))
        } else {
          setError(prev => ({...prev, [MOBILE_NUMBER]: false}))
        }
        break
      default:
        break
    }
  }

  const changeHandler = (value, field) => {
    errorHandler(value, field)
    setFieldData(prev => ({...prev, [field]: value}))
  }

  return (
    <Box sx={{mt: 9, display: 'flex', flexDirection: 'column', gap: 5}}>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          disabled={!isEdit}
          error={error[FIRST_NAME]}
          id={'account_details_first_name'}
          label="First name"
          onChange={e => changeHandler(e.target.value, FIRST_NAME)}
          placeholder="First name"
          sx={{width: '100%'}}
          type="text"
          value={fieldData[FIRST_NAME]}
        />
      </Box>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          disabled={!isEdit}
          error={error[LAST_NAME]}
          id={'account_details_last_name'}
          label="Last name"
          onChange={e => changeHandler(e.target.value, LAST_NAME)}
          placeholder="Last name"
          sx={{width: '100%'}}
          type="text"
          value={fieldData[LAST_NAME]}
        />
      </Box>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          disabled={!isEdit}
          error={error[MOBILE_NUMBER]}
          id={'account_details_mobile_number'}
          label="Phone name"
          onChange={e => changeHandler(e.target.value, MOBILE_NUMBER)}
          placeholder={447987654321}
          sx={{width: '100%'}}
          type="string"
          value={fieldData[MOBILE_NUMBER]}
        />
      </Box>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          disabled
          id={'account_details_email'}
          label="Email address"
          onChange={e => changeHandler(e.target.value, EMAIL)}
          placeholder="David@gmail.com"
          sx={{width: '100%'}}
          type="email"
          value={fieldData[EMAIL]}
        />
      </Box>
    </Box>
  )
}
