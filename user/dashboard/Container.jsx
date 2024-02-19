import {Box} from '@mui/material'
import {SideBar} from './SideBar'
import {assetsEndPoints} from 'utils'

export function Container(props) {
  const {assets, iconName, route, sx = {}} = props
  const {userAccountTopIcons} = assetsEndPoints

  const girlIcon = assets[userAccountTopIcons]?.items.find(
    item => item.name.toLowerCase().trim() === iconName.toLowerCase().trim(),
  )

  return (
    <Box
      sx={{
        width: {xs: '100%', sm: 480, md: 740},
        m: '0 auto',
        py: {xs: 6, md: 21},
        px: {xs: 10, sm: 20, md: 0},
        gap: 5,

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: {xs: 'center', md: 'flex-start'},
        flexDirection: {xs: 'column-reverse', md: 'row'},

        '&>#user_details_girl_icon': {
          width: {xs: 145, md: 290},
          height: {xs: 145, md: 290},
        },

        ...sx,
      }}
    >
      <SideBar girlIcon={girlIcon} route={route} />
      {props.children}
    </Box>
  )
}
