import {Box} from '@mui/material'

export const ApiSvgIcon = ({htmlContent, sx = {}, boxSx = {}, ...rest}) => {
  if (!htmlContent) {
    return null
  }
  return (
    <Box
      component="div"
      dangerouslySetInnerHTML={{__html: htmlContent}}
      sx={{...boxSx, '& svg': {...sx}}}
      {...rest}
    />
  )
}
