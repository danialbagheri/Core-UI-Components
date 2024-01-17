import * as React from 'react'

import {Box} from '@mui/material'

import {CustomOutlinedInput} from './localShared'
import {
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  MOBILE_NUMBER,
} from '../../pages/user/dashboard'
import {validateMobileNumber, validateName} from '../../utils'
import Image from 'next/image'
// import Image from 'next/image'

export default function UserDetailsFields(props) {
  const {fieldData, setFieldData, checkIcon, error, setError} = props

  const OrangeIcon = props => {
    const {field} = props
    if (!error[field] && error[field] !== null) {
      return (
        <Image
          alt={checkIcon.name || ''}
          height={20}
          src={checkIcon.svg_icon || ''}
          style={{marginTop: 20}}
          width={20}
        />
      )
    }
  }

  const errorHandler = (field, value) => {
    switch (field) {
      case FIRST_NAME:
        if (!validateName(value)) {
          setError(prev => ({
            ...prev,
            [FIRST_NAME]: 'Please enter a valid name',
          }))
        } else {
          setError(prev => ({...prev, [FIRST_NAME]: false}))
        }
        break
      case LAST_NAME:
        if (!validateName(value)) {
          setError(prev => ({
            ...prev,
            [LAST_NAME]: 'Please enter a valid name',
          }))
        } else {
          setError(prev => ({...prev, [LAST_NAME]: false}))
        }
        break
      case MOBILE_NUMBER:
        if (!validateMobileNumber(value)) {
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
    errorHandler(field, value)
    setFieldData(prev => ({...prev, [field]: value}))
  }

  return (
    <Box sx={{mt: 9, display: 'flex', flexDirection: 'column', gap: 5}}>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          error={error[FIRST_NAME]}
          id={'account_details_first_name'}
          label="First name"
          onChange={e => changeHandler(e.target.value, FIRST_NAME)}
          placeholder="David"
          sx={{width: '100%'}}
          type="text"
          value={fieldData[FIRST_NAME]}
        />
        <OrangeIcon field={FIRST_NAME} />
      </Box>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          error={error[LAST_NAME]}
          id={'account_details_last_name'}
          label="Last name"
          onChange={e => changeHandler(e.target.value, LAST_NAME)}
          placeholder="Johnes"
          sx={{width: '100%'}}
          type="text"
          value={fieldData[LAST_NAME]}
        />
        <OrangeIcon field={LAST_NAME} />
      </Box>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          error={error[MOBILE_NUMBER]}
          id={'account_details_mobile_number'}
          label="Phone name"
          onChange={e => changeHandler(e.target.value, MOBILE_NUMBER)}
          placeholder={447987654321}
          sx={{width: '100%'}}
          type="string"
          value={fieldData[MOBILE_NUMBER]}
        />
        <OrangeIcon field={MOBILE_NUMBER} />
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
