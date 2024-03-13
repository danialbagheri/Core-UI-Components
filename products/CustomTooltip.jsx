import Tooltip, {tooltipClasses} from '@mui/material/Tooltip'
import {styled} from '@mui/material/styles'

export const CustomTooltip = styled(({className, ...props}) => (
  <Tooltip {...props} cc classes={{popper: className}} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#FFF',
    '&:before': {
      border: '1px solid #000',
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#FFF',
    color: '#000',
    border: '1px solid #000',
  },
}))
