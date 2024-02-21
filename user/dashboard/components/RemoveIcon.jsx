import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {Box} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {AppContext} from 'components/appProvider'
import {assetsEndPoints, REMOVE_ICON_ID} from 'utils'
/* -------------------------------------------------------------------------- */

export const RemoveIcon = props => {
  const {sx = {}} = props
  const [appState] = React.useContext(AppContext)

  const {userAccount} = assetsEndPoints
  const removeIcon = appState?.icons?.[userAccount]?.items?.find(
    item => item.id === REMOVE_ICON_ID,
  ).svg_icon_text

  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: '#FCF5EC',

        cursor: 'pointer',

        ...sx,
      }}
    >
      <Box
        dangerouslySetInnerHTML={{__html: removeIcon}}
        sx={{
          '& svg': {
            width: 32,
            height: 32,
            '& circle': {display: 'none'},
          },
        }}
      />
    </Box>
  )
}
