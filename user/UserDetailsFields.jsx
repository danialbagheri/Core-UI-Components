import {Box} from '@mui/material'

import {CustomOutlinedInput} from './localShared'
import {
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  MOBILE_NUMBER,
} from '../../pages/user/dashboard'
// import Image from 'next/image'

export default function UserDetailsFields(props) {
  const {
    fieldData,
    setFieldData,
    // checkIcon
  } = props

  // const OrangeIcon = props => {
  //   const {field} = props
  //   return (
  //     <Box height={20} mt={5} width={20}>
  //       {field ? (
  //         <Image
  //           alt={checkIcon.name || ''}
  //           height={20}
  //           src={checkIcon.svg_icon || ''}
  //           width={20}
  //         />
  //       ) : null}
  //     </Box>
  //   )
  // }

  const changeHandler = (value, field) => {
    setFieldData(prev => ({...prev, [field]: value}))
  }

  return (
    <Box sx={{mt: 9, display: 'flex', flexDirection: 'column', gap: 5}}>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          id={'account_details_first_name'}
          label="First name"
          onChange={e => changeHandler(e.target.value, FIRST_NAME)}
          placeholder="David"
          sx={{width: '100%'}}
          type="text"
          value={fieldData[FIRST_NAME]}
        />
        {/* <OrangeIcon field={fieldData[FIRST_NAME]} /> */}
      </Box>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          id={'account_details_last_name'}
          label="Last name"
          onChange={e => changeHandler(e.target.value, LAST_NAME)}
          placeholder="Johnes"
          sx={{width: '100%'}}
          type="text"
          value={fieldData[LAST_NAME]}
        />
        {/* <OrangeIcon field={fieldData[LAST_NAME]} /> */}
      </Box>
      <Box className="centralize" gap={3}>
        <CustomOutlinedInput
          id={'account_details_mobile_number'}
          label="Phone name"
          onChange={e => changeHandler(e.target.value, MOBILE_NUMBER)}
          placeholder={7740934456}
          sx={{width: '100%'}}
          type="number"
          value={fieldData[MOBILE_NUMBER]}
        />
        {/* <OrangeIcon field={fieldData[MOBILE_NUMBER]} /> */}
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
        {/* <OrangeIcon field={fieldData[EMAIL]} /> */}
      </Box>
    </Box>
  )
}
