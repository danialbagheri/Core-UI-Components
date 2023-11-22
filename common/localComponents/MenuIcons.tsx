import {Box, SxProps} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'

interface PropsTypes {
  trigger: boolean
  sx: SxProps
  setOpenSearchModal?: (v: boolean) => void
}

export function MenuIcons(props: PropsTypes) {
  const {trigger, sx, setOpenSearchModal} = props
  return (
    <Box
      sx={{
        gap: trigger ? '25px' : '41px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
    >
      <SearchIcon
        color="primary"
        onClick={() => setOpenSearchModal(true)}
        sx={{display: {xs: 'block', sm: trigger ? 'block' : 'none'}}}
      />
      <PersonIcon color="primary" />
      <ShoppingCartIcon color="primary" />
    </Box>
  )
}
