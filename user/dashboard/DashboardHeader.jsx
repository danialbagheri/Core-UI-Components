import {Box, Typography} from '@mui/material'
import {CalypsoGirlDashboard} from 'components/icons'

export function DashboardHeader(props) {
  const {name, sx = {}} = props
  return (
    <Box
      className="centralize"
      sx={{flexDirection: 'column', gap: '14px', maxWidth: 355, ...sx}}
    >
      <CalypsoGirlDashboard
        sx={{width: {xs: 145, md: 249}, height: {xs: 145, md: 249}}}
      />
      <Typography color="secondary" fontSize={24} fontWeight={700}>
        Nice to see you{name ? `, ${name}!` : ''}
      </Typography>
    </Box>
  )
}
