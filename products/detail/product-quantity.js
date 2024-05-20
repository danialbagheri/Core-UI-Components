import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

export default function ProductQuantity(props) {
  function incrementQuantity(quantity) {
    props.setQuantity(quantity + 1)
  }
  function decrementQuantity(quantity) {
    if (quantity > 1) {
      props.setQuantity(quantity - 1)
    }
  }

  return (
    <ButtonGroup
      disableElevation
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#000',
        height: '40px',
        width: '98px',
        borderRadius: '10px',
        border: '1px solid #E9E9E9',
      }}
      variant="outline"
    >
      <Button
        onClick={() => decrementQuantity(props.selectedQuantity)}
        sx={{'& svg': {width: 10, height: 11}}}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <Typography fontSize={18}>{props.selectedQuantity}</Typography>
      <Button
        onClick={() => incrementQuantity(props.selectedQuantity)}
        sx={{'& svg': {width: 10, height: 11}}}
      >
        <FontAwesomeIcon icon={faPlus} sx={{width: 10, height: 11}} />
      </Button>
    </ButtonGroup>
  )
}
