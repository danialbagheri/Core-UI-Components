import Box from '@mui/material/Box'

import {WhereToBuy} from './whereToBuy'

import DropDown from './DropDown'
import Link from 'next/link'
import {useTheme} from '@mui/material'

export default function ProductDropDown(props) {
  const {selectedVariant, productDescription, sx = {}} = props
  const theme = useTheme()
  return (
    <Box sx={{...sx}}>
      <DropDown defaultExpanded title="Description">
        <Box
          dangerouslySetInnerHTML={{
            __html: productDescription,
          }}
          sx={{textAlign: 'justify'}}
        />
      </DropDown>
      {selectedVariant.name.includes('SPF') && (
        <DropDown title="What is SPF?">
          <Box>
            SPF stands for Sun Protection Factor. It is the measure of the
            sunscreen’s ability to filter UVB rays. You should consider your
            skin type, hair colour and location when choosing an SPF product. If
            you&apos;re not sure what SPF to choose, visit{' '}
            <Link
              href="/be-sun-ready"
              style={{color: theme.palette.primary.main}}
            >
              Be sun ready
            </Link>{' '}
            to find more information.
          </Box>
        </DropDown>
      )}

      <DropDown title="Where to Buy">
        <WhereToBuy
          childProducts={selectedVariant.name}
          stores={selectedVariant.where_to_buy}
        />
      </DropDown>
    </Box>
  )
}
