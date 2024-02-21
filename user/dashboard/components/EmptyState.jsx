import {Box, Typography} from '@mui/material'
import {CustomButton} from 'components/user/localShared'
import Link from 'next/link'

export function EmptyState(props) {
  const {sx = {}} = props
  return (
    <Box className="centralize" sx={{flexDirection: 'column', ...sx}}>
      <Typography fontSize={20} fontWeight={500}>
        Your wish list is empty
      </Typography>
      <Typography
        color="#D6D6D6"
        fontSize={14}
        fontWeight={500}
        mt={7}
        textAlign="center"
      >
        Just click on the heart button bellow any products that you want to add
      </Typography>
      <CustomButton
        onClick={e => e.preventDefault()}
        sx={{
          width: 220,
          height: 46,
          mt: 5,
          '& a': {textDecoration: 'none'},
        }}
      >
        <Link href="/products">Add products</Link>
      </CustomButton>
    </Box>
  )
}
