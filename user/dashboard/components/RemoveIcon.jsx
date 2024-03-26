import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {Box, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {Remove} from 'components/icons'
/* -------------------------------------------------------------------------- */

export const RemoveIcon = props => {
  const {sx = {}, onClick = () => {}} = props
  const theme = useTheme()

  return (
    <Box
      className="centralize"
      onClick={onClick}
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: '#FCF5EC',
        cursor: 'pointer',

        ...sx,
      }}
    >
      <Remove
        sx={{
          width: 32,
          height: 32,
          color: theme.palette.primary.main,
          '& circle': {display: 'none'},
        }}
      />
    </Box>
  )
}
