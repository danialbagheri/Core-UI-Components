import {Box, Typography} from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'

export function OrdersEmptyState() {
  return (
    <Box
      className="centralize"
      sx={{
        width: '100%',
        border: '2px solid #F2F2F2',
        borderRadius: '10px',
        flexDirection: 'column',
        p: 7,
        gap: 3,
      }}
    >
      <LocalGroceryStoreIcon sx={{fontSize: '100px', fill: '#D6D6D6'}} />
      <Typography sx={{fontSize: 21, fontWeight: 700, color: '#D6D6D6'}}>
        No orders yet
      </Typography>
    </Box>
  )
}
