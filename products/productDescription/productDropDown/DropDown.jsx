import * as React from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function DropDown(props) {
  const {defaultExpanded} = props
  return (
    <Box>
      <Accordion
        defaultExpanded={defaultExpanded}
        sx={{
          boxShadow: 'none',
          '& .MuiButtonBase-root': {
            borderBottom: '1px solid #D5D5D5',
          },
          '& .MuiAccordionSummary-root.Mui-expanded': {
            borderBottom: 'none',
          },

          '& .MuiCollapse-entered': {borderBottom: '1px solid #D5D5D5'},
        }}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{mb: 2}}
        >
          <Typography fontSize={20} fontWeight={700}>
            {props.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </Box>
  )
}
