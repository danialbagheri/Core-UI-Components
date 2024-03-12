import {Box} from '@mui/material'
import {SideBar} from './SideBar'

export function Container(props) {
  const {route, sx = {}} = props

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: {xs: 480, md: 1178},
        m: '0 auto',
        py: {xs: 6, md: 21},
        px: 10,
        gap: {xs: 5, md: '157px'},

        display: 'flex',
        justifyContent: 'center',
        alignItems: {xs: 'center', md: 'flex-start'},
        flexDirection: {xs: 'column-reverse', md: 'row'},

        '&>#user_details_girl_icon': {
          width: {xs: 145, md: 290},
          height: {xs: 145, md: 290},
        },

        ...sx,
      }}
    >
      <SideBar route={route} />
      {props.children}
    </Box>
  )
}
